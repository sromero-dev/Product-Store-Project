import express from "express";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controller/product.controller.js";
import { adminAuth } from "../middleware/adminAuth.middleware.js";

export const router = express.Router(); // Creates a router instance

// /api/products - GET is public, POST/PUT/DELETE require admin password
router.get("/", getProducts); // Anyone can view products
router.post("/", adminAuth, addProduct); // Create requires admin password
router.put("/:id", adminAuth, updateProduct); // Update requires admin password
router.delete("/:id", adminAuth, deleteProduct); // Delete requires admin password

export default router; // Export the router to be used in server.js
