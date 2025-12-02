import express from "express";
import bodyParser from "body-parser";
import { userProtect } from "../../middleware/auth.middleware.js";
import { paystackWebhook } from "../../controllers/v1/webhook.controller.js";
import { paystack_ipBlocker } from "../../middleware/ipBlocker.middleware.js";

const router = express.Router();

// Paystack requires raw body
router.post(
  "/paystack/webhook",
  bodyParser.raw({ type: "application/json" }),
  paystack_ipBlocker,
  paystackWebhook
);

// router.get("/get_pages/:storeId", userProtect, get_pages);

export default router;
