import dotenv from "dotenv";

dotenv.config();

// Get allowed IPs from environment variable (comma-separated)
// Falls back to localhost if not configured
const ALLOWED_IPS = process.env.ALLOWED_IPS
  ? process.env.ALLOWED_IPS.split(",").map((ip) => ip.trim())
  : ["127.0.0.1", "::1"];

console.log("[IP Whitelist] Initialized with allowed IPs:", ALLOWED_IPS);

export const ipWhitelist = (req, res, next) => {
  // Get client IP from multiple sources (in order of preference)
  let clientIP =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || // Proxy header
    req.headers["x-real-ip"] || // Another proxy header
    req.connection.remoteAddress || // Direct connection
    req.socket?.remoteAddress || // Socket connection
    req.ip || // Express IP
    "UNKNOWN";

  console.log(`[IP Check] Raw IP detected: ${clientIP}`);
  console.log(`[IP Check] Request debug:`, {
    ip: req.ip,
    remoteAddress: req.connection?.remoteAddress,
    socketRemoteAddress: req.socket?.remoteAddress,
    xForwardedFor: req.headers["x-forwarded-for"],
  });

  // Handle IPv6 mapped IPv4 addresses (e.g., ::ffff:192.0.2.1)
  if (clientIP && clientIP.startsWith("::ffff:")) {
    clientIP = clientIP.slice(7);
    console.log(`[IP Check] Converted from IPv6 mapped to: ${clientIP}`);
  }

  // Remove port number if present
  if (clientIP && clientIP.includes(":")) {
    const beforePort = clientIP;
    clientIP = clientIP.split(":")[0];
    console.log(`[IP Check] Removed port: ${beforePort} -> ${clientIP}`);
  }

  // Trim whitespace
  clientIP = clientIP?.trim() || "UNKNOWN";

  console.log(`[IP Check] Final resolved IP: ${clientIP}`);
  console.log(`[IP Check] Allowed IPs: ${ALLOWED_IPS.join(", ")}`);
  console.log(`[IP Check] IP in whitelist: ${ALLOWED_IPS.includes(clientIP)}`);

  if (ALLOWED_IPS.includes(clientIP)) {
    console.log(`[IP Check] ✅ ACCESS GRANTED for IP: ${clientIP}`);
    next();
  } else {
    console.log(`[IP Check] ❌ ACCESS DENIED for IP: ${clientIP}`);
    console.log(`[IP Check] Expected one of:`, ALLOWED_IPS);
    return res.status(403).json({
      success: false,
      message: `Access denied. Your IP (${clientIP}) is not authorized to perform this action. Allowed IPs: ${ALLOWED_IPS.join(", ")}`,
    });
  }
};
