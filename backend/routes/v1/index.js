import express from "express";
import storeRoutes from "./store.route.js";
import pageRoutes from "./page.route.js";
import productRoutes from "./product.route.js";
import authRoutes from "./auth.route.js";
import userRoutes from "./user.route.js";
import paymentRoutes from "./payment.route.js";
import webhookRoutes from "./webhook.route.js";
import cronRoutes from "./cron.route.js";

const router = express.Router();

router.use("/user", userRoutes)
router.use("/auth", authRoutes)
router.use("/store", storeRoutes);
router.use("/page", pageRoutes);
router.use("/product", productRoutes);
router.use("/payment", paymentRoutes);
router.use("/hooks", webhookRoutes);
router.use("/cron", cronRoutes);

export default router;