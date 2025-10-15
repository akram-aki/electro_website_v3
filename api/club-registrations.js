export default async function handler(req, res) {
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    // Simple health check for GET requests without query params
    if (req.method === 'GET') {
      return res.status(200).json({ 
        status: 'ok', 
        message: 'Club registrations API is working',
        timestamp: new Date().toISOString(),
        hasDatabase: !!process.env.DATABASE_URL,
        hasAdminToken: !!process.env.ADMIN_TOKEN
      });
    }

    // Handle POST requests
    if (req.method === 'POST') {
      try {
        console.log('POST request received');
        
        // Check if DATABASE_URL is configured
        if (!process.env.DATABASE_URL) {
          console.error('DATABASE_URL environment variable is not set');
          return res.status(500).json({ 
            error: 'Database configuration error' 
          });
        }

        console.log('Database URL exists, initializing connection...');

        // Initialize Neon database connection with dynamic import
        const { neon } = await import('@neondatabase/serverless');
        const sql = neon(process.env.DATABASE_URL);
        
        console.log('Database connection initialized');

        // Log request body for debugging
        console.log('Request body:', req.body);

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

        console.log('Data extracted from request body');

        // Validate required fields
        console.log('Validating required fields...');
        if (!name || !familyName || !email || !phone || !studentCardNumber || 
            !gender || !yearOfStudies || !major || !faculty || !motivation) {
          console.log('Validation failed: missing fields');
          return res.status(400).json({ 
            error: 'All fields are required' 
          });
        }

        console.log('Basic validation passed');

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          console.log('Email validation failed');
          return res.status(400).json({ 
            error: 'Invalid email format' 
          });
        }

        // Validate gender
        if (!['male', 'female'].includes(gender)) {
          console.log('Gender validation failed');
          return res.status(400).json({ 
            error: 'Invalid gender value' 
          });
        }

        // Validate year of studies
        if (!['L1', 'L2', 'L3', 'M1', 'M2'].includes(yearOfStudies)) {
          console.log('Year of studies validation failed');
          return res.status(400).json({ 
            error: 'Invalid year of studies' 
          });
        }

        console.log('All validations passed, checking for existing user...');

        // Check if email or student card number already exists
        const existingUser = await sql`
          SELECT id FROM club_registrations 
          WHERE email = ${email} OR student_card_number = ${studentCardNumber}
        `;

        console.log('Existing user check completed, found:', existingUser.length, 'records');

        if (existingUser.length > 0) {
          console.log('User already exists');
          return res.status(409).json({ 
            error: 'Email or student card number already registered' 
          });
        }

        console.log('Inserting new registration...');

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

        console.log('Registration inserted successfully:', result);

        return res.status(201).json({
          success: true,
          message: 'Registration submitted successfully!',
          data: {
            id: result[0].id,
            submittedAt: result[0].created_at
          }
        });

      } catch (postError) {
        console.error('POST handler error:', postError);
        return res.status(500).json({ 
          error: 'POST request failed',
          details: postError.message
        });
      }
    }

    // Method not allowed
    return res.status(405).json({ 
      error: 'Method not allowed',
      allowed: ['GET', 'POST', 'OPTIONS']
    });
  } catch (functionError) {
    console.error('Function execution error:', functionError);
    return res.status(500).json({ 
      error: 'Function execution failed',
      details: process.env.NODE_ENV === 'development' ? functionError.message : undefined
    });
  }
}
