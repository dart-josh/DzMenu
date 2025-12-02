import express from "express";
import { userProtect } from "../../middleware/auth.middleware.js";
import {
  completePayment,
  createPayment,
  getPaymentStatus,
  verifyPayment,
} from "../../controllers/v1/payment.controller.js";

const router = express.Router();

router.post("/create", userProtect, createPayment);

router.get("/status/:reference", userProtect, getPaymentStatus);
router.get("/complete/:reference", userProtect, completePayment);
router.get("/verifyPayment", userProtect, verifyPayment);

export default router;
