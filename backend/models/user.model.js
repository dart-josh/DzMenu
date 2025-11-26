import mongoose from "mongoose";
import { mainConnection } from "../config/db.js";

const planDetailsSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },

  limits: {
    stores: { type: Number, default: 0 },
    pages: { type: Number, default: 0 },
    products: { type: Number, default: 0 },
  },

  addons: {
    stores: { type: Number, default: 0 },
    pages: { type: Number, default: 0 },
    products: { type: Number, default: 0 },
  },

  billing: {type: String},
  renewalDate: { type: Date },
  autoRenewal: { type: Boolean, default: false },
});

const planUsageSchema = new mongoose.Schema({
    stores: { type: Number, default: 0 },
    pages: { type: Number, default: 0 },
    products: { type: Number, default: 0 },
  });

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 6 },
    fullname: { type: String },
    userRole: { type: String },
    // contactNumber: { type: String },

    planDetails: planDetailsSchema,
    paymentHistory: { type: Map },

    planUsage: {
      type: planUsageSchema,
      default: () => ({}),
    },

    lastLogin: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },

    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timestamps: true }
);

const User = mainConnection.model("User", userSchema);

export default User;
