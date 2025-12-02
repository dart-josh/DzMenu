import express from "express";
import { checkPayments } from "../../controllers/v1/cron.controller.js";
import { vercel_ipBlocker } from "../../middleware/ipBlocker.middleware.js";

const router = express.Router();

// Paystack requires raw body
router.get("/checkPayments", vercel_ipBlocker, checkPayments);

export default router;
