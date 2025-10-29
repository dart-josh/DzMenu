import express from "express";
import { add_category, create_product, delete_product, remove_category, update_product } from "../../controllers/v1/product.controller.js";


import multer from "multer";

const router = express.Router();

// Multer setup (to handle file uploads)
const storage = multer.diskStorage({});
const upload = multer({ storage });

//! protected by auth & owner
router.post("/create/:storeId", upload.single("image"), create_product);
router.post("/update/:storeId", upload.single("image"), update_product);

router.delete("/delete/:storeId/:productId", delete_product)

router.post("/add_category/:storeId", add_category);
router.delete("/remove_category/:storeId/:category", remove_category)

export default router;