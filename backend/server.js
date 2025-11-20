import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRouter from "./routes/products.route.js";

dotenv.config();

const app = express();

app.use(express.json()); // Allows JSON data

app.use("/api/products", productRouter); // Product routes (redirect to products.route.js)

app.listen(3000, () => {
  connectDB();
  console.log("Server is running at http://localhost:3000");
});
