import express from "express";
import { create_page, delete_page, fetch_page, get_pages, update_page } from "../../controllers/v1/page.controller.js";
const router = express.Router();

router.get("/fetch/:storeId/:link", fetch_page);
router.get("/fetch/:storeId", fetch_page);

//! protected by auth & owner
router.post("/create/:storeId", create_page);
router.post("/update/:storeId", update_page);
router.delete("/delete/:storeId/:link", delete_page)

router.get("/get_pages/:storeId", get_pages)

export default router;

