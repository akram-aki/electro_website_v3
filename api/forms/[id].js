import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (!process.env.DATABASE_URL) {
    return res.status(500).json({ error: 'Database configuration error' });
  }

  const sql = neon(process.env.DATABASE_URL);
  const { id } = req.query;

  try {
    // GET: Public can fetch form details (title, fields, etc.) to fill it out
    if (req.method === 'GET') {
      const result = await sql`
        SELECT id, title, description, fields, is_active 
        FROM forms 
        WHERE id = ${id}
      `;

      if (result.length === 0) {
        return res.status(404).json({ error: 'Form not found' });
      }

      // Check if active if not admin? For now let's just return it.
      // Ideally, if !is_active, public shouldn't see it unless admin. 
      // But simplicity first.
      return res.status(200).json({ data: result[0] });
    }

    // AUTH CHECK for PUT/DELETE
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.split(' ')[1] !== process.env.ADMIN_TOKEN) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // PUT: Update form (e.g. toggle active)
    if (req.method === 'PUT') {
      const { is_active } = req.body;
      // Add other fields here if we want to edit forms later
      
      const result = await sql`
        UPDATE forms
        SET is_active = ${is_active}
        WHERE id = ${id}
        RETURNING id, is_active
      `;
      
      if (result.length === 0) return res.status(404).json({ error: 'Form not found' });
      return res.status(200).json({ data: result[0] });
    }

    // DELETE: Remove form
    if (req.method === 'DELETE') {
      const result = await sql`
        DELETE FROM forms 
        WHERE id = ${id}
        RETURNING id
      `;
      
      if (result.length === 0) return res.status(404).json({ error: 'Form not found' });
      return res.status(200).json({ message: 'Form deleted' });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('Form ID API error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}










