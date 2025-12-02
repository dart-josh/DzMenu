import { pageSchema } from "../../models/page.schema.js";
import { productSchema } from "../../models/product.schema.js";
import { Store } from "../../models/store.model.js";
import { getTenantModel } from "../../utils/db.js";
import {
  cleanUserDetails,
  planLimitCheck,
  updatePlanUsage,
} from "./user.controller.js";

// create page
export const create_page = async (req, res) => {
  try {
    const { storeId } = req.params;
    const { pageDetails } = req.body;

    const user = req.user;
    const limitCheck = planLimitCheck(user, "pages");
    if (!limitCheck.success)
      return res.status(400).json({ error: limitCheck.message });

    if (!storeId) return res.status(400).json({ error: "Store invalid" });

    if (!pageDetails?.pageId || !pageDetails?.pageType)
      return res.status(400).json({ error: "Page invalid" });

    const store = await Store.findOne({ storeId });
    if (!store) return res.status(404).json({ error: "Store not found" });

    // Get model from store
    const Page = await getTenantModel(store.dbName, "Page", pageSchema);

    const page_exist = await Page.findOne({ pageId: pageDetails.pageId });
    if (page_exist)
      return res.status(409).json({ error: "Page exist already" });

    // create page
    const page = await Page.create({ ...pageDetails });

    const newUser = await updatePlanUsage(user?._id, "pages", 1);

    const cleanedUser = await cleanUserDetails(newUser);
    res.status(201).json({
      message: "Page created",
      page,
      user: cleanedUser,
    });
  } catch (err) {
    console.error("❌ Error in v1 page.controller create_page:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// edit page
export const update_page = async (req, res) => {
  try {
    const { storeId } = req.params;
    const { pageDetails } = req.body;

    if (!storeId) return res.status(400).json({ error: "Store invalid" });

    if (!pageDetails?.pageId || !pageDetails?.pageType)
      return res.status(400).json({ error: "Page invalid" });

    const store = await Store.findOne({ storeId });
    if (!store) return res.status(404).json({ error: "Store not found" });

    // Get model from store
    const Page = await getTenantModel(store.dbName, "Page", pageSchema);

    const updatedPage = await Page.findOneAndUpdate(
      { pageId: pageDetails.pageId },
      { $set: pageDetails },
      { new: true, runValidators: true }
    );

    if (!updatedPage) return res.status(404).json({ error: "Page not found" });

    res.status(200).json({ message: "Page updated", updatedPage });
  } catch (err) {
    console.error("❌ Error in v1 page.controller update_page:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// pageLive
export const togglePageLive = async (req, res) => {
  try {
    const { storeId, pageId, value } = req.body;

    if (!storeId) return res.status(400).json({ error: "Store invalid" });

    const store = await Store.findOne({ storeId });
    if (!store) return res.status(404).json({ error: "Store not found" });

    // Get model from store
    const Page = await getTenantModel(store.dbName, "Page", pageSchema);

    const page = await Page.findOneAndUpdate(
      { pageId },
      { visibility: value ? "Live" : "Hidden" },
      { new: true }
    );

    res.json({ message: `Page ${value ? "live" : "hidden"}`, page });
  } catch (error) {
    console.error("❌ Error v1 page.controller togglePageLive:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// fetch page
export const fetch_page = async (req, res) => {
  try {
    const { storeId, pageId } = req.params;

    if (!storeId) return res.status(400).json({ error: "Store invalid" });

    const store = await Store.findOne({ storeId });
    if (!store) return res.status(404).json({ error: "Store not found" });

    const Product = await getTenantModel(
      store.dbName,
      "Product",
      productSchema
    );
    const Page = await getTenantModel(store.dbName, "Page", pageSchema);

    if (!pageId) {
      const page = await Page.findOne({ defaultPage: true });

      if (page?.products) {
        const products = await Product.find({ _id: { $in: page.products } });
        page.products = products;
      }

      return res.json(page);
    }

    const page = await Page.findOne({ pageId });

    if (page?.products) {
      const products = await Product.find({ _id: { $in: page.products } });
      page.products = products;
    }

    res.json(page);
  } catch (err) {
    console.error("❌ Error in v1 page.controller fetch_page:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// delete page
export const delete_page = async (req, res) => {
  try {
    const { storeId, pageId } = req.params;
    const user = req.user;

    if (!user) return res.status(400).json({ error: "Invalid user" });

    if (!storeId) return res.status(400).json({ error: "Store invalid" });

    if (!pageId) return res.status(400).json({ error: "Page invalid" });

    const store = await Store.findOne({ storeId });
    if (!store) return res.status(404).json({ error: "Store not found" });

    const Page = await getTenantModel(store.dbName, "Page", pageSchema);

    const result = await Page.deleteOne({ pageId });

    if (result.deletedCount === 0)
      return res.status(404).json({ error: "Page not found" });

    const newUser = await updatePlanUsage(user?._id, "pages", -1);

    const cleanedUser = await cleanUserDetails(newUser);
    return res.status(200).json({ message: "Page deleted", user: cleanedUser });
  } catch (err) {
    console.error("❌ Error in v1 page.controller delete_page:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// get pages
export const get_pages = async (req, res) => {
  try {
    const { storeId } = req.params;

    if (!storeId) return res.status(400).json({ error: "Store invalid" });

    const store = await Store.findOne({ storeId });
    if (!store) return res.status(404).json({ error: "Store not found" });

    const Page = await getTenantModel(store.dbName, "Page", pageSchema);

    const pages = await Page.find({});
    res.json(pages);
  } catch (err) {
    console.error("❌ Error in v1 page.controller get_pages:", err);
    res.status(500).json({ error: "Server error" });
  }
};
