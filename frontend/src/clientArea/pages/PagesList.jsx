import { Plus, FileText, Edit3, Eye, Trash2, MoreVertical } from "lucide-react";

const PagesList = () => {
  const pages = [
    { id: 1, name: "Home", status: "Live" },
    { id: 2, name: "About Us", status: "Draft" },
    { id: 3, name: "Menu", status: "Live" },
    { id: 4, name: "Contact", status: "Draft" },
  ];

  return (
    <div className="w-full py-10 pt-5">
      <div className="w-full rounded-2xl bg-white/70 backdrop-blur-md border border-gray-100 shadow-md px-3 xs:px-6 py-5 xs:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pages.map((page) => (
            <PageTile key={page.id} page={page} />
          ))}

          <AddNewButton empty label="Add new page" />
        </div>

        <div className="mt-10">
          <AddNewButton label="Add new page" />
        </div>
      </div>
    </div>
  );
};

// 🧩 Page Tile
const PageTile = ({ page }) => {
  return (
    <div className="group relative h-[160px] bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:border-blue-400 transition-all duration-200 p-4 flex flex-col justify-between">
      {/* Top Icon */}
      <div className="flex justify-between items-start">
        <div className="bg-blue-500/10 p-2 rounded-lg">
          <FileText className="w-5 h-5 text-blue-600" />
        </div>

        <button className="opacity-0 group-hover:opacity-100 transition">
          <MoreVertical className="w-5 h-5 text-gray-400 hover:text-blue-600" />
        </button>
      </div>

      {/* Page Info */}
      <div>
        <h3 className="font-semibold text-lg text-gray-800 truncate">
          {page.name}
        </h3>
        <p
          className={`text-sm font-medium ${
            page.status === "Live" ? "text-green-600" : "text-gray-500 italic"
          }`}
        >
          {page.status}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between text-gray-500 mt-2">
        <div className="flex items-center gap-3">
          <Edit3 className="w-4 h-4 cursor-pointer hover:text-blue-600 transition" />
          <Eye className="w-4 h-4 cursor-pointer hover:text-green-600 transition" />
          <Trash2 className="w-4 h-4 cursor-pointer hover:text-red-600 transition" />
        </div>
      </div>
    </div>
  );
};

// ➕ Add New Button
const AddNewButton = ({ empty = false, label }) => {
  return (
    <div
      className={`flex cursor-pointer items-center justify-center font-semibold text-gray-700 gap-2 rounded-xl transition-all ${
        empty
          ? "h-[160px] border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50/50 flex-col"
          : "h-11 w-[220px] bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md hover:scale-[1.02] hover:shadow-lg"
      }`}
    >
      <Plus className={empty ? "w-6 h-6 text-blue-500" : "w-5 h-5"} />
      {label}
    </div>
  );
};

export default PagesList;
