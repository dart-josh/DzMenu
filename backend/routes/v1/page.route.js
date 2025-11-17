import express from "express";
import { create_page, delete_page, fetch_page, get_pages, togglePageLive, update_page } from "../../controllers/v1/page.controller.js";
const router = express.Router();

router.get("/fetch/:storeId/:pageId", fetch_page);
router.get("/fetch/:storeId", fetch_page);

//! protected by auth & owner
router.post("/create/:storeId", create_page);
router.post("/update/:storeId", update_page);
router.post("/togglePageLive", togglePageLive);
router.delete("/delete/:storeId/:pageId", delete_page)

router.get("/get_pages/:storeId", get_pages)

export default router;

