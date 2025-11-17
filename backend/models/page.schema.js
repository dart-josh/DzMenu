import mongoose from "mongoose";

export const pageSchema = new mongoose.Schema(
  {
    pageId: { type: String, unique: true, required: true },
    pageTitle: String,
    pageType: { type: String, required: true },
    description: String,
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    categories: [],
    defaultCategory: { type: String, default: "All" },
    listStyle: [],
    defaultListStyle: { type: String, default: "grid" },
    shuffleProducts: { type: Boolean, default: false },
    externalPages: [],
    visibility: { type: String, default:'Hidden', enum: ["Live", "Hidden"] },
    defaultPage: { type: Boolean, default: false },
  },
  { timestamps: true }
);
