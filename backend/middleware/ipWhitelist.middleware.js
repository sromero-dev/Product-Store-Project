// Middleware to restrict access to certain operations based on IP whitelist
// Usage: app.post('/api/products', ipWhitelist, addProduct)

const ALLOWED_IPS = [
  "91.117.234.145", // Your home/office IP
  "127.0.0.1",      // localhost (for local development)
  "::1",             // localhost IPv6 (for local development)
];

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
