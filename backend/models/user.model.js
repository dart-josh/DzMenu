import mongoose from "mongoose";
import { mainConnection } from "../config/db.js";

const planDetails = {
  // id, name, limits, period, expDate
};

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

    planDetails: {type: Map},
    paymentHistory: {type: Map},

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