import { neon } from '@neondatabase/serverless';

// Initialize Neon database connection
const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const {
        name,
        familyName,
        email,
        phone,
        studentCardNumber,
        gender,
        yearOfStudies,
        major,
        faculty,
        motivation
      } = req.body;

      // Validate required fields
      if (!name || !familyName || !email || !phone || !studentCardNumber || 
          !gender || !yearOfStudies || !major || !faculty || !motivation) {
        return res.status(400).json({ 
          error: 'All fields are required' 
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          error: 'Invalid email format' 
        });
      }

      // Validate gender
      if (!['male', 'female'].includes(gender)) {
        return res.status(400).json({ 
          error: 'Invalid gender value' 
        });
      }

      // Validate year of studies
      if (!['L1', 'L2', 'L3', 'M1', 'M2'].includes(yearOfStudies)) {
        return res.status(400).json({ 
          error: 'Invalid year of studies' 
        });
      }

      // Check if email or student card number already exists
      const existingUser = await sql`
        SELECT id FROM club_registrations 
        WHERE email = ${email} OR student_card_number = ${studentCardNumber}
      `;

      if (existingUser.length > 0) {
        return res.status(409).json({ 
          error: 'Email or student card number already registered' 
        });
      }

      // Insert new registration
      const result = await sql`
        INSERT INTO club_registrations (
          name, family_name, email, phone, student_card_number,
          gender, year_of_studies, major, faculty, motivation
        ) VALUES (
          ${name}, ${familyName}, ${email}, ${phone}, ${studentCardNumber},
          ${gender}, ${yearOfStudies}, ${major}, ${faculty}, ${motivation}
        ) RETURNING id, created_at
      `;

      return res.status(201).json({
        success: true,
        message: 'Registration submitted successfully!',
        data: {
          id: result[0].id,
          submittedAt: result[0].created_at
        }
      });

    } catch (error) {
      console.error('Database error:', error);
      
      // Handle specific database errors
      if (error.code === '23505') { // PostgreSQL unique violation
        return res.status(409).json({ 
          error: 'Email or student card number already registered' 
        });
      }

      return res.status(500).json({ 
        error: 'Internal server error. Please try again later.' 
      });
    }
  }

  // Handle GET requests - fetch all registrations (admin use)
  else if (req.method === 'GET') {
    try {
      // Simple authentication check (you can enhance this)
      const authHeader = req.headers.authorization;
      if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_TOKEN}`) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const registrations = await sql`
        SELECT 
          id, name, family_name, email, phone, student_card_number,
          gender, year_of_studies, major, faculty, motivation, 
          status, created_at, updated_at
        FROM club_registrations 
        ORDER BY created_at DESC
      `;

      return res.status(200).json({
        success: true,
        data: registrations,
        count: registrations.length
      });

    } catch (error) {
      console.error('Database error:', error);
      return res.status(500).json({ 
        error: 'Internal server error' 
      });
    }
  }

  // Method not allowed
  else {
    res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
