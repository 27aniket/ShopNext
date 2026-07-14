import express, { Router } from "express";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

import multer from "multer";
const upload = multer({ dest: "uploads/"});

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, upload.single("image"), createProduct);
router.route('/:id').get(getProductsById).put(protect, admin, upload.single("image"), updateProduct).delete(protect, admin, deleteProduct)


export default router;
