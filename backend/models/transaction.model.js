import mongoose from "mongoose";
// import { mainConnection } from "../config/db.js";
import { getMainModel } from "../utils/db.js";

const transactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    email: String,
    type: { type: String, enum: ["Subscription", "Addons"], required: true },
    transactionType: {
      type: String,
      enum: ["Subscription", "Renewal", "Upgrade", "Addons", "Payment"],
      required: true,
    },
    reference: { type: String, required: true },
    access_code: String,
    amount: { type: Number, required: true },
    metadata: Map,
    status: { type: String, default: "pending" }, // pending | paid | failed | completed
    paymentMethod: { type: String, default: "Paystack" },
  },
  { timestamps: true }
);

// const Transaction = mainConnection.model("Transaction", transactionSchema);
const Transaction = await getMainModel("Transaction", transactionSchema);

export default Transaction;
