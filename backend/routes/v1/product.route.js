import express from "express";
import {
  add_category,
  create_product,
  delete_product,
  get_categories,
  get_products,
  remove_category,
  update_product,
} from "../../controllers/v1/product.controller.js";
import { userProtect } from "../../middleware/auth.middleware.js";

import multer from "multer";

const router = express.Router();

// Multer setup (to handle file uploads)
const storage = multer.memoryStorage({});
const upload = multer({ storage });

//! protected by auth & owner
router.post(
  "/create/:storeId",
  userProtect,
  upload.single("image"),
  create_product
);
router.post(
  "/update/:storeId",
  userProtect,
  upload.single("image"),
  update_product
);
router.get("/get_products/:storeId", get_products);

router.delete("/delete/:storeId/:productId", userProtect, delete_product);

router.post("/add_category/:storeId", add_category);
router.get("/get_categories/:storeId", get_categories);

router.delete("/remove_category/:storeId/:category", remove_category);

export default router;
