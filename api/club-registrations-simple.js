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

    // Test database connection
    if (req.method === 'GET') {
      try {
        const { neon } = await import('@neondatabase/serverless');
        const sql = neon(process.env.DATABASE_URL);
        
        // Simple query to test connection
        const result = await sql`SELECT 1 as test`;
        
        return res.status(200).json({
          success: true,
          message: 'Database connection successful',
          testQuery: result[0]
        });
      } catch (dbError) {
        console.error('Database error:', dbError);
        return res.status(500).json({
          error: 'Database connection failed',
          details: dbError.message
        });
      }
    }

    // Handle POST (form submission)
    if (req.method === 'POST') {
      return res.status(200).json({
        success: true,
        message: 'POST endpoint reached',
        body: req.body
      });
    }

    // Method not allowed
    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('Function error:', error);
    return res.status(500).json({
      error: 'Function execution failed',
      details: error.message
    });
  }
}
