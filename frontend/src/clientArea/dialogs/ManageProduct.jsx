/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  X,
  Upload,
  Edit3,
  Save,
  Image as ImageIcon,
  Tag,
  DollarSign,
  Layers,
  Type,
  AlignLeft,
} from "lucide-react";
import { update_product } from "../../helpers/serverHelpers";
import { motion, AnimatePresence } from "framer-motion";

const ManageProductDialog = ({ open, onClose, product = {}, storeId }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [preview, setPreview] = useState(product.image || null);
  const [formData, setFormData] = useState({
    productId: product.productId || "",
    name: product.name || "",
    price: product.price || "",
    category: product.category || "",
    description: product.description || "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form_data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) form_data.append(key, value);
    });
    const res = await update_product(storeId, form_data);
    console.log(res);
    setIsEditMode(false);
  };

  useEffect(() => {
    if (open) {
      // lock body scroll
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => (document.body.style.overflow = "");
  }, [open]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
          className="w-full max-w-2xl bg-white/80 dark:bg-zinc-900/80 border border-white/30 dark:border-zinc-700 rounded-2xl shadow-2xl overflow-hidden text-black dark:text-white"
        >
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-zinc-700">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-blue-500" />
              Manage Product
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditMode(!isEditMode)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  isEditMode
                    ? "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300"
                    : "bg-blue-500/20 text-blue-700 dark:text-blue-300"
                } hover:bg-opacity-30 transition`}
              >
                {isEditMode ? "Editing..." : "Edit"}
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body */}
          <form
            onSubmit={handleSubmit}
            className="p-6 grid gap-5 overflow-y-auto max-h-[75vh]"
          >
            {/* Product ID */}
            <InputField
              icon={<Tag className="w-4 h-4" />}
              label="Product ID"
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              disabled={!isEditMode}
              placeholder="e.g. P001"
            />

            {/* Product Name */}
            <InputField
              icon={<Type className="w-4 h-4" />}
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditMode}
              placeholder="e.g. Classic Burger"
            />

            {/* Price & Category */}
            <div className="grid grid-cols-2 gap-4">
              <InputField
                icon={<DollarSign className="w-4 h-4" />}
                label="Price ($)"
                name="price"
                value={formData.price}
                onChange={handleChange}
                disabled={!isEditMode}
                placeholder="e.g. 12.99"
                type="number"
              />
              <SelectField
                icon={<Layers className="w-4 h-4" />}
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={!isEditMode}
              >
                <option>All</option>
                <option>Juice</option>
                <option>Smoothies</option>
                <option>Burger</option>
              </SelectField>
            </div>

            {/* Description */}
            <TextAreaField
              icon={<AlignLeft className="w-4 h-4" />}
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              disabled={!isEditMode}
              placeholder="Write something about your product..."
            />

            {/* Image */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Product Image
              </label>
              <label
                className={`flex items-center justify-center border-2 border-dashed rounded-xl p-4 cursor-pointer transition ${
                  isEditMode
                    ? "hover:bg-blue-50 dark:hover:bg-zinc-800 border-blue-400/50"
                    : "opacity-60 cursor-not-allowed"
                }`}
              >
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                  disabled={!isEditMode}
                />
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-28 h-28 object-cover rounded-xl shadow-md"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-500">
                    <Upload className="w-6 h-6 mb-1" />
                    <span className="text-sm">Upload Image</span>
                  </div>
                )}
              </label>
            </div>

            {/* Action Button */}
            {isEditMode && (
              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="mt-4 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2 transition"
              >
                <Save className="w-5 h-5" />
                Save Changes
              </motion.button>
            )}
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* 🔹 Reusable Input Components */
const InputField = ({ icon, label, ...props }) => (
  <div>
    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
      {label}
    </label>
    <div className="relative">
      <span className="absolute left-3 top-2.5 text-gray-500">{icon}</span>
      <input
        {...props}
        className="w-full pl-10 pr-4 py-2 border rounded-xl bg-white/70 dark:bg-zinc-800/60 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
      />
    </div>
  </div>
);

const SelectField = ({ icon, label, children, ...props }) => (
  <div>
    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
      {label}
    </label>
    <div className="relative">
      <span className="absolute left-3 top-2.5 text-gray-500">{icon}</span>
      <select
        {...props}
        className="w-full pl-10 pr-4 py-2 border rounded-xl bg-white/70 dark:bg-zinc-800/60 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
      >
        {children}
      </select>
    </div>
  </div>
);

const TextAreaField = ({ icon, label, ...props }) => (
  <div>
    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
      {label}
    </label>
    <div className="relative">
      <span className="absolute left-3 top-2.5 text-gray-500">{icon}</span>
      <textarea
        {...props}
        rows="3"
        className="w-full pl-10 pr-4 py-2 border rounded-xl bg-white/70 dark:bg-zinc-800/60 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none disabled:opacity-60"
      />
    </div>
  </div>
);

export default ManageProductDialog;
