import {
  Plus,
  Grid,
  List,
  ShoppingBag,
  Edit3,
  Eye,
  Trash2,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import ManageProductDialog from "../dialogs/ManageProduct";

const ProductsPage = () => {
  const { category } = useParams();
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const categories = [
    "Smoothies",
    "Juice",
    "Whole foods",
    "Groceries",
    "Bread",
  ];

  const products = [
    {
      id: 1,
      name: "Tropical Smoothie",
      price: 2500,
      image: "/products/Juice-Be-Radiant-web.jpg",
    },
    {
      id: 2,
      name: "Berry Blast",
      price: 2200,
      image: "/products/Juice-Be-Radiant-web.jpg",
    },
    {
      id: 3,
      name: "Green Detox",
      price: 2700,
      image: "/products/Juice-Be-Radiant-web.jpg",
    },
    {
      id: 1,
      name: "Tropical Smoothie",
      price: 2500,
      image: "/products/Juice-Be-Radiant-web.jpg",
    },
    {
      id: 2,
      name: "Berry Blast",
      price: 2200,
      image: "/products/Juice-Be-Radiant-web.jpg",
    },
    {
      id: 3,
      name: "Green Detox",
      price: 2700,
      image: "/products/Juice-Be-Radiant-web.jpg",
    },
    {
      id: 1,
      name: "Tropical Smoothie",
      price: 2500,
      image: "/products/Juice-Be-Radiant-web.jpg",
    },
    {
      id: 2,
      name: "Berry Blast",
      price: 2200,
      image: "/products/Juice-Be-Radiant-web.jpg",
    },
    {
      id: 3,
      name: "Green Detox",
      price: 2700,
      image: "/products/Juice-Be-Radiant-web.jpg",
    },
  ];

  return (
    <div className="w-full py-10 pt-5">
      {/* 🟩 Categories */}
      <div className="flex gap-3 xs:gap-4 overflow-x-auto custom-scrollbar pb-2 xs:pb-3 w-full">
        {categories.map((cat, i) => (
          <Link
            key={i}
            to={`/client/products/${cat.toLowerCase().replaceAll(" ", "_")}`}
          >
            <CategoryTile
              category={cat}
              active={category === cat.toLowerCase().replaceAll(" ", "_")}
            />
          </Link>
        ))}
      </div>

      {/* 🏷 Current Category */}
      <div className="flex items-center justify-between mt-5 mb-3">
        <div className="font-semibold text-2xl text-gray-800 capitalize">
          {category.replaceAll('_', ' ') || "All products"}
        </div>

        {/* Toggle View */}
        <div className="flex items-center gap-2 bg-white shadow-sm border rounded-full px-3 py-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-full transition ${
              viewMode === "grid"
                ? "bg-blue-500 text-white"
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            <Grid size={18} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-full transition ${
              viewMode === "list"
                ? "bg-blue-500 text-white"
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* 🛍 Product Section */}
      <div className="w-full rounded-2xl bg-white/70 backdrop-blur-md border border-gray-100 shadow-sm px-3 xs:px-6 py-4 xs:py-6">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-6">
            {products.map((product) => (
              <ProductTile
                key={product.id}
                product={product}
                setOpen={setOpen}
              />
            ))}
            <AddNewButton empty label="Add product" setOpen={setOpen} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {products.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                setOpen={setOpen}
              />
            ))}
            <AddNewButton label="Add product" setOpen={setOpen} />
          </div>
        )}
      </div>

      <ManageProductDialog open={open} onClose={onClose} storeId={"del"} />
    </div>
  );
};

const CategoryTile = ({ category, active }) => {
  return (
    <div
      className={`flex items-center gap-2 px-5 py-2 max-w-fit truncate rounded-full border text-sm font-medium transition-all cursor-pointer shadow-sm 
        ${
          active
            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-500 shadow-md"
            : "bg-white text-gray-700 hover:bg-blue-50 border-gray-200"
        }`}
    >
      <ShoppingBag
        size={16}
        className={active ? "text-white" : "text-blue-500"}
      />
      <span className="capitalize">{category}</span>
    </div>
  );
};

// 🧱 Product Tile (Grid)
const ProductTile = ({ product, setOpen }) => {
  return (
    <div className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-lg bg-white transition-all border border-gray-100 hover:border-blue-300">
      <img
        onClick={() => setOpen(true)}
        src={product.image}
        alt={product.name}
        className="h-30 xs:h-40 w-full object-cover transition-transform duration-200 group-hover:scale-105"
      />
      <div className="p-4 flex flex-col justify-between">
        <h3 className="font-semibold text-gray-800 truncate">{product.name}</h3>
        <div className="text-sm text-gray-600 mt-1">₦{product.price}</div>
      </div>
    </div>
  );
};

// 📋 Product Row (List)
const ProductRow = ({ product, setOpen }) => {
  return (
    <div className="flex items-center justify-between bg-white border border-gray-100 rounded-xl shadow-sm p-3 hover:shadow-md hover:border-blue-200 transition">
      <div className="flex items-center gap-3">
        <img
          onClick={() => setOpen(true)}
          src={product.image}
          alt={product.name}
          className="w-14 h-14 object-cover rounded-lg"
        />
        <div>
          <h3 className="font-semibold text-gray-800">{product.name}</h3>
          <p className="text-gray-500 text-sm">₦{product.price}</p>
        </div>
      </div>

      <div className="flex items-center text-gray-500">
        <Trash2 className="w-4 h-4 hover:text-red-500 cursor-pointer" />
      </div>
    </div>
  );
};

// ➕ Add New Button
const AddNewButton = ({ empty = false, label, setOpen }) => {
  return (
    <div
    onClick={() => setOpen(true)}
      className={`flex cursor-pointer items-center justify-center font-semibold gap-2 rounded-xl transition-all ${
        empty
          ? "flex-col h-[180px] border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50/50 text-gray-600"
          : "h-11 w-[220px] mt-10 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md hover:scale-[1.02] hover:shadow-lg"
      }`}
    >
      <Plus className={empty ? "w-7 h-7 text-blue-500" : "w-5 h-5"} />
      {label}
    </div>
  );
};

export default ProductsPage;
