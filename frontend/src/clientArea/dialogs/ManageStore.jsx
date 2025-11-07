/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  Store,
  Upload,
  X,
  Save,
  Building2,
  Type,
  FileText,
  Layers,
  AlertCircle,
  Info,
  Loader,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  sanitizeStoreId,
  sanitizeString,
  validateString,
} from "../../utils/stringSanitizers";
import { useClientStore } from "../../store/useClientStore";

const ManageStoreDialog = ({
  open,
  onClose,
  store = {},
  onSave,
  // existingIds = [],
}) => {
  const { fetchStoreIds, existingIds } = useClientStore();
  const [isEditMode, setIsEditMode] = useState(true); // new store starts editable
  const [idError, setIdError] = useState("");
  const [nameError, setNameError] = useState("");

  const [preview, setPreview] = useState(store?.logo || null);
  const [formData, setFormData] = useState({
    storeId: store?.storeId || "",
    storeName: store?.storeName || "",
    shortInfo: store?.shortInfo || "",
    segment: store?.segment || "",
    slogan: store?.slogan || "",
    logo: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, logo: file }));
      setPreview(URL.createObjectURL(file));
    } else if (name === "storeId") {
      const id = sanitizeStoreId(value);
      setFormData((prev) => ({ ...prev, storeId: id }));
    } else {
      const limit =
        name === "shortInfo"
          ? 150
          : name === "storeName"
          ? 50
          : name === "segment"
          ? 20
          : 40;
      const word = sanitizeString(value, limit);
      setFormData((prev) => ({ ...prev, [name]: word }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, error } = checkErrors();
    if (!success) {
      return toast.error(error, { id: "error1" });
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(
      ([k, v]) => formDataToSend.append(k, v)
    );

    const isCreate = !store?.storeId;
    setIsLoading(true);
    const res = await onSave?.(formDataToSend, formData, isCreate);
    setIsLoading(false);
    if (res) onClose?.();
  };

  const clearErrors = () => {
    setIdError("");
    setNameError("");
  };

  // check all errors
  const checkErrors = () => {
    if (!formData.storeName.trim()) {
      setNameError("Store name cannot be empty");
      return { error: "Invalid store name", success: false };
    }

    if (formData.storeName.trim().length < 4) {
      setNameError("Store name too short");
      return { error: "Invalid store name", success: false };
    }

    if (!formData.storeId.trim() || !validateString(formData.storeId)) {
      setIdError("Invalid store ID");
      return { error: "Invalid store ID", success: false };
    }

    if (
      existingIds.includes(formData.storeId.trim()) &&
      store?.storeId !== formData.storeId.trim()
    ) {
      setIdError("This store ID already exists. Please choose another.");
      return { error: "Store ID already exists", success: false };
    }

    return { success: true };
  };

  useEffect(() => {
    fetchStoreIds();
  }, [fetchStoreIds]);

  // Id error
  useEffect(() => {
    if (!formData.storeId.trim() || !validateString(formData.storeId)) {
      return setIdError("Invalid store ID");
    }

    if (
      existingIds.includes(formData.storeId.trim()) &&
      store?.storeId !== formData.storeId.trim()
    ) {
      setIdError("This store ID already exists. Please choose another.");
    } else setIdError("");
  }, [existingIds, formData.storeId, store?.storeId]);

  // name errors
  useEffect(() => {
    if (!formData.storeName.trim()) {
      return setNameError("Store name cannot be empty");
    }

    if (!formData.storeName.trim() || formData.storeName.trim().length < 4) {
      return setNameError("Store name too short");
    } setNameError("");

    if (!store?.storeId) {
      const raw_id = formData.storeName
        .toLowerCase()
        .replaceAll(" ", "-")
        .trim();
      const id = sanitizeStoreId(raw_id);
      setFormData((prev) => ({ ...prev, storeId: id }));
    }
  }, [formData.storeName, store?.storeId]);

  useEffect(() => {
    const startEdit = true;
    setIsEditMode(startEdit);
    clearErrors();
    setFormData({
      storeId: store?.storeId || "",
      storeName: store?.storeName || "",
      shortInfo: store?.shortInfo || "",
      segment: store?.segment || "",
      slogan: store?.slogan || "",
      logo: null,
    });
  }, [open, store]);

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
                  // onClick={() => setIsEditMode(!isEditMode)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                    isEditMode
                      ? "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300"
                      : "bg-indigo-500/20 text-indigo-700 dark:text-indigo-300"
                  } hover:bg-opacity-30 transition hidden xs:flex`}
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
            className="p-3 xs:p-6 pb-6 grid grid-cols-1 gap-5 overflow-y-auto max-h-[75vh]"
          >
            {/* store id &  name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Store Name */}
              <div className={`${store?.storeId ? "order-1" : ""}`}>
                <InputField
                  icon={<Type className="w-4 h-4" />}
                  label="Store Name"
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleChange}
                  disabled={!isEditMode || isLoading}
                  placeholder="e.g. Luna Cafe"
                  error={nameError}
                />
              </div>

              {/* Store ID */}

              <InputField
                icon={<Building2 className="w-4 h-4" />}
                label="Store ID"
                name="storeId"
                value={formData.storeId}
                onChange={handleChange}
                disabled={!isEditMode || store?.storeId || isLoading}
                placeholder="e.g. store_001"
                error={idError}
              />
            </div>

            {/* slogan & segment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Store Slogan */}
              <InputField
                icon={<Info className="w-4 h-4" />}
                label="Slogan"
                name="slogan"
                value={formData.slogan}
                onChange={handleChange}
                disabled={!isEditMode || isLoading}
                placeholder="e.g. Great taste good health"
              />

              {/* Segment (selectable + input) */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                  Segment
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3.5 text-gray-500">
                    <Layers className="w-4 h-4" />
                  </span>
                  <input
                    list="segment-options"
                    name="segment"
                    value={formData.segment}
                    onChange={handleChange}
                    placeholder="e.g. Restaurant, Lounge, Boutique..."
                    disabled={!isEditMode || isLoading}
                    className="w-full pl-10 pr-4 py-2 border rounded-xl bg-white/70 dark:bg-zinc-800/60 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
                  />
                  <datalist id="segment-options">
                    <option value="Fruit Drink" />
                    <option value="Restaurant" />
                    <option value="Lounge" />
                    <option value="Supermarket" />
                    <option value="Art Gallery" />
                    <option value="Boutique" />
                  </datalist>
                </div>
              </div>
            </div>

            {/* Store Description */}
            <TextAreaField
              icon={<FileText className="w-4 h-4" />}
              label="Description"
              name="shortInfo"
              value={formData.shortInfo}
              onChange={handleChange}
              disabled={!isEditMode || isLoading}
              placeholder="Write something about your store..."
            />

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
                  disabled={!isEditMode || isLoading}
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
                disabled={isLoading}
                className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold shadow-lg transition"
              >
                {(isLoading && (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin">
                      <Loader className="size-5" />
                    </div>
                    Saving...
                  </div>
                )) || (
                  <div className="flex items-center justify-center gap-2">
                    <Save className="w-5 h-5" />
                    Save Store Details
                  </div>
                )}
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
      <span className="absolute left-3 top-3.5 text-gray-500">{icon}</span>
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
      <span className="absolute left-3 top-3.5 text-gray-500">{icon}</span>
      <textarea
        {...props}
        rows="3"
        className="w-full pl-10 pr-4 py-2 border rounded-xl bg-white/70 dark:bg-zinc-800/60 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none disabled:opacity-60"
      />
    </div>
  </div>
);

export default ManageStoreDialog;
