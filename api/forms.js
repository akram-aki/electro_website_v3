import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (!process.env.DATABASE_URL) {
    return res.status(500).json({ error: 'Database configuration error' });
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    // GET: List forms
    if (req.method === 'GET') {
      const { admin } = req.query;

      if (admin === 'true') {
        // Admin view: All forms, check auth
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.split(' ')[1] !== process.env.ADMIN_TOKEN) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
        
        const forms = await sql`
          SELECT id, title, description, fields, is_active, created_at 
          FROM forms 
          ORDER BY created_at DESC
        `;
        return res.status(200).json({ data: forms });
      } else {
        // Public view: Only active forms (title/desc/id only?)
        // Actually public usually fetches specific form by ID, but maybe a list of active ones?
        const forms = await sql`
          SELECT id, title, description 
          FROM forms 
          WHERE is_active = true 
          ORDER BY created_at DESC
        `;
        return res.status(200).json({ data: forms });
      }
    }

    // POST: Create form (Admin only)
    if (req.method === 'POST') {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.split(' ')[1] !== process.env.ADMIN_TOKEN) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { title, description, fields } = req.body;

      if (!title || !fields) {
        return res.status(400).json({ error: 'Title and fields are required' });
      }

      const result = await sql`
        INSERT INTO forms (title, description, fields)
        VALUES (${title}, ${description}, ${JSON.stringify(fields)})
        RETURNING id, title, created_at
      `;

      return res.status(201).json({ data: result[0] });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('Forms API error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}


