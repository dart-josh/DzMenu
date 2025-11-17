import mongoose from "mongoose";
import { mainConnection } from "../config/db.js";

const storeSchema = new mongoose.Schema(
  {
    storeId: { type: String, unique: true, required: true },
    dbName: { type: String, required: true, unique: true },
    storeName: { type: String, required: true },
    segment: String,
    slogan: String,
    shortInfo: String,
    storeLive: Boolean,
    storeImage: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Store = mainConnection.model("Store", storeSchema);
