import express from "express";
import storeRoutes from "./store.route.js";
import pageRoutes from "./page.route.js";
import productRoutes from "./product.route.js";

const router = express.Router();

router.use("/store", storeRoutes);
router.use("/page", pageRoutes);
router.use("/product", productRoutes);

export default router;