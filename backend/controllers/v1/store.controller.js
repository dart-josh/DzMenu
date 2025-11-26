import cloudinary, { uploadToCloudinary } from "../../lib/cloudinary.js";
import { Store } from "../../models/store.model.js";
import { getTenantConnection } from "../../utils/tenantManager.js";
import { cleanUserDetails, isPlanActive, updatePlanUsage } from "./user.controller.js";

// create store
export const create_store = async (req, res) => {
  try {
    const { storeId, storeName, segment, slogan, shortInfo } = req.body;
    const dbName = `store_${storeId}`;

    const user = req.user;

    if (!user) return res.status(400).json({ error: "User invalid" });

    if (!isPlanActive(user.planDetails?.renewalDate)) return res.status(400).json({ error: "No active plan" });

    if (
      user.planUsage?.stores >=
      (user.planDetails?.limits.stores || 0) +
        (user.planDetails?.addons?.stores || 0)
    )
      return res.status(400).json({ error: "Store limit reached" });

    if (!storeId || !storeName)
      return res.status(400).json({ error: "Store invalid" });

    // Check if storeId exists
    const store_exist = await Store.findOne({
      $or: [{ storeId }, { dbName }],
    });
    if (store_exist)
      return res.status(400).json({ error: "Store already exist" });

    let storeImage = "";
    if (req.file) {
      storeImage = await addUpdateStoreImage(req.file.buffer, storeId);
    }

    // Save store record
    const store = await Store.create({
      storeId,
      dbName,
      storeName,
      segment,
      slogan,
      shortInfo,
      user,
      storeImage,
    });

    const newUser = await updatePlanUsage(user?._id, "stores", 1);

    // Initialize DB (optional)
    const conn = await getTenantConnection(dbName);

    res.json({
      message: "Store created",
      store,
      user: cleanUserDetails(newUser._doc),
    });
  } catch (error) {
    console.error("❌ Error v1 store.controller create_store:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// update store
export const update_store = async (req, res) => {
  try {
    const { storeId, storeName, segment, slogan, shortInfo, deleteImage } =
      req.body;

    if (!storeId || !storeName)
      return res.status(400).json({ error: "Store invalid" });

    const store_exist = await Store.findOne({ storeId });
    if (!store_exist) return res.status(404).json({ error: "Store not found" });

    let storeImage = "";
    if (req.file) {
      if (store_exist.storeImage) {
        const deleted = await deleteStoreImage(store_exist.storeImage, storeId);
        if (!deleted)
          return res.status(400).json({ error: "Error updating image" });
      }

      storeImage = await addUpdateStoreImage(req.file.buffer, storeId);
    }

    if (deleteImage && !req.file) {
      const deleted = await deleteStoreImage(store_exist.storeImage, storeId);
      if (!deleted)
        return res.status(400).json({ error: "Error updating image" });

      storeImage = "";
    }

    // Save store record
    const store = await Store.findOneAndUpdate(
      { storeId },
      { storeName, segment, slogan, shortInfo, storeImage },
      { new: true }
    );

    store.dbName = undefined;

    res.json({ message: "Store updated", store });
  } catch (error) {
    console.error("❌ Error v1 store.controller update_store:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// storeLive
export const toggleStoreLive = async (req, res) => {
  try {
    const { storeId, value } = req.body;

    if (!storeId) return res.status(400).json({ error: "Store invalid" });

    const store_exist = await Store.findOne({ storeId });
    if (!store_exist) return res.status(404).json({ error: "Store not found" });

    // Save store record
    const store = await Store.findOneAndUpdate(
      { storeId },
      { storeLive: value },
      { new: true }
    );

    store.dbName = undefined;

    res.json({ message: `Store ${value ? "live" : "hidden"}`, store });
  } catch (error) {
    console.error("❌ Error v1 store.controller toggleStoreLive:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// get store
export const get_store = async (req, res) => {
  try {
    const { storeId } = req.params;

    if (!storeId) return res.status(400).json({ error: "Store invalid" });

    const user = req.user;
    if (!user) return res.status(404).json({ error: "User Invalid" });

    const store = await Store.findOne({ $and: [{ storeId }, { user }] }).select(
      "-dbName"
    ); //, { user }
    if (!store) return res.status(404).json({ error: "Store not found" });

    res.json(store);
  } catch (err) {
    console.error("❌ Error in v1 store.controller get_store:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// get all stores
export const get_stores = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return null;

    const stores = await Store.find({ user }).select("-dbName"); // { user }

    res.json(stores);
  } catch (err) {
    console.error("❌ Error in v1 store.controller get_stores:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// delete store
export const delete_store = async (req, res) => {
  try {
    const { storeId } = req.params;
    const user = req.user;

    if (!user) return res.status(400).json({ error: "Invalid user" });

    if (!storeId) return res.status(400).json({ error: "Store invalid" });

    const oldStore = await Store.findOne({ storeId, user });
    if (!oldStore) return res.status(404).json({ error: "Store not found" });

    if (oldStore.storeImage) {
      await deleteStoreImage(oldStore.storeImage, storeId);
    }

    const result = await Store.deleteOne({ storeId });

    if (result.deletedCount === 0)
      return res.status(404).json({ error: "Store not found" });

    const newUser = await updatePlanUsage(user?._id, "stores", -1);

    return res
      .status(200)
      .json({ message: "Store deleted", user: cleanUserDetails(newUser._doc) });
  } catch (err) {
    console.error("❌ Error in v1 store.controller delete_store:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// fetch all store id
export const fetch_storeIds = async (req, res) => {
  try {
    const stores = await Store.find({}).select("storeId");

    const storeIds = stores.map((s) => s.storeId);

    res.json(storeIds);
  } catch (err) {
    console.error("❌ Error in v1 store.controller get_stores:", err);
    res.status(500).json({ error: "Server error" });
  }
};

//? UTILS

export const addUpdateStoreImage = async (image, storeId) => {
  try {
    let cloudinaryResponse = null;

    if (image) {
      cloudinaryResponse = await uploadToCloudinary(image, `${storeId}/logo`);
    }

    return cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "";
  } catch (error) {
    console.log("Error in addUpdateStoreImage: ", error);
    return "";
  }
};

export const deleteStoreImage = async (image, storeId) => {
  try {
    if (image) {
      const publicId = await image.split("/").pop().split(".")[0];
      console.log("delete-----", publicId);

      await cloudinary.uploader.destroy(`${storeId}/logo/${publicId}`);
    }

    return true;
  } catch (error) {
    console.log("Error in deleteStoreImage: ", error);
    return false;
  }
};
