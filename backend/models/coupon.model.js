import mongoose from "mongoose";
import { getMainModel } from "../utils/db.js";

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  type: { type: String, required: true, enum: ["percentage", "fixed"] },
  value: { type: Number, required: true },
  maxDiscount: { type: Number },
  minCartValue: { type: Number },
  usageLimit: { type: Number },
  usedCount: { type: Number },
  expiresAt: { type: Date },
  allowedPlans: Array,
  allowedUsers: Array,
  isActive: { type: Boolean, default: true },
});

const Coupon = await getMainModel("Coupon", couponSchema);

export default Coupon;
