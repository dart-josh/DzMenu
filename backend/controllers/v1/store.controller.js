import { pageSchema } from "../../models/page.schema.js";
import { Store } from "../../models/store.model.js";
import {
  getTenantConnection,
} from "../../utils/tenantManager.js";

// create store
export const create_store = async (req, res) => {
  try {
    const { storeId, name } = req.body;
    const dbName = `store_${storeId}`;

    // ! Check if storeId exists

    // Save store record
    await Store.create({ storeId, dbName, name });

    // Initialize DB (optional)
    const conn = await getTenantConnection(dbName);

    res.json({ message: "Store created", dbName });
  } catch (error) {
    console.error("❌ Error v1 create_store:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// edit store

// get store

// delete store

