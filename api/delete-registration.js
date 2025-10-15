export default async function handler(req, res) {
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    // Only allow DELETE requests
    if (req.method !== 'DELETE') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // Check authentication
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid authorization header' });
    }

    const token = authHeader.split(' ')[1];
    if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
      return res.status(401).json({ error: 'Invalid admin token' });
    }

    // Get registration ID from request body or query
    const { id } = req.body || req.query;

    if (!id) {
      return res.status(400).json({ error: 'Registration ID is required' });
    }

    // Check database configuration
    if (!process.env.DATABASE_URL) {
      return res.status(500).json({ error: 'Database not configured' });
    }

    // Initialize database connection
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(process.env.DATABASE_URL);

    // First check if registration exists
    const existingRegistration = await sql`
      SELECT id, name, family_name, email FROM club_registrations 
      WHERE id = ${id}
    `;

    if (existingRegistration.length === 0) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    // Delete the registration
    const result = await sql`
      DELETE FROM club_registrations 
      WHERE id = ${id}
      RETURNING id
    `;

    if (result.length === 0) {
      return res.status(500).json({ error: 'Failed to delete registration' });
    }

    return res.status(200).json({
      success: true,
      message: 'Registration deleted successfully',
      deletedId: result[0].id,
      deletedUser: existingRegistration[0]
    });

  } catch (error) {
    console.error('Delete registration error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
