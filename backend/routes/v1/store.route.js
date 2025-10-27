import express from "express";
import { create_store } from "../../controllers/v1/store.controller.js";

const router = express.Router();

// create store
router.post("/create_store", create_store);

// delete store
export default router;

