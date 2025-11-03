import { categorySchema, productSchema } from "../../models/product.schema.js";
import { Store } from "../../models/store.model.js";
import { getTenantModel } from "../../utils/tenantManager.js";
import cloudinary from "../../lib/cloudinary.js";

// create product //! Test images
export const create_product = async (req, res) => {
  // productId, name, price, image, category, description
  try {
    const { storeId } = req.params;
    const productDetails = req.body;

    if (!storeId) return res.status(400).json({ error: "Store invalid" });

    if (!productDetails?.name || !productDetails?.productId)
      return res.status(400).json({ error: "Product invalid" });

    const store = await Store.findOne({ storeId });
    if (!store) return res.status(404).json({ error: "Store not found" });

    // Get model from store
    const Product = await getTenantModel(
      store.dbName,
      "Product",
      productSchema
    );

    const product_exist = await Product.findOne({
      $or: [
        { name: productDetails.name },
        { productId: productDetails.productId },
      ],
    });

    if (product_exist)
      return res.status(409).json({ error: "Product exist already" });

    if (req.file) {
      let imageUrl = "";
      imageUrl = await addUpdateProductImage(req.file.buffer, storeId);
      if (imageUrl) productDetails.image = imageUrl;

      //!
      console.log(imageUrl);
    }

    const product = await Product.create(productDetails);
    res.status(201).json({ message: "Product created", product });
  } catch (err) {
    console.error("❌ Error in v1 product.controller create_product:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// update product //! Test image, check no other product has same name
export const update_product = async (req, res) => {
  try {
    const { storeId } = req.params;
    const productDetails = req.body;

    if (!storeId) return res.status(400).json({ error: "Store invalid" });

    if (!productDetails?.name || !productDetails?.productId)
      return res.status(400).json({ error: "Product invalid" });

    const store = await Store.findOne({ storeId });
    if (!store) return res.status(404).json({ error: "Store not found" });

    // Get model from store
    const Product = await getTenantModel(
      store.dbName,
      "Product",
      productSchema
    );

    if (req.file) {
      let imageUrl = "";
      const oldProduct = await Product.findOne({
        productId: productDetails.productId,
      });
      if (!oldProduct)
        return res.status(404).json({ error: "Product not found" });

      if (oldProduct.image) {
        const deleted = await deleteProductImage(oldProduct.image, storeId);
        if (!deleted)
          return res.status(400).json({ error: "Error updating image" });
      }

      imageUrl = await addUpdateProductImage(req.file.buffer, storeId);
      if (imageUrl) productDetails.image = imageUrl;

      //!
      console.log(imageUrl);
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { productId: productDetails.productId },
      { $set: productDetails },
      { new: true, runValidators: true }
    );

    if (!updatedProduct)
      return res.status(404).json({ error: "Product not found" });

    res.status(200).json({ message: "Product updated", updatedProduct });
  } catch (err) {
    console.error("❌ Error in v1 product.controller update_product:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// delete product //! Test image
export const delete_product = async (req, res) => {
  try {
    const { storeId, productId } = req.params;

    if (!storeId) return res.status(400).json({ error: "Store invalid" });

    if (!productId) return res.status(400).json({ error: "Product invalid" });

    const store = await Store.findOne({ storeId });
    if (!store) return res.status(404).json({ error: "Store not found" });

    const Product = await getTenantModel(
      store.dbName,
      "Product",
      productSchema
    );

    const oldProduct = Product.findOne({ productId });
    if (!oldProduct)
      return res.status(404).json({ error: "Product not found" });

    const result = await Product.deleteOne({ productId });

    if (result.deletedCount === 0)
      return res.status(404).json({ error: "Product not found" });

    if (oldProduct.image) {
      await deleteProductImage(oldProduct.image, storeId);
    }

    return res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    console.error("❌ Error in v1 product.controller delete_product:", err);
    res.status(500).json({ error: "Server error" });
  }
};

//?

//? CATEGORY

// add category
export const add_category = async (req, res) => {
  // productId, name, price, image, category, description
  try {
    const { storeId } = req.params;
    const { category } = req.body;

    if (!storeId) return res.status(400).json({ error: "Store invalid" });

    if (!category) return res.status(400).json({ error: "Enter Category" });

    const store = await Store.findOne({ storeId });
    if (!store) return res.status(404).json({ error: "Store not found" });

    // Get model from store
    const Category = await getTenantModel(
      store.dbName,
      "Category",
      categorySchema
    );

    const category_exist = await Category.findOne({ category });

    if (category_exist)
      return res.status(409).json({ error: "Category exist already" });

    const new_category = await Category.create({ category });
    res.status(201).json({ message: "Category created", new_category });
  } catch (err) {
    console.error("❌ Error in v1 product.controller add_category:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// remove category
export const remove_category = async (req, res) => {
  try {
    const { storeId, category } = req.params;

    if (!storeId) return res.status(400).json({ error: "Store invalid" });

    if (!category) return res.status(400).json({ error: "Category invalid" });

    const store = await Store.findOne({ storeId });
    if (!store) return res.status(404).json({ error: "Store not found" });

    const Category = await getTenantModel(
      store.dbName,
      "Category",
      categorySchema
    );

    const result = await Category.deleteOne({ category });

    if (result.deletedCount === 0)
      return res.status(404).json({ error: "Category not found" });

    return res.status(200).json({ message: "Category deleted" });
  } catch (err) {
    console.error("❌ Error in v1 product.controller remove_category:", err);
    res.status(500).json({ error: "Server error" });
  }
};

//?

//? UTILS

export const addUpdateProductImage = async (image, storeId) => {
  try {
    let cloudinaryResponse = null;

    if (image) {
      cloudinaryResponse = await uploadToCloudinary(
        image,
        `${storeId}/products`
      );
    }

    return cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "";
  } catch (error) {
    console.log("Error in addUpdateProductImage: ", error);
    return "";
  }
};

export const deleteProductImage = async (image, storeId) => {
  try {
    if (image) {
      const publicId = await image.split("/").pop().split(".")[0];

      await cloudinary.uploader.destroy(`${storeId}/products/${publicId}`);
    }

    return true;
  } catch (error) {
    console.log("Error in deleteProductImage: ", error);
    return false;
  }
};

// Upload buffer to Cloudinary using upload_stream
const uploadToCloudinary = (image, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder, // optional: folder name on Cloudinary
        resource_type: "auto", // auto-detect file type (image/video)
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(image);
  });
};
