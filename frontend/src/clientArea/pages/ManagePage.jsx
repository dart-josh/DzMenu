
import React, { useState, useMemo } from "react";
import {
  LayoutGrid,
  ShoppingBag,
  Plus,
  Pencil,
  Save,
  Eye,
  Tag,
  Grid3X3,
  List,
  Rows3,
  Package,
  Filter,
  Grid,
  Layers,
  Trash2,
  Calendar,
  Link2,
  Type,
  Check,
  X,
} from "lucide-react";

const sampleProducts = [
  { id: 1, name: "Berry Smoothie", category: "Smoothies" },
  { id: 2, name: "Tropical Juice", category: "Juice" },
  { id: 3, name: "Organic Bread", category: "Groceries" },
  { id: 4, name: "Green Detox", category: "Smoothies" },
  { id: 5, name: "Protein Shake", category: "Groceries" },
  { id: 6, name: "Apple Juice", category: "Juice" },
  { id: 7, name: "Coconut Blend", category: "Smoothies" },
  { id: 8, name: "Fresh Milk", category: "Dairy" },
];

const initialForm = {
  pageId: "pg-001",
  pageUrl: "/menu",
  pageTitle: "Menu Page",
  pageType: "Products", // Products | Menu | Slideview
  description: "This page displays all available menu items.",
  listStyle: ["grid"], // multi-select (grid, list, menu)
  defaultListStyle: "grid",
  categories: ["Smoothies", "Juice"],
  newCategory: "",
  products: [1, 4], // product ids
  shuffle: false,
  visibility: "Live", // Live | Hidden
  createdAt: "2025-11-03",
};

export default function ManagePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(initialForm);

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTab, setDialogTab] = useState("select"); // select | current
  const [selectMode, setSelectMode] = useState("all"); // all | category
  const [filterCategory, setFilterCategory] = useState("All");

  const categoriesList = useMemo(() => {
    // derive from sample products + form categories
    const fromProducts = Array.from(
      new Set(sampleProducts.map((p) => p.category))
    ).sort();
    const merged = Array.from(new Set([...form.categories, ...fromProducts]));
    return ["All", ...merged];
  }, [form.categories]);

  function updateField(k, v) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  function toggleListStyle(style) {
    if (!isEditing) return;
    setForm((s) =>
      s.listStyle.includes(style)
        ? { ...s, listStyle: s.listStyle.filter((x) => x !== style) }
        : { ...s, listStyle: [...s.listStyle, style] }
    );
  }

  function setDefaultStyle(style) {
    if (!isEditing) return;
    if (!form.listStyle.includes(style)) return;
    setForm((s) => ({ ...s, defaultListStyle: style }));
  }

  function toggleCategory(cat) {
    if (!isEditing) return;
    setForm((s) =>
      s.categories.includes(cat)
        ? { ...s, categories: s.categories.filter((c) => c !== cat) }
        : { ...s, categories: [...s.categories, cat] }
    );
  }

  function addCategory() {
    const v = form.newCategory?.trim();
    if (!isEditing || !v) return;
    if (!form.categories.includes(v)) {
      setForm((s) => ({
        ...s,
        categories: [...s.categories, v],
        newCategory: "",
      }));
    } else {
      setForm((s) => ({ ...s, newCategory: "" }));
    }
  }

  function toggleProductSelection(id) {
    if (!isEditing) return;
    setForm((s) =>
      s.products.includes(id)
        ? { ...s, products: s.products.filter((x) => x !== id) }
        : { ...s, products: [...s.products, id] }
    );
  }

  function savePage() {
    // placeholder: persist form (call API)
    // We'll just log and exit edit mode
    console.log("Saving page", form);
    setIsEditing(false);
  }

  const availableProducts =
    selectMode === "all"
      ? sampleProducts
      : sampleProducts.filter((p) =>
          filterCategory === "All" ? true : p.category === filterCategory
        );

  return (
    <div className="w-full p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6 text-black/80">
        {/* Title bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="flex items-center gap-3 text-2xl font-bold text-slate-800">
              <LayoutGrid className="w-6 h-6 text-blue-600" />
              Website Builder — Page Editor
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Edit how this page will be generated on your site.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsEditing((s) => !s)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
                isEditing
                  ? "bg-slate-100 border-slate-300"
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }`}
            >
              {isEditing ? (
                <>
                  <Eye className="w-4 h-4" /> View
                </>
              ) : (
                <>
                  <Pencil className="w-4 h-4" /> Edit
                </>
              )}
            </button>

            <button
              onClick={() => setDialogOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" /> Manage Products
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left column */}
          <div className="space-y-5">
            {/* Basic card: ID and URL */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border shadow-sm">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-500 flex items-center gap-2">
                    <Link2 className="w-4 h-4" /> Page ID
                  </label>
                  <input
                    readOnly={!isEditing}
                    value={form.pageId}
                    onChange={(e) => updateField("pageId", e.target.value)}
                    className={`mt-2 w-full px-3 py-2 rounded-md border ${
                      isEditing ? "bg-white" : "bg-slate-100"
                    }`}
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-500 flex items-center gap-2">
                    <Link2 className="w-4 h-4" /> Page URL
                  </label>
                  <input
                    readOnly={!isEditing}
                    value={form.pageUrl}
                    onChange={(e) => updateField("pageUrl", e.target.value)}
                    className={`mt-2 w-full px-3 py-2 rounded-md border ${
                      isEditing ? "bg-white text-blue-600" : "bg-slate-100"
                    }`}
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="text-xs text-slate-500 flex items-center gap-2">
                  <Type className="w-4 h-4" /> Page Title
                </label>
                <input
                  readOnly={!isEditing}
                  value={form.pageTitle}
                  onChange={(e) => updateField("pageTitle", e.target.value)}
                  className={`mt-2 w-full px-3 py-2 rounded-md border ${
                    isEditing ? "bg-white" : "bg-slate-100"
                  }`}
                />
              </div>

              <div className="mt-4">
                <label className="text-xs text-slate-500 flex items-center gap-2">
                  <Package className="w-4 h-4" /> Description
                </label>
                <textarea
                  readOnly={!isEditing}
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  rows={3}
                  className={`mt-2 w-full px-3 py-2 rounded-md border resize-none ${
                    isEditing ? "bg-white" : "bg-slate-100"
                  }`}
                />
              </div>
            </div>

            {/* Categories card */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-semibold text-slate-800">Categories</h3>
                </div>
                <div className="text-xs text-slate-500">Choose or add</div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {["Smoothies", "Juice", "Whole Foods", "Groceries"].map(
                  (c) => (
                    <button
                      key={c}
                      onClick={() => toggleCategory(c)}
                      disabled={!isEditing}
                      className={`px-3 py-1 rounded-full text-sm border transition ${
                        form.categories.includes(c)
                          ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                          : "bg-white text-slate-600 border-gray-200"
                      }`}
                    >
                      {c}
                    </button>
                  )
                )}
                {form.categories
                  .filter(
                    (c) =>
                      ![
                        "Smoothies",
                        "Juice",
                        "Whole Foods",
                        "Groceries",
                      ].includes(c)
                  )
                  .map((c) => (
                    <div
                      key={c}
                      className="flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-emerald-50 border border-emerald-100"
                    >
                      <span className="text-emerald-700">{c}</span>
                      {isEditing && (
                        <button
                          onClick={() =>
                            updateField(
                              "categories",
                              form.categories.filter((x) => x !== c)
                            )
                          }
                          className="text-emerald-500"
                          title="remove"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
              </div>

              <div className="mt-3 flex gap-2">
                <input
                  readOnly={!isEditing}
                  value={form.newCategory}
                  onChange={(e) => updateField("newCategory", e.target.value)}
                  placeholder="Add custom category..."
                  className={`flex-1 px-3 py-2 rounded-md border ${
                    isEditing ? "bg-white" : "bg-slate-100"
                  }`}
                />
                <button
                  onClick={addCategory}
                  disabled={!isEditing}
                  className={`px-3 py-2 rounded-md ${
                    isEditing
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-5">
            {/* Page Type and List Styles */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Grid3X3 className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-semibold text-slate-800">Page Type</h3>
                </div>
                <div className="text-xs text-slate-500">Visual selector</div>
              </div>

              <div className="mt-3 flex gap-2 flex-wrap">
                {[
                  { id: "Products", icon: <Grid className="w-4 h-4" /> },
                  { id: "Menu", icon: <List className="w-4 h-4" /> },
                  { id: "Slideview", icon: <Rows3 className="w-4 h-4" /> },
                ].map((pt) => (
                  <button
                    key={pt.id}
                    disabled={!isEditing}
                    onClick={() => isEditing && updateField("pageType", pt.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm ${
                      form.pageType === pt.id
                        ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                        : "bg-white text-slate-700 border-gray-200"
                    }`}
                  >
                    {pt.icon}
                    {pt.id}
                  </button>
                ))}
              </div>

              {/* List style visuals */}
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-slate-600" />
                    <div className="text-sm font-medium text-slate-700">
                      List Styles
                    </div>
                  </div>
                  <div className="text-xs text-slate-500">pick multiple</div>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-3">
                  {[
                    {
                      id: "grid",
                      label: "Grid",
                      preview: <Grid3X3 className="w-6 h-6" />,
                    },
                    {
                      id: "list",
                      label: "List",
                      preview: <List className="w-6 h-6" />,
                    },
                    {
                      id: "menu",
                      label: "Menu",
                      preview: <Rows3 className="w-6 h-6" />,
                    },
                  ].map((s) => {
                    const active = form.listStyle.includes(s.id);
                    return (
                      <div
                        key={s.id}
                        onClick={() => toggleListStyle(s.id)}
                        className={`p-3 rounded-lg border cursor-pointer select-none transition flex flex-col items-start gap-2 ${
                          active
                            ? "bg-blue-50 border-blue-200"
                            : "bg-white border-gray-200"
                        } ${!isEditing ? "opacity-70 cursor-not-allowed" : ""}`}
                      >
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded bg-white/30">{s.preview}</div>
                          <div className="font-medium text-sm">{s.label}</div>
                        </div>
                        <div className="text-xs text-slate-500">
                          {s.id === "grid" && "Compact card grid preview"}
                          {s.id === "list" && "Dense vertical list preview"}
                          {s.id === "menu" && "Menu / grouped categories view"}
                        </div>

                        <div className="mt-2 flex items-center gap-2">
                          <button
                            onClick={() => setDefaultStyle(s.id)}
                            disabled={!isEditing || !active}
                            className={`text-xs px-2 py-1 rounded-full border ${
                              form.defaultListStyle === s.id
                                ? "bg-slate-700 text-white"
                                : "bg-white text-slate-600"
                            } ${!isEditing ? "opacity-60 cursor-not-allowed" : ""}`}
                          >
                            {form.defaultListStyle === s.id ? (
                              <>
                                <Check className="w-3 h-3 inline" /> Default
                              </>
                            ) : (
                              "Make default"
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Products preview card */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-pink-600" />
                  <h3 className="font-semibold text-slate-800">Products</h3>
                </div>
                <div className="text-xs text-slate-500">quick overview</div>
              </div>

              <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[180px] overflow-y-auto">
                {form.products.length ? (
                  form.products.map((pid) => {
                    const p = sampleProducts.find((x) => x.id === pid);
                    if (!p) return null;
                    return (
                      <div
                        key={pid}
                        className="px-3 py-2 border rounded-md bg-slate-50 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2 text-slate-700">
                          <Package className="w-4 h-4 text-slate-500" />
                          <span className="text-sm truncate">{p.name}</span>
                        </div>
                        {isEditing && (
                          <button
                            onClick={() =>
                              updateField(
                                "products",
                                form.products.filter((x) => x !== pid)
                              )
                            }
                            className="text-red-500"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-full text-center text-sm text-slate-400 italic">
                    No products assigned to this page.
                  </div>
                )}
              </div>

              {isEditing && (
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => {
                      setDialogOpen(true);
                      setDialogTab("select");
                    }}
                    className="px-4 py-2 rounded-md bg-blue-600 text-white"
                  >
                    Edit products
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-slate-500 flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Created: {form.createdAt}
          </div>

          <div className="flex items-center gap-3">
            {isEditing && (
              <button
                onClick={savePage}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg"
              >
                <Save className="w-4 h-4 inline mr-2" />
                Save changes
              </button>
            )}

            <button
              onClick={() => {
                // reset to initial on cancel during edit
                if (isEditing) {
                  setForm(initialForm);
                  setIsEditing(false);
                }
              }}
              className="px-3 py-2 rounded-md border"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Product Dialog */}
      {dialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setDialogOpen(false)}
          />

          <div className="relative max-w-4xl w-full bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Manage Products</h3>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex gap-2 border rounded-lg p-1">
                  <button
                    onClick={() => {
                      setDialogTab("select");
                    }}
                    className={`px-3 py-1 text-sm rounded ${
                      dialogTab === "select"
                        ? "bg-blue-600 text-white"
                        : "text-slate-600"
                    }`}
                  >
                    Select Products
                  </button>
                  <button
                    onClick={() => {
                      setDialogTab("current");
                    }}
                    className={`px-3 py-1 text-sm rounded ${
                      dialogTab === "current"
                        ? "bg-blue-600 text-white"
                        : "text-slate-600"
                    }`}
                  >
                    Current Products
                  </button>
                </div>

                <button
                  onClick={() => setDialogOpen(false)}
                  className="p-2 rounded hover:bg-gray-50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-4 max-h-[70vh] overflow-y-auto">
              {dialogTab === "select" && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <button
                      onClick={() => setSelectMode("all")}
                      className={`px-3 py-1 rounded-full text-sm border ${
                        selectMode === "all"
                          ? "bg-blue-600 text-white"
                          : "text-slate-600"
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setSelectMode("category")}
                      className={`px-3 py-1 rounded-full text-sm border ${
                        selectMode === "category"
                          ? "bg-blue-600 text-white"
                          : "text-slate-600"
                      }`}
                    >
                      By Category
                    </button>

                    {selectMode === "category" && (
                      <div className="ml-auto flex items-center gap-2">
                        <Filter className="w-4 h-4 text-slate-500" />
                        <select
                          value={filterCategory}
                          onChange={(e) => setFilterCategory(e.target.value)}
                          className="px-2 py-1 border rounded-md"
                        >
                          {categoriesList.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {availableProducts.map((p) => {
                      const selected = form.products.includes(p.id);
                      if (selectMode === "category" && filterCategory !== "All") {
                        if (p.category !== filterCategory) return null;
                      }
                      return (
                        <div
                          key={p.id}
                          onClick={() => toggleProductSelection(p.id)}
                          className={`p-3 rounded-lg border cursor-pointer transition ${
                            selected
                              ? "bg-blue-50 border-blue-300"
                              : "hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Package className="w-5 h-5 text-slate-600" />
                              <div>
                                <div className="font-medium text-slate-800">
                                  {p.name}
                                </div>
                                <div className="text-xs text-slate-500">
                                  {p.category}
                                </div>
                              </div>
                            </div>
                            {selected && (
                              <div className="text-blue-600">
                                <Check className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {dialogTab === "current" && (
                <div className="space-y-3">
                  {form.products.length ? (
                    form.products.map((pid) => {
                      const p = sampleProducts.find((x) => x.id === pid);
                      if (!p) return null;
                      return (
                        <div
                          key={pid}
                          className="flex items-center justify-between border rounded-lg px-3 py-2"
                        >
                          <div className="flex items-center gap-3">
                            <Package className="w-5 h-5 text-slate-600" />
                            <div>
                              <div className="font-medium text-slate-800">
                                {p.name}
                              </div>
                              <div className="text-xs text-slate-500">
                                {p.category}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateField(
                                  "products",
                                  form.products.filter((x) => x !== pid)
                                )
                              }
                              className="text-red-500 px-2 py-1 rounded hover:bg-red-50"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center text-slate-400 italic">
                      No products assigned yet.
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 p-4 border-t">
              <button
                onClick={() => setDialogOpen(false)}
                className="px-4 py-2 rounded-md border"
              >
                Close
              </button>
              <button
                onClick={() => setDialogOpen(false)}
                className="px-4 py-2 rounded-md bg-blue-600 text-white"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
