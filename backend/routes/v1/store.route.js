import express from "express";
import { create_store, delete_store, fetch_storeIds, get_store, get_stores, toggleStoreLive, update_store } from "../../controllers/v1/store.controller.js";
import multer from "multer";

const router = express.Router();

// Multer setup (to handle file uploads)
const storage = multer.memoryStorage({});
const upload = multer({ storage });

router.post("/create_store", upload.single("image"), create_store);
router.post("/update_store", upload.single("image"), update_store);
router.post("/toggleStoreLive", toggleStoreLive);

router.get("/get_store/:storeId", get_store);
router.get("/get_stores", get_stores);
router.get("/fetch_storeIds", fetch_storeIds);

router.delete("/delete_store/:storeId", delete_store);

// delete store
export default router;

