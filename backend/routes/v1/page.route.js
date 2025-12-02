import express from "express";
import {
  create_page,
  delete_page,
  fetch_page,
  get_pages,
  togglePageLive,
  update_page,
} from "../../controllers/v1/page.controller.js";
import { userProtect } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.get("/fetch/:storeId/:pageId", fetch_page);
router.get("/fetch/:storeId", fetch_page);
 
//! protected by auth & owner
router.post("/create/:storeId", userProtect, create_page);
router.post("/update/:storeId", userProtect, update_page);
router.post("/togglePageLive", userProtect, togglePageLive);
router.delete("/delete/:storeId/:pageId", userProtect, delete_page);

router.get("/get_pages/:storeId", userProtect, get_pages);

export default router;
