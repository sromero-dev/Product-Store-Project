import dotenv from "dotenv";

dotenv.config();

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

console.log("[Admin Auth] Password middleware initialized");
console.log(
  "[Admin Auth] ADMIN_PASSWORD is set:",
  !!process.env.ADMIN_PASSWORD,
);

export const adminAuth = (req, res, next) => {
  // Get password from request body or headers
  const password = req.body?.adminPassword || req.headers["x-admin-password"];

  console.log(
    `[Admin Auth] Received password: ${password ? "***" : "MISSING"}`,
  );
  console.log(
    `[Admin Auth] Expected password: ${ADMIN_PASSWORD ? "***" : "MISSING"}`,
  );

  if (!password) {
    console.log(`[Admin Auth] ❌ ACCESS DENIED - No password provided`);
    return res.status(401).json({
      success: false,
      message: "Admin password is required to perform this action",
    });
  }

  if (password !== ADMIN_PASSWORD) {
    console.log(
      `[Admin Auth] ❌ ACCESS DENIED - Incorrect password. Got: ${password}, Expected: ${ADMIN_PASSWORD}`,
    );
    return res.status(403).json({
      success: false,
      message: "Incorrect admin password",
    });
  }

  console.log(`[Admin Auth] ✅ ACCESS GRANTED - Correct password`);
  next();
};
