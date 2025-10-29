import mongoose from "mongoose";

export const pageSchema = new mongoose.Schema({
  link: { type: String, unique: true, required: true },
  pageType: {type: String, required: true},
  title: String,
  description: String,
  products: [{type: mongoose.Schema.Types.ObjectId, ref: "Product"}],
  categories: [],
  category: { type: String, default: "All" },
  listTypes: [],
  listType: { type: String, default: "grid" },
  pages: [],
  shuffleList: { type: Boolean, default: false },
  defaultPage: {type: Boolean, default: false},
  createdAt: { type: Date, default: Date.now },
});
