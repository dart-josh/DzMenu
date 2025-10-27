import { pageSchema } from "../../models/page.schema.js";
import { Store } from "../../models/store.model.js";
import { getTenantModel } from "../../utils/tenantManager.js";

// create page
export const create_page = async (req, res) => {
  // link, title, description products, categories, category, listTypes, listType, pages, shuffleList
  try {
    const { storeId } = req.params;
    const { pageDetails } = req.body;

    if (!storeId) return res.status(400).json({ error: "Store invalid" });

    if (!pageDetails?.link)
      return res.status(400).json({ error: "Page invalid" });

    const store = await Store.findOne({ storeId });
    if (!store) return res.status(404).json({ error: "Store not found" });

    // Get model from store
    const Page = await getTenantModel(store.dbName, "Page", pageSchema);

    const page_exist = await Page.findOne({ link: pageDetails.link });
    if (page_exist)
      return res.status(409).json({ error: "Page exist already" });

    // create page
    const page = await Page.create({ ...pageDetails });

    res.status(201).json({ message: "Page created", page });
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

    if (!pageDetails?.link)
      return res.status(400).json({ error: "Page invalid" });

    const store = await Store.findOne({ storeId });
    if (!store) return res.status(404).json({ error: "Store not found" });

    // Get model from store
    const Page = await getTenantModel(store.dbName, "Page", pageSchema);

    const updatedPage = await Page.findOneAndUpdate(
      { link: pageDetails.link },
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

// fetch page
export const fetch_page = async (req, res) => {
  try {
    const { storeId, link } = req.params;

    if (!storeId) return res.status(400).json({ error: "Store invalid" });

    const store = await Store.findOne({ storeId });
    if (!store) return res.status(404).json({ error: "Store not found" });

    const Page = await getTenantModel(store.dbName, "Page", pageSchema);

    if (!link) {
      const page = await Page.findOne({ defaultPage: true });
      return res.json(page);
    }

    const page = await Page.findOne({ link });
    res.json(page);
  } catch (err) {
    console.error("❌ Error in v1 page.controller fetch_page:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// delete page
export const delete_page = async (req, res) => {
  try {
    const { storeId, link } = req.params;

    if (!storeId) return res.status(400).json({ error: "Store invalid" });

    if (!link) return res.status(400).json({ error: "Page invalid" });

    const store = await Store.findOne({ storeId });
    if (!store) return res.status(404).json({ error: "Store not found" });

    const Page = await getTenantModel(store.dbName, "Page", pageSchema);

    const result = await Page.deleteOne({ link });

    if (result.deletedCount === 0)
      return res.status(404).json({ error: "Page not found" });

    return res.status(200).json({ message: "Page deleted" });
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
