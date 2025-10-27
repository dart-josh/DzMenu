import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const isDev = process.env.NODE_ENV === "development";
const db_uri = isDev ? process.env.DEV_MONGO_MAIN_URI : process.env.MONGO_MAIN_URI;
console.log(db_uri)
export const mainConnection = mongoose.createConnection(db_uri, {
  maxPoolSize: 10,
});

mainConnection.on("connected", () => console.log("✅ Connected to main DB"));
mainConnection.on("error", err => console.error("❌ Main DB error:", err));

