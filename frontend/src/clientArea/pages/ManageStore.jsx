import { FileText, Image, Star } from "lucide-react";
import {
  Cog,
  Copy,
  Edit,
  Eye,
  Link2,
  Plus,
  Trash2,
  TriangleAlert,
  Store,
  ShoppingBag,
  LayoutGrid,
} from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CategoryManager from "../components/CategoryManager";

const ManageStore = () => {
  const { storeId } = useParams();

  useEffect(() => {
    // TODO: fetch store details
  }, [storeId]);

  return (
    <div className="w-full py-10 space-y-12">
      <StoreDetails />
      <Pages />
      <Products />
      <CategoryManager />
      <StoreSettings />
      <DeleteZone />
    </div>
  );
};

// 🟢 Store Details Section
const StoreDetails = () => {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-teal-50 to-white shadow-lg p-6 border border-teal-100/80">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-teal-500/10 p-4 rounded-xl">
            <Store className="w-8 h-8 text-teal-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Delightsome Juice & Smoothies
            </h2>
            <p className="text-gray-500 italic mt-1">Opened since July 2025</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-700 font-medium shadow-inner">
          <span>ID:</span>
          <span className="font-semibold">delightsome_143</span>
          <Copy className="w-4 h-4 cursor-pointer hover:text-teal-600" />
        </div>
      </div>

      <StoreLink />
    </div>
  );
};

// 🔗 Store Link
const StoreLink = () => {
  return (
    <div className="mt-5 inline-flex items-center gap-3 bg-white shadow-md rounded-full px-5 py-2 text-sm text-gray-700 font-medium hover:shadow-lg transition">
      <Link2 className="w-4 h-4 text-teal-600" />
      <span className="text-teal-700 font-semibold">delightsome_123</span>
      <Copy className="w-4 h-4 cursor-pointer hover:text-teal-500" />
      <div className="flex items-center gap-1 text-green-600 font-medium">
        <Eye className="w-4 h-4" />
        <span>Live</span>
      </div>
    </div>
  );
};

// 🧭 Pages Section
const Pages = () => {
  const pages = [
    { name: "Home", desc: "Landing overview", icon: <LayoutGrid size={16} /> },
    { name: "Menu", desc: "Food & drinks", icon: <FileText size={16} /> },
    { name: "Gallery", desc: "Image showcase", icon: <Image size={16} /> },
    { name: "About", desc: "Brand story", icon: <Star size={16} /> },
  ];

  return (
    <div>
      <SectionHeader icon={<LayoutGrid />} title="Pages" color="blue" />
      <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-white px-3 xs:px-5 py-5 border border-blue-100 shadow-sm">
        <div className="flex w-full overflow-x-auto pb-4 gap-4">
          {pages.map((page, i) => (
            <div
              key={i}
              className="min-w-[120px] h-[80px] bg-white border border-blue-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-400 transition flex flex-col items-start justify-center px-3"
            >
              <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
                {page.icon}
                {page.name}
              </div>
              <p className="text-xs text-gray-500 mt-1">{page.desc}</p>
            </div>
          ))}
        </div>

        <AddNewButton label="Add new page" color="blue" />
      </div>
    </div>
  );
};

// 🛍 Products Section
const Products = () => {
  const products = [
    { name: "Berry Smoothie", desc: "₦2500", icon: <ShoppingBag size={16} /> },
    { name: "Tropical Juice", desc: "₦1800", icon: <ShoppingBag size={16} /> },
    { name: "Organic Bread", desc: "₦1500", icon: <ShoppingBag size={16} /> },
    { name: "Green Detox", desc: "₦2700", icon: <ShoppingBag size={16} /> },
  ];

  return (
    <div>
      <SectionHeader icon={<ShoppingBag />} title="Products" color="emerald" />
      <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-white px-3 xs:px-5 py-5 border border-emerald-100 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {products.map((prod, i) => (
            <div
              key={i}
              className="h-[80px] bg-white border border-emerald-200 rounded-xl shadow-sm hover:shadow-md hover:border-emerald-400 transition flex flex-col items-start justify-center px-3"
            >
              <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm">
                {prod.icon}
                {prod.name}
              </div>
              <p className="text-xs text-gray-500 mt-1">{prod.desc}</p>
            </div>
          ))}
        </div>

        <Link
          to="/client/products"
          className="block mt-3 text-right text-gray-500 hover:text-emerald-700 underline italic text-sm"
        >
          View more
        </Link>

        <AddNewButton label="Add product" color="emerald" />
      </div>
    </div>
  );
};

// ⚙ Store Settings Section
const StoreSettings = () => {
  return (
    <div>
      <SectionHeader icon={<Cog />} title="Store Settings" color="violet" />
      <p className="mb-4 max-w-[500px] text-gray-600 text-sm">
        Use this section to update your store’s details such as name,
        description, and status. Don’t forget to save your changes when you’re
        done.
      </p>

      <button className="flex items-center gap-3 font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-lg px-4 py-2 transition-all shadow-sm">
        <Edit className="w-5 h-5" />
        Edit Store Details
      </button>
    </div>
  );
};

// 🔴 Danger Zone Section
const DeleteZone = () => {
  return (
    <div>
      <SectionHeader icon={<TriangleAlert />} title="Danger Zone" color="red" />
      <p className="mb-4 max-w-[500px] text-gray-600 text-sm">
        Deleting this store is permanent. All associated pages, products, and
        data will be removed and cannot be recovered.
      </p>

      <button className="flex items-center gap-3 font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg px-4 py-2 transition-all shadow-sm">
        <Trash2 className="w-5 h-5" />
        Delete Store
      </button>
    </div>
  );
};

// ➕ Add New Button
const AddNewButton = ({ label, color = "gray" }) => {
  const colorMap = {
    blue: "from-blue-500 to-blue-600",
    emerald: "from-emerald-500 to-emerald-600",
    gray: "from-gray-500 to-gray-600",
  };

  return (
    <div className="mt-6">
      <button
        className={`flex items-center justify-center gap-2 font-semibold text-white bg-gradient-to-r ${colorMap[color]} hover:opacity-90 rounded-lg px-5 py-2 shadow-md transition-all`}
      >
        <Plus className="w-5 h-5" />
        {label}
      </button>
    </div>
  );
};

// 🧩 Section Header Component
const SectionHeader = ({ icon, title, color = "gray" }) => {
  const textColor = {
    blue: "text-blue-700 border-blue-200",
    emerald: "text-emerald-700 border-emerald-200",
    violet: "text-violet-700 border-violet-200",
    red: "text-red-700 border-red-200",
    gray: "text-gray-700 border-gray-200",
  };

  return (
    <div
      className={`flex items-center gap-3 font-bold text-xl mb-4 pb-2 border-b-2 ${textColor[color]}`}
    >
      <div className="p-1 rounded-full bg-opacity-10">{icon}</div>
      {title}
    </div>
  );
};

export default ManageStore;
