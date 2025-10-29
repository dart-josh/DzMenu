import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
  productId: {type: String, unique: true, required: true},
  name: {type: String, required: true},
  price: {type: Number, default: 0},
  image: String,
  category: {type: String, default: 'All'},
  description: String,
});

export const categorySchema = new mongoose.Schema({
  category: {type: String, required: true, unique: true},
});

// http://localhost:5173/client/store/del/create_product