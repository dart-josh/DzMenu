import React, { useState } from "react";
import {
  Eye,
  Edit3,
  Trash2,
  Settings,
  Globe,
  Shuffle,
  List,
  Tag,
  Star,
  Calendar,
  Link2,
  FileText,
  Type,
} from "lucide-react";

const ManagePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    pageId: "12345",
    pageUrl: "/menu",
    pageTitle: "Menu Page",
    pageType: "Products",
    description: "This page displays all available menu items.",
    listStyle: "icons",
    categories: "horizontal",
    products: 8,
    shuffle: false,
    externalPages: [],
    visibility: "public",
    isDefault: true,
    createdAt: "2025-11-03",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full pb-10 pt-5">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 dark:border-gray-800 shadow-lg rounded-2xl p-6 mt-10 border border-gray-200 transition-colors duration-300">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <Settings className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            Manage Page
          </h1>

          <div className="flex gap-3">
            <a
              href={formData.pageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
            >
              <Eye className="w-4 h-4" /> Preview Page
            </a>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-xl transition"
            >
              <Edit3 className="w-4 h-4" />
              {isEditing ? "View Mode" : "Edit Mode"}
            </button>
          </div>
        </div>

        {/* Form Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* Page ID / URL */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-2">
              <Link2 className="w-4 h-4" /> Page ID
            </label>
            {isEditing ? (
              <input
                value={formData.pageId}
                onChange={(e) => handleChange("pageId", e.target.value)}
                className="border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="font-medium text-gray-800 dark:text-gray-100">
                {formData.pageId}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-2">
              <Globe className="w-4 h-4" /> Page URL
            </label>
            {isEditing ? (
              <input
                value={formData.pageUrl}
                onChange={(e) => handleChange("pageUrl", e.target.value)}
                className="border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="font-medium text-blue-600 dark:text-blue-400">
                {formData.pageUrl}
              </p>
            )}
          </div>

          {/* Page Title / Type */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-2">
              <Type className="w-4 h-4" /> Page Title
            </label>
            {isEditing ? (
              <input
                value={formData.pageTitle}
                onChange={(e) => handleChange("pageTitle", e.target.value)}
                className="border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="font-medium text-gray-800 dark:text-gray-100">
                {formData.pageTitle}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Page Type
            </label>
            {isEditing ? (
              <input
                value={formData.pageType}
                onChange={(e) => handleChange("pageType", e.target.value)}
                className="border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="font-medium text-gray-800 dark:text-gray-100">
                {formData.pageType}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="col-span-2 flex flex-col">
            <label className="text-sm text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Description
            </label>
            {isEditing ? (
              <textarea
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            ) : (
              <p className="text-gray-700 dark:text-gray-300">
                {formData.description}
              </p>
            )}
          </div>

          {/* List Style / Categories */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-2">
              <List className="w-4 h-4" /> List Style
            </label>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 border rounded-lg px-3 py-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                <List
                  className={`w-4 h-4 ${
                    formData.listStyle === "icons"
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                />
                Icons
                {formData.listStyle === "icons" && (
                  <Star className="w-3 h-3 text-yellow-400" />
                )}
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-2">
              <Tag className="w-4 h-4" /> Categories
            </label>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 border rounded-lg px-3 py-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                Horizontal
                {formData.categories === "horizontal" && (
                  <Star className="w-3 h-3 text-yellow-400" />
                )}
              </span>
            </div>
          </div>

          {/* Products / Shuffle */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Products
            </label>
            {isEditing ? (
              <input
                type="number"
                value={formData.products}
                onChange={(e) => handleChange("products", e.target.value)}
                className="border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="font-medium text-gray-800 dark:text-gray-100">
                {formData.products}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-2">
              <Shuffle className="w-4 h-4" /> Shuffle
            </label>
            {isEditing ? (
              <input
                type="checkbox"
                checked={formData.shuffle}
                onChange={(e) => handleChange("shuffle", e.target.checked)}
                className="w-5 h-5 accent-blue-600"
              />
            ) : (
              <p className="font-medium text-gray-800 dark:text-gray-100">
                {formData.shuffle ? "Yes" : "No"}
              </p>
            )}
          </div>

          {/* Page Settings */}
          <div className="col-span-2 flex flex-wrap gap-3 border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <button className="flex items-center gap-2 border px-3 py-2 rounded-lg border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200">
              <Globe className="w-4 h-4" /> Visibility:{" "}
              <span className="font-medium">{formData.visibility}</span>
            </button>

            <button className="flex items-center gap-2 border px-3 py-2 rounded-lg border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200">
              <Star
                className={`w-4 h-4 ${
                  formData.isDefault
                    ? "text-yellow-400"
                    : "text-gray-400 dark:text-gray-500"
                }`}
              />
              Default
            </button>

            <button className="flex items-center gap-2 border px-3 py-2 rounded-lg border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200">
              <Edit3 className="w-4 h-4" /> Edit Page
            </button>

            <button className="flex items-center gap-2 border px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 border-gray-300 dark:border-gray-700">
              <Trash2 className="w-4 h-4" /> Delete Page
            </button>
          </div>

          {/* Created At */}
          <div className="col-span-2 flex justify-end items-center text-gray-500 dark:text-gray-400 text-sm mt-6">
            <Calendar className="w-4 h-4 mr-1" />
            Created at: {formData.createdAt}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePage;
