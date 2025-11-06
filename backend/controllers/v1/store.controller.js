import { Store } from "../../models/store.model.js";
import { getTenantConnection } from "../../utils/tenantManager.js";

// create store
export const create_store = async (req, res) => {
  try {
    const { storeId, storeName, storeSegment, slogan, shortInfo } = req.body;
    const dbName = `store_${storeId}`;

    const user = req.user;

    if (!storeId || !storeName)
      return res.status(400).json({ error: "Store invalid" });

    // Check if storeId exists
    const store_exist = await Store.findOne({
      $or: [{ storeId }, { dbName }],
    });
    if (store_exist)
      return res.status(400).json({ error: "Store already exist" });

    // Save store record
    await Store.create({
      storeId,
      dbName,
      storeName,
      storeSegment,
      slogan,
      shortInfo,
      user,
    });

    // Initialize DB (optional)
    const conn = await getTenantConnection(dbName);

    res.json({ message: "Store created", storeId });
  } catch (error) {
    console.error("❌ Error v1 store.controller create_store:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// update store
export const update_store = async (req, res) => {
  try {
    const { storeId, storeName, storeType, address } = req.body;

    if (!storeId || !storeName)
      return res.status(400).json({ error: "Store invalid" });

    const store_exist = await Store.findOne({ storeId });
    if (!store_exist) return res.status(404).json({ error: "Store not found" });

    // Save store record
    const store = await Store.findOneAndUpdate(
      { storeId },
      { storeName, storeType, address },
      { new: true }
    );

    store.dbName = undefined;

    res.json({ message: "Store updated", store });
  } catch (error) {
    console.error("❌ Error v1 store.controller update_store:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// get store
export const get_store = async (req, res) => {
  try {
    const { storeId } = req.params;

    if (!storeId) return res.status(400).json({ error: "Store invalid" });

    const user = req.user;

    const store = await Store.findOne({ $or: [{ storeId }] }).select("-dbName"); //, { user }
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

    const store = await Store.find({ user }).select("-dbName"); // { user }

    res.json(store);
  } catch (err) {
    console.error("❌ Error in v1 store.controller get_stores:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// delete store
export const delete_store = async (req, res) => {
  try {
    const { storeId } = req.params;

    if (!storeId) return res.status(400).json({ error: "Store invalid" });

    const result = await Store.deleteOne({ storeId });

    if (result.deletedCount === 0)
      return res.status(404).json({ error: "Store not found" });

    return res.status(200).json({ message: "Store deleted" });
  } catch (err) {
    console.error("❌ Error in v1 store.controller delete_store:", err);
    res.status(500).json({ error: "Server error" });
  }
};
