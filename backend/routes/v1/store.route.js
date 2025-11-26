import express from "express";
import {
  create_store,
  delete_store,
  fetch_storeIds,
  get_store,
  get_stores,
  toggleStoreLive,
  update_store,
} from "../../controllers/v1/store.controller.js";
import multer from "multer";
import { userProtect } from "../../middleware/auth.middleware.js";

const router = express.Router();

// Multer setup (to handle file uploads)
const storage = multer.memoryStorage({});
const upload = multer({ storage });

router.post("/create_store", userProtect, upload.single("image"), create_store);
router.post("/update_store", upload.single("image"), update_store);
router.post("/toggleStoreLive", toggleStoreLive);

router.get("/get_store/:storeId", userProtect, get_store);
router.get("/get_stores", userProtect, get_stores);
router.get("/fetch_storeIds", fetch_storeIds);

router.delete("/delete_store/:storeId", userProtect, delete_store);

// delete store
export default router;
