import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Check if DATABASE_URL is configured
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL environment variable is not set');
      return res.status(500).json({ 
        error: 'Database configuration error' 
      });
    }

    // Initialize Neon database connection
    const sql = neon(process.env.DATABASE_URL);

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    // Add a simple health check endpoint
    if (req.method === 'GET' && req.url === '/api/club-registrations/health') {
      return res.status(200).json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        env_check: !!process.env.DATABASE_URL
      });
    }

    if (req.method === 'POST') {
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
    }

    // Handle GET requests - fetch all registrations (admin use)
    else if (req.method === 'GET') {
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
    }

    // Method not allowed
    else {
      res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (functionError) {
    console.error('Function execution error:', functionError);
    return res.status(500).json({ 
      error: 'Function execution failed',
      details: process.env.NODE_ENV === 'development' ? functionError.message : undefined
    });
  }
}
