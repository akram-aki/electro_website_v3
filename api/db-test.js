export default async function handler(req, res) {
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    if (!process.env.DATABASE_URL) {
      return res.status(500).json({ error: 'DATABASE_URL not configured' });
    }

    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(process.env.DATABASE_URL);

    // Test basic connection
    console.log('Testing database connection...');
    const connectionTest = await sql`SELECT 1 as test`;
    console.log('Connection test result:', connectionTest);

    // Check if table exists
    console.log('Checking if club_registrations table exists...');
    const tableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'club_registrations'
      );
    `;
    console.log('Table exists check:', tableExists);

    let tableStructure = null;
    if (tableExists[0].exists) {
      // Get table structure
      console.log('Getting table structure...');
      tableStructure = await sql`
        SELECT column_name, data_type, is_nullable 
        FROM information_schema.columns 
        WHERE table_name = 'club_registrations' 
        ORDER BY ordinal_position;
      `;
      console.log('Table structure:', tableStructure);
    }

    return res.status(200).json({
      success: true,
      database: {
        connected: true,
        connectionTest: connectionTest[0],
        tableExists: tableExists[0].exists,
        tableStructure: tableStructure
      }
    });

  } catch (error) {
    console.error('Database test error:', error);
    return res.status(500).json({
      error: 'Database test failed',
      details: error.message
    });
  }
}
