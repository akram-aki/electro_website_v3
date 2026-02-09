export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ valid: false, error: "Token is required" });
    }

    // Check against environment variable
    if (token === process.env.ADMIN_TOKEN) {
      return res.status(200).json({ valid: true });
    } else {
      // Add a small delay to prevent timing attacks (optional but good practice)
      await new Promise((resolve) => setTimeout(resolve, 200));
      return res.status(401).json({ valid: false, error: "Invalid token" });
    }
  } catch (error) {
    console.error("Token validation error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}








