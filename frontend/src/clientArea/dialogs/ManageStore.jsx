/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  Store,
  Upload,
  X,
  Edit3,
  Save,
  Building2,
  Type,
  FileText,
  Layers,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ManageStoreDialog = ({
  open,
  onClose,
  store = {},
  onSave,
  existingIds = [],
}) => {
  const [isEditMode, setIsEditMode] = useState(!store?.storeId); // new store starts editable
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(store.logo || null);
  const [formData, setFormData] = useState({
    storeId: store.storeId || "",
    name: store.name || "",
    description: store.description || "",
    segment: store.segment || "",
    logo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, logo: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));

      if (name === "storeId" && existingIds.includes(value.trim())) {
        setError("This store ID already exists. Please choose another.");
      } else {
        setError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) return;
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(
      ([k, v]) => v && formDataToSend.append(k, v)
    );

    onSave?.(formDataToSend);
    setIsEditMode(false);
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ type: "spring", stiffness: 140, damping: 18 }}
          className="relative w-full max-w-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 dark:border-zinc-700 overflow-hidden text-black dark:text-white"
        >
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-zinc-800">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Store className="w-5 h-5 text-indigo-500" />
              {store?.storeId ? "Manage Store" : "Create New Store"}
            </h2>
            <div className="flex items-center gap-2">
              {store?.storeId && (
                <button
                  onClick={() => setIsEditMode(!isEditMode)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                    isEditMode
                      ? "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300"
                      : "bg-indigo-500/20 text-indigo-700 dark:text-indigo-300"
                  } hover:bg-opacity-30 transition`}
                >
                  {isEditMode ? "Editing..." : "Edit"}
                </button>
              )}
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
            {/* Store ID */}
            <InputField
              icon={<Building2 className="w-4 h-4" />}
              label="Store ID"
              name="storeId"
              value={formData.storeId}
              onChange={handleChange}
              disabled={!isEditMode}
              placeholder="e.g. store_001"
              error={error}
            />

            {/* Store Name */}
            <InputField
              icon={<Type className="w-4 h-4" />}
              label="Store Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditMode}
              placeholder="e.g. Luna Cafe"
            />

            {/* Store Description */}
            <TextAreaField
              icon={<FileText className="w-4 h-4" />}
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              disabled={!isEditMode}
              placeholder="Write something about your store..."
            />

            {/* Segment (selectable + input) */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                Segment
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">
                  <Layers className="w-4 h-4" />
                </span>
                <input
                  list="segment-options"
                  name="segment"
                  value={formData.segment}
                  onChange={handleChange}
                  placeholder="e.g. Restaurant, Lounge, Boutique..."
                  disabled={!isEditMode}
                  className="w-full pl-10 pr-4 py-2 border rounded-xl bg-white/70 dark:bg-zinc-800/60 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
                />
                <datalist id="segment-options">
                  <option value="Restaurant" />
                  <option value="Lounge" />
                  <option value="Supermarket" />
                  <option value="Art Gallery" />
                  <option value="Boutique" />
                </datalist>
              </div>
            </div>

            {/* Store Logo */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Store Logo (375x300 recommended)
              </label>
              <label
                className={`flex items-center justify-center border-2 border-dashed rounded-xl p-4 cursor-pointer transition ${
                  isEditMode
                    ? "hover:bg-indigo-50 dark:hover:bg-zinc-800 border-indigo-400/50"
                    : "opacity-60 cursor-not-allowed"
                }`}
              >
                <input
                  type="file"
                  name="logo"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                  disabled={!isEditMode}
                />
                {preview ? (
                  <img
                    src={preview}
                    alt="Store Logo"
                    className="w-[375px] h-[300px] object-cover rounded-xl shadow-md border border-white/30"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-500">
                    <Upload className="w-6 h-6 mb-1" />
                    <span className="text-sm">Upload Logo</span>
                  </div>
                )}
              </label>
            </div>

            {/* Save Button */}
            {isEditMode && (
              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2 transition"
              >
                <Save className="w-5 h-5" />
                Save Store Details
              </motion.button>
            )}
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* 🔹 Reusable Input Components */
const InputField = ({ icon, label, error, ...props }) => (
  <div>
    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
      {label}
    </label>
    <div className="relative">
      <span className="absolute left-3 top-2.5 text-gray-500">{icon}</span>
      <input
        {...props}
        className={`w-full pl-10 pr-4 py-2 border rounded-xl bg-white/70 dark:bg-zinc-800/60 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60 ${
          error ? "border-red-500 focus:ring-red-500" : ""
        }`}
      />
    </div>
    {error && (
      <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
        <AlertCircle className="w-4 h-4" /> {error}
      </div>
    )}
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
        className="w-full pl-10 pr-4 py-2 border rounded-xl bg-white/70 dark:bg-zinc-800/60 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none disabled:opacity-60"
      />
    </div>
  </div>
);

export default ManageStoreDialog;
