import { useState } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
import { create_product, update_product } from "../helpers/serverHelpers";
import { useParams } from "react-router-dom";

const CreateProductPage = () => {
  const { storeId } = useParams();
  const [formData, setFormData] = useState({
    productId: "",
    name: "",
    price: "",
    category: "",
    description: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product created:", formData);
    // create_product(storeId, { productDetails: formData });
    update_product(storeId, { productDetails: formData });
    alert("✅ Product submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-xl p-8 w-full max-w-lg space-y-6 text-black dark:text-white"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          🛍️ Create New Product
        </h2>

        {/* Product ID */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Product ID
          </label>
          <input
            type="text"
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. P001"
            required
          />
        </div>

        {/* Product Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Classic Burger"
            required
          />
        </div>

        {/* Price & Category */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Price ($)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 12.99"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Category
            </label>
            <select
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Food, Drink, Art"
              required
            >
              <option>All</option>
              <option>Juice</option>
              <option>Smoothies</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Write something about your product..."
            
          />
        </div>

        {/* Image Selector */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Product Image
          </label>
          <div className="flex items-center gap-4">
            <label className="flex items-center justify-center w-full border-2 border-dashed rounded-xl cursor-pointer hover:bg-blue-50 transition p-4">
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleChange}
                className="hidden"
              />
              <div className="flex flex-col items-center text-gray-500">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-lg shadow-md"
                  />
                ) : (
                  <>
                    <Upload className="w-6 h-6 mb-1" />
                    <span className="text-sm">Upload Image</span>
                  </>
                )}
              </div>
            </label>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <ImageIcon className="w-5 h-5" />
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProductPage;
