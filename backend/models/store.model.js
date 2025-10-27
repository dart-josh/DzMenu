import mongoose from "mongoose";
import { mainConnection } from "../config/db.js";

const storeSchema = new mongoose.Schema({
  storeId: { type: String, unique: true },
  dbName: { type: String, required: true },
  name: String,
  createdAt: { type: Date, default: Date.now },
});

export const Store = mainConnection.model("Store", storeSchema);
