import express from "express";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controller/product.controller.js";
import { ipWhitelist } from "../middleware/ipWhitelist.middleware.js";

export const router = express.Router(); // Creates a router instance

// IP whitelist middleware - only in development
// In production on Render, IP whitelist is disabled for easier access
const requireIPWhitelist =
  process.env.NODE_ENV === "development"
    ? ipWhitelist
    : (req, res, next) => next();

// /api/products - GET is public, POST/PUT/DELETE require IP whitelist (dev only)
router.get("/", getProducts); // Anyone can view products
router.post("/", requireIPWhitelist, addProduct); // Create requires whitelist (dev) or open (prod)
router.put("/:id", requireIPWhitelist, updateProduct); // Update requires whitelist (dev) or open (prod)
router.delete("/:id", requireIPWhitelist, deleteProduct); // Delete requires whitelist (dev) or open (prod)

export default router; // Export the router to be used in server.js
