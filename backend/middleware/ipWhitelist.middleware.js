import dotenv from "dotenv";

dotenv.config();

// Get allowed IPs from environment variable (comma-separated)
// Falls back to localhost if not configured
const ALLOWED_IPS = process.env.ALLOWED_IPS
  ? process.env.ALLOWED_IPS.split(",").map((ip) => ip.trim())
  : ["127.0.0.1", "::1"];

console.log("[IP Whitelist] Allowed IPs:", ALLOWED_IPS);

export const ipWhitelist = (req, res, next) => {
  // Get client IP from multiple sources (in order of preference)
  let clientIP =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || // Proxy header
    req.headers["x-real-ip"] || // Another proxy header
    req.connection.remoteAddress || // Direct connection
    req.socket?.remoteAddress || // Socket connection
    req.ip || // Express IP
    "UNKNOWN";

  console.log(`[IP Check] Raw IP: ${clientIP}`);
  console.log(`[IP Check] Request object keys:`, {
    ip: req.ip,
    remoteAddress: req.connection?.remoteAddress,
    socketRemoteAddress: req.socket?.remoteAddress,
    xForwardedFor: req.headers["x-forwarded-for"],
  });

  // Handle IPv6 mapped IPv4 addresses (e.g., ::ffff:192.0.2.1)
  if (clientIP && clientIP.startsWith("::ffff:")) {
    clientIP = clientIP.slice(7);
  }

  // Remove port number if present
  if (clientIP && clientIP.includes(":")) {
    clientIP = clientIP.split(":")[0];
  }

  // Trim whitespace
  clientIP = clientIP?.trim() || "UNKNOWN";

  console.log(`[IP Check] Resolved IP: ${clientIP}`);
  console.log(`[IP Check] Attempt from IP: ${clientIP}`);
  console.log(`[IP Check] Whitelist:`, ALLOWED_IPS);

  if (ALLOWED_IPS.includes(clientIP)) {
    console.log(`[IP Check] ✅ Access granted for IP: ${clientIP}`);
    next();
  } else {
    console.log(`[IP Check] ❌ Access denied for IP: ${clientIP}`);
    return res.status(403).json({
      success: false,
      message: `Access denied. Your IP (${clientIP}) is not authorized to perform this action. Contact administrator if you believe this is an error.`,
    });
  }
};
