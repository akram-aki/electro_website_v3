import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (!process.env.DATABASE_URL) {
    return res.status(500).json({ error: 'Database configuration error' });
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    // POST: Submit a form entry (Public)
    if (req.method === 'POST') {
      const { form_id, data } = req.body;

      if (!form_id || !data) {
        return res.status(400).json({ error: 'Missing form_id or data' });
      }

      // Verify form exists and is active
      const formCheck = await sql`
        SELECT is_active FROM forms WHERE id = ${form_id}
      `;

      if (formCheck.length === 0) {
        return res.status(404).json({ error: 'Form not found' });
      }
      if (!formCheck[0].is_active) {
        return res.status(403).json({ error: 'Form is not active' });
      }

      // Insert submission
      const result = await sql`
        INSERT INTO form_submissions (form_id, data)
        VALUES (${form_id}, ${JSON.stringify(data)})
        RETURNING id, submitted_at
      `;

      return res.status(201).json({ success: true, data: result[0] });
    }

    // GET: Fetch submissions (Admin only)
    if (req.method === 'GET') {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.split(' ')[1] !== process.env.ADMIN_TOKEN) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { form_id } = req.query;
      if (!form_id) {
        return res.status(400).json({ error: 'form_id required' });
      }

      const submissions = await sql`
        SELECT id, data, submitted_at 
        FROM form_submissions 
        WHERE form_id = ${form_id} 
        ORDER BY submitted_at DESC
      `;

      return res.status(200).json({ data: submissions });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('Submissions API error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}










