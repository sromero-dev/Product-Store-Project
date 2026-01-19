import express from "express";

const router = express.Router();

// Diagnostics endpoint - shows current IP detection
router.get("/debug/ip", (req, res) => {
  const diagnostics = {
    "req.ip": req.ip,
    "req.connection.remoteAddress": req.connection?.remoteAddress,
    "req.socket.remoteAddress": req.socket?.remoteAddress,
    "x-forwarded-for": req.headers["x-forwarded-for"],
    "x-real-ip": req.headers["x-real-ip"],
    "user-agent": req.headers["user-agent"],
    timestamp: new Date().toISOString(),
  };

  return res.json({
    success: true,
    message: "IP Detection Diagnostics",
    diagnostics,
  });
});

export default router;
