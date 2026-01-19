import dotenv from "dotenv";

dotenv.config();

// Get allowed IPs from environment variable (comma-separated)
// Falls back to localhost if not configured
const ALLOWED_IPS = process.env.ALLOWED_IPS
  ? process.env.ALLOWED_IPS.split(",").map((ip) => ip.trim())
  : ["127.0.0.1", "::1"];

console.log("[IP Whitelist] Allowed IPs:", ALLOWED_IPS);

export const ipWhitelist = (req, res, next) => {
  // Get client IP from request
  // Consider X-Forwarded-For header for proxy/load balancer scenarios
  let clientIP = req.ip || req.connection.remoteAddress;

  // Handle IPv6 mapped IPv4 addresses (e.g., ::ffff:192.0.2.1)
  if (clientIP.startsWith("::ffff:")) {
    clientIP = clientIP.slice(7);
  }

  // Remove port number if present
  clientIP = clientIP.split(":")[0];

  console.log(`[IP Check] Attempt from IP: ${clientIP}`);

  if (ALLOWED_IPS.includes(clientIP)) {
    console.log(`[IP Check] ✅ Access granted for IP: ${clientIP}`);
    next();
  } else {
    console.log(`[IP Check] ❌ Access denied for IP: ${clientIP}`);
    return res.status(403).json({
      success: false,
      message: `Access denied. Your IP (${clientIP}) is not authorized to perform this action.`,
    });
  }
};
