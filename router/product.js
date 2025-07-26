import { createProduct,getAllProducts,getProductById,updateProduct,deleteProduct} from "../controllers/productController.js"
import adminOnly from "../middlewares/admin.js";
import protect from "../middlewares/auth.js";
import express from "express";

// const express = require('express');
const router = express.Router();
router.post('/products', protect, adminOnly, createProduct);
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.put('/products/:id', protect, adminOnly, updateProduct);
router.delete('/products/:id', protect, adminOnly, deleteProduct);





export default router;