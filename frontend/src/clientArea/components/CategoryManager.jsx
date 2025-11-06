/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Hash, X, Trash2, ShoppingBag } from "lucide-react";
import AddCategoryDialog from "./AddCategoryDialog";
import { iconsList } from "../../utils/globarvariables";

// 🪄 Full List Dialog Component
const CategoryListDialog = ({ open, onClose, categories, onAdd, onDelete }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4">
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl w-full max-w-5xl rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl py-6 px-3 xs:px-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <Hash className="w-5 h-5 text-blue-500" />
            All Categories
          </h2>

          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Add Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={onAdd}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-xl shadow-md transition"
          >
            <PlusCircle className="w-4 h-4" />
            Add Category
          </button>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 xs:gap-4 max-h-[70vh] overflow-x-auto pr-2">
          {categories.map((cat, i) => (
            <CategoryTile
              key={i}
              cat={cat}
              onDelete={() => onDelete(cat.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const CategoryManager = () => {
  const [categories, setCategories] = useState([
    { name: "Smoothies", desc: "Blended fruit goodness", iconId: 1 },
    { name: "Juices", desc: "Fresh fruit extractions", iconId: 1 },
    { name: "Whole Foods", desc: "Organic healthy options", iconId: 1 },
    { name: "Bakery", desc: "Bread & pastries", iconId: 1 },
    { name: "Desserts", desc: "Sweet treats & ice cream", iconId: 1 },
    { name: "Drinks", desc: "Cold & warm beverages", iconId: 1 },
    { name: "Snacks", desc: "Quick tasty bites", iconId: 1 },
    { name: "Salads", desc: "Fresh green options", iconId: 1 },
    { name: "Specials", desc: "Seasonal & chef’s picks", iconId: 1 },
  ]);

  const [openAdd, setOpenAdd] = useState(false);
  const [openList, setOpenList] = useState(false);

  const handleSave = (newCat) => {
    if (!newCat) return;
    setCategories((prev) => [...prev, newCat]);
  };

  const handleDelete = (name) => {
    setCategories((prev) => prev.filter((cat) => cat.name !== name));
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col xs:flex-row items-center justify-between mb-3 gap-2">
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <Hash className="w-5 h-5 text-blue-500" />
            Categories
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Organize your store products into visual categories for easy
            management and better customer experience.
          </p>
        </div>

        <button
          onClick={() => setOpenAdd(true)}
          className="flex min-w-fit items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-xl shadow-md transition"
        >
          <PlusCircle className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Categories Grid (show max 8) */}
      <div className="rounded-2xl bg-white/80 dark:bg-gray-900/70 backdrop-blur-md px-3 xs:px-5 py-5 border border-gray-200 dark:border-gray-700 shadow-sm w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 xs:gap-4 w-full">
          {categories.slice(0, 8).map((cat, i) => (
            <CategoryTile
              key={i}
              cat={cat}
              onDelete={() => handleDelete(cat.name)}
            />
          ))}
        </div>

        {/* View More Button */}
        {categories.length > 8 && (
          <div className="text-right mt-4">
            <button
              onClick={() => setOpenList(true)}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm underline transition"
            >
              View all categories →
            </button>
          </div>
        )}
      </div>

      {/* Dialogs */}
      <AddCategoryDialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSave={handleSave}
      />
      <CategoryListDialog
        open={openList}
        onClose={() => setOpenList(false)}
        categories={categories}
        onAdd={() => {
          setOpenList(false);
          setOpenAdd(true);
        }}
        onDelete={handleDelete}
      />
    </div>
  );
};

const CategoryTile = ({ cat, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative group h-[90px] bg-gradient-to-br from-blue-50/50 to-white dark:from-gray-800 dark:to-gray-900 border border-blue-100 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-lg hover:border-blue-400 transition-all duration-200 p-3 flex flex-col justify-center"
    >
      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm">
        {iconsList.find((c) => c.id === cat.iconId)?.icon || <ShoppingBag />}
        {cat.name}
      </div>
      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 truncate">
        {cat.desc}
      </p>

      {/* Delete Icon */}
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/40"
        title="Delete category"
      >
        <Trash2 className="w-4 h-4 text-red-500" />
      </button>
    </motion.div>
  );
};

export default CategoryManager;
