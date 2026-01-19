import express from "express";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controller/product.controller.js";
import { ipWhitelist } from "../middleware/ipWhitelist.middleware.js";

export const router = express.Router(); // Creates a router instance

// /api/products - GET is public, POST/PUT/DELETE require IP whitelist
router.get("/", getProducts); // Anyone can view products
router.post("/", ipWhitelist, addProduct); // Only whitelisted IPs can create
router.put("/:id", ipWhitelist, updateProduct); // Only whitelisted IPs can update
router.delete("/:id", ipWhitelist, deleteProduct); // Only whitelisted IPs can delete

export default router; // Export the router to be used in server.js
