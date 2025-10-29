import express from "express";
import { create_store, delete_store, get_store, get_stores, update_store } from "../../controllers/v1/store.controller.js";

const router = express.Router();

router.post("/create_store", create_store);
router.post("/update_store", update_store);

router.get("/get_store/:storeId", get_store);
router.get("/get_stores", get_stores);

router.delete("/delete_store/:storeId", delete_store);

// delete store
export default router;

