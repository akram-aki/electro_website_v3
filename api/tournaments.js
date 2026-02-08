import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (!process.env.DATABASE_URL) {
    return res.status(500).json({ error: 'Database configuration error' });
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    // Check Admin Auth for POST and PUT operations
    if (req.method === 'POST' || req.method === 'PUT') {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.split(' ')[1] !== process.env.ADMIN_TOKEN) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
    }

    // GET: List tournaments (Public)
    if (req.method === 'GET') {
      const tournaments = await sql`
        SELECT id, title, format, teams, bracket_data, status, created_at 
        FROM tournaments 
        ORDER BY created_at DESC
      `;
      return res.status(200).json({ data: tournaments });
    }

    // POST: Create tournament
    if (req.method === 'POST') {
      const { title, format, teams, bracket_data } = req.body;

      if (!title || !format || !teams) {
        return res.status(400).json({ error: 'Title, format, and teams are required' });
      }

      const validFormats = ['groups', 'elimination', 'double_elimination'];
      if (!validFormats.includes(format)) {
         return res.status(400).json({ error: 'Invalid format' });
      }

      // Hard Delete: Remove all existing tournaments before creating a new one
      await sql`DELETE FROM tournaments`;

      const result = await sql`
        INSERT INTO tournaments (title, format, teams, bracket_data)
        VALUES (${title}, ${format}, ${JSON.stringify(teams)}, ${JSON.stringify(bracket_data)})
        RETURNING id, title, created_at
      `;

      return res.status(201).json({ data: result[0] });
    }

    // PUT: Update tournament (specifically bracket_data)
    if (req.method === 'PUT') {
      const { id, bracket_data } = req.body;

      if (!bracket_data) {
        return res.status(400).json({ error: 'bracket_data is required' });
      }

      let result;
      if (id) {
        // Update specific tournament
        result = await sql`
          UPDATE tournaments 
          SET bracket_data = ${JSON.stringify(bracket_data)}, updated_at = CURRENT_TIMESTAMP
          WHERE id = ${id}
          RETURNING id, title, updated_at
        `;
      } else {
        // Update the most recent tournament (active one)
        // This assumes we only have one active tournament or want to update the latest
        result = await sql`
          UPDATE tournaments 
          SET bracket_data = ${JSON.stringify(bracket_data)}, updated_at = CURRENT_TIMESTAMP
          WHERE id = (SELECT id FROM tournaments ORDER BY created_at DESC LIMIT 1)
          RETURNING id, title, updated_at
        `;
      }

      if (result.length === 0) {
        return res.status(404).json({ error: 'Tournament not found' });
      }

      return res.status(200).json({ data: result[0] });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('Tournaments API error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}



