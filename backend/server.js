import express from "express";
import dotenv from "dotenv";
import path from "path";

import { connectDB } from "./config/db.js";
import productRouter from "./routes/products.route.js";
import debugRouter from "./routes/debug.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

// Trust proxy - important for getting real client IP from proxies
app.set("trust proxy", true);

app.use(express.json()); // Allows JSON data

app.use("/api/products", productRouter); // Product routes (redirect to products.route.js)
app.use("/api/debug", debugRouter); // Debug routes for diagnostics

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running at http://localhost:" + PORT);
});
