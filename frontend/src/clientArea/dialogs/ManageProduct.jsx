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
  AlertCircle,
  RadarIcon,
  Loader,
  Trash,
} from "lucide-react";
import {
  create_product,
  delete_product,
  update_product,
} from "../../helpers/serverHelpers";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  sanitizeProductId,
  sanitizeString,
  validateString,
} from "../../utils/stringSanitizers";

import {
  useClientProductStore,
  useClientStore,
} from "../../store/useClientStore";
import { generateProductId } from "../../utils/generators";
import { notify } from "../../store/useNotificationStore";
import { useGeneralStore } from "../../store/useGeneralStore";
import { useUserStore } from "../userArea/hooks/useUserStore";

const ManageProductDialog = ({
  open,
  onClose,
  product = {},
  storeId,
  category,
}) => {
  const { updateUser } = useUserStore();
  const { existingIds, categories, updateProduct } = useClientProductStore();

  const [isEditMode, setIsEditMode] = useState(false);
  const [idError, setIdError] = useState("");
  const [nameError, setNameError] = useState("");

  const [preview, setPreview] = useState(product?.image || null);
  const [formData, setFormData] = useState({
    productId: product?.productId || "",
    name: product?.name || "",
    price: product?.price || "",
    category: product?.category || category || "",
    description: product?.description || "",
    image: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    } else if (name === "productId") {
      const id = sanitizeProductId(value);
      setFormData((prev) => ({ ...prev, productId: id }));
    } else {
      const limit =
        name === "description"
          ? 300
          : name === "name"
          ? 80
          : name === "price"
          ? 9
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
    Object.entries(formData).forEach(([key, value]) => {
      if (value) formDataToSend.append(key, value);
    });

    const isCreate = !product?.productId;
    setIsLoading(true);
    const res = await onSave(storeId, formDataToSend, formData, isCreate);
    setIsLoading(false);

    if (res) {
      setIsEditMode(false);
      onClose?.();
    }
  };

  // create/update store
  const onSave = async (storeId, dataToSend, rawData, isCreate) => {
    let cat;
    if (isCreate) {
      cat = await create_product(storeId, dataToSend);
    } else {
      cat = await update_product(storeId, dataToSend);
    }

    if (!cat.success) toast.error(cat.message || "Error", { id: "error1" });
    else {
      notify({
        title: isCreate ? "Product Created" : "Product Updated",
        message: `Your product with ID ${
          cat?.product?.productId
        } was successfully ${isCreate ? "created" : "updated"}!`,
        type: "success",
        duration: 3000,
      });
      updateProduct(cat.product);
      if (cat.user) {
        updateUser(cat.user);
      }
    }
    return cat.success;
  };

  const clearErrors = () => {
    setNameError("");
    setIdError("");
  };

  // check all errors
  const checkErrors = () => {
    if (!formData.name.trim()) {
      setNameError("Product name cannot be empty");
      return { error: "Invalid product name", success: false };
    }

    if (formData.name.trim().length < 3) {
      setNameError("Product name too short");
      return { error: "Invalid product name", success: false };
    }

    if (!formData.productId.trim() || !validateString(formData.productId)) {
      setIdError("Invalid product ID");
      return { error: "Invalid product ID", success: false };
    }

    if (
      existingIds.includes(formData.productId.trim()) &&
      product?.productId !== formData.productId.trim()
    ) {
      setIdError("This product ID is not available. Please choose another.");
      return { error: "Product ID not available", success: false };
    }

    return { success: true };
  };

  const generateId = () => {
    if (!isEditMode || product?.productId || isLoading) return;
    const id = generateProductId();
    setFormData((prev) => ({ ...prev, productId: id }));
  };

  // Id error
  useEffect(() => {
    if (!formData.productId.trim() || !validateString(formData.productId)) {
      return setIdError("Invalid product ID");
    }

    if (
      existingIds.includes(formData.productId.trim()) &&
      product?.productId !== formData.productId.trim()
    ) {
      setIdError("This product ID is not available. Please choose another.");
    } else setIdError("");
  }, [existingIds, formData.productId, product?.productId]);

  // name errors
  useEffect(() => {
    if (!formData.name.trim()) {
      return setNameError("Store name cannot be empty");
    }

    if (!formData.name.trim() || formData.name.trim().length < 3) {
      return setNameError("Store name too short");
    }

    setNameError("");
  }, [formData.name]);

  const resetVars = () => {
    clearErrors();
    setFormData({
      productId: product?.productId || "",
      name: product?.name || "",
      price: product?.price || "",
      category: product?.category || category || "",
      description: product?.description || "",
      image: null,
    });
    setPreview(null);
  };

  useEffect(() => {
    const startEdit = !product?.productId;
    setIsEditMode(startEdit);
    resetVars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (open) {
      // lock body scroll
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => (document.body.style.overflow = "");
  }, [open]);

  if (!open || !storeId) return null;

  const get_category = (category) => {
    return (
      categories.find(
        (c) => c.replaceAll(" ", "_").toLowerCase() == category
      ) || ""
    );
  };

  const cat = get_category(formData.category);

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
          <div className="flex justify-between items-center px-3 xs:px-6 py-4 border-b border-gray-200 dark:border-zinc-700">
            <h2 className="text-lg xs:text-xl font-semibold flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-blue-500" />
              {product?.productId ? "Manage Product" : "Add Product"}
            </h2>
            <div className="flex items-center gap-1 xs:gap-2">
              {product?.productId && (
                <button
                  onClick={() => {
                    resetVars();
                    setIsEditMode(!isEditMode);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                    isEditMode
                      ? "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300"
                      : "bg-blue-500/20 text-blue-700 dark:text-blue-300"
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
            className="p-3 xs:p-6 grid gap-5 overflow-y-auto max-h-[75vh]"
          >
            {/* Product ID */}
            <div className="w-full flex items-center gap-3">
              <div className="w-full">
                <InputField
                  icon={<Tag className="w-4 h-4" />}
                  label="Product ID"
                  name="productId"
                  value={formData.productId}
                  onChange={handleChange}
                  disabled={!isEditMode || product?.productId || isLoading}
                  placeholder="e.g. P001"
                  error={idError}
                />
              </div>
              <div
                onClick={generateId}
                className={`border rounded size-9 shadow-sm flex items-center justify-center ${
                  !idError ? "mt-7" : "mt-1"
                }`}
              >
                <RadarIcon className="size-5" />
              </div>
            </div>

            {/* Product Name */}
            <InputField
              icon={<Type className="w-4 h-4" />}
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditMode || isLoading}
              placeholder="e.g. Classic Burger"
              error={nameError}
            />

            {/* Price & Category */}
            <div className="grid grid-cols-2 gap-2 xs:gap-4">
              <div className="flex-1">
                <InputField
                  icon={<DollarSign className="w-4 h-4" />}
                  label="Price ($)"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  disabled={!isEditMode || isLoading}
                  placeholder="e.g. 12.99"
                  type="number"
                />
              </div>
              <div className="flex-2">
                <SelectField
                  icon={<Layers className="w-4 h-4" />}
                  label="Category"
                  name="category"
                  value={cat || formData.category || "all"}
                  onChange={handleChange}
                  disabled={!isEditMode || isLoading}
                >
                  <option key="all" value={"all"}>
                    All
                  </option>
                  {categories.map((category, i) => (
                    <option key={i} value={category}>
                      {category}
                    </option>
                  ))}
                </SelectField>
              </div>
            </div>

            {/* Description */}
            <TextAreaField
              icon={<AlignLeft className="w-4 h-4" />}
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              disabled={!isEditMode || isLoading}
              placeholder="Write something about your product?..."
            />

            {/* Image */}
            <ImageArea
              preview={preview}
              product={product}
              formData={formData}
              isEditMode={isEditMode}
              setFormData={setFormData}
              setPreview={setPreview}
              isLoading={isLoading}
            />

            {/* Action Button */}
            {isEditMode && (
              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="mt-4 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2 transition"
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
                    Save Changes
                  </div>
                )}
              </motion.button>
            )}

            {/* Delete button */}
            {!isEditMode && product?.productId && (
              <DeleteProductArea
                product={product}
                storeId={storeId}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                onClose={onClose}
              />
            )}
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const DeleteProductArea = ({
  product,
  storeId,
  isLoading,
  setIsLoading,
  onClose,
}) => {
  const { updateUser } = useUserStore();
  const { setConfirmDetails } = useGeneralStore();
  const { deleteProduct } = useClientProductStore();

  const openConfirmDialog = () => {
    const conf = {
      onConfirm: handleDelete,
      title: "Delete Product",
      description:
        "You are about to delete this product?. This process is irreversible.",
      icon: "warning",
      confirmText: "Delete",
      cancelText: "Cancel",
    };

    setConfirmDetails(conf);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    const res = await delete_product(storeId, product?.productId);
    setIsLoading(false);

    const { success, message } = res;
    if (success == true) {
      notify({
        title: "Product Deleted",
        message: message,
        type: "success",
        duration: 4000,
      });
      deleteProduct(product?.productId);
      if (res.user) updateUser(res.user);
      onClose?.();
    } else {
      notify({
        title: "Error deleting",
        message: message,
        type: "error",
        duration: 4000,
      });
    }
  };

  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      onClick={openConfirmDialog}
      disabled={isLoading}
      className="mt-4 w-fit ml-auto pl-10 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white py-3 px-4 rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2 transition"
    >
      {(isLoading && (
        <div className="flex items-center justify-center gap-2">
          <div className="animate-spin">
            <Loader className="size-5" />
          </div>
          Deleting...
        </div>
      )) || (
        <div className="flex items-center justify-center gap-2">
          <Trash className="w-5 h-5" />
          Delete product
        </div>
      )}
    </motion.div>
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
        className={`w-full pl-10 pr-4 py-2 border rounded-xl bg-white/70 dark:bg-zinc-800/60 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60 $ || isLoading{
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

const SelectField = ({ icon, label, children, ...props }) => (
  <div className="w-ful relative">
    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
      {label}
    </label>
    <div className="relative">
      <span className="absolute left-3 top-3.5 text-gray-500">{icon}</span>
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
      <span className="absolute left-3 top-3.5 text-gray-500">{icon}</span>
      <textarea
        {...props}
        rows="3"
        className="w-full pl-10 pr-4 py-2 border rounded-xl bg-white/70 dark:bg-zinc-800/60 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none disabled:opacity-60 || isLoading"
      />
    </div>
  </div>
);

const ImageArea = ({
  preview,
  product,
  formData,
  isEditMode,
  setFormData,
  setPreview,
  isLoading,
}) => {
  return (
    <div>
      <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
        Product Image
      </label>

      <div className="flex gap-4 flex-wrap">
        {/* Old image */}
        {product?.image && !formData.deleteImage && (
          <div className="relative w-28 h-28">
            <img
              src={product.image}
              alt="Old"
              className="w-28 h-28 object-cover rounded-xl shadow-md"
            />
            {isEditMode && (
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, deleteImage: true }))
                }
                className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md"
              >
                ✕
              </button>
            )}
            <div className="text-xs text-gray-500 mt-1 text-center">
              Current Image
            </div>
          </div>
        )}

        {/* New image selector */}
        <label
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-4 cursor-pointer transition ${
            isEditMode
              ? "hover:bg-blue-50 dark:hover:bg-zinc-800 border-blue-400/50"
              : "opacity-60 cursor-not-allowed"
          } w-28 h-28`}
        >
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;
              setFormData((prev) => ({
                ...prev,
                image: file,
                deleteImage: false,
              }));
              setPreview(URL.createObjectURL(file));
            }}
            className="hidden"
            disabled={!isEditMode || isLoading}
          />

          {preview ? (
            <div className="relative w-28 h-28">
              <img
                src={preview}
                alt="Preview"
                className="w-28 h-28 object-cover rounded-xl shadow-md"
              />
              <div className="text-xs text-gray-500 mt-1 text-center">
                New Image
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-gray-500">
              <Upload className="w-6 h-6 mb-1" />
              <span className="text-sm">Upload Image</span>
            </div>
          )}
        </label>
      </div>
    </div>
  );
};

export default ManageProductDialog;
