import express from "express";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controller/product.controller.js";

export const router = express.Router(); // Creates a router instance

// /api/products - GET, POST, PUT, DELETE

router.get("/", getProducts);
router.post("/", addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router; // Export the router to be used in server.js
