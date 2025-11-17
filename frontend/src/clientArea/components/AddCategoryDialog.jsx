import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { iconsList } from "../../utils/globarvariables";
import toast from "react-hot-toast";
import { sanitizeString } from "../../utils/stringSanitizers";

const AddCategoryDialog = ({ open, onClose, onSave }) => {
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(null);

  useEffect(() => {
    const cat = sanitizeString(category, 20)
    setCategory(cat);
  }, [category]);

  useEffect(() => {
    const des = sanitizeString(desc, 40)
    setDesc(des);
  }, [desc]);
  
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
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50">
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 w-[95%] max-w-md py-6 px-3 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Add New Category
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-200 rounded-full transition"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Input fields */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600">
              Category Name
            </label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
              placeholder="e.g. Fresh Juices"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Short Description
            </label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={2}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none text-gray-700 resize-none"
              placeholder="Write a short summary..."
            />
          </div>

          {/* Icon Selector */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Select Icon
            </label>
            <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-6 gap-3 mt-2 max-h-[160px] overflow-y-auto pr-1">
              {iconsList.map((ic) => (
                <div
                  key={ic.id}
                  onClick={() => setSelectedIcon(ic.id)}
                  className={`flex flex-col items-center justify-center border rounded-xl p-2 cursor-pointer transition-all hover:scale-105 ${
                    selectedIcon === ic.id
                      ? "border-blue-500 bg-blue-50 shadow-sm"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <div className="text-blue-600">{ic.icon}</div>
                  <p className="text-[10px] text-gray-500 mt-1">{ic.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={async () => {
              if (!category || category.length < 2) {
                return toast.error("Invalid category", { id: "error1" });
              }

              const res = await onSave({
                category,
                desc,
                iconId: selectedIcon,
              });
              if (res) {
                setCategory("");
                setDesc("");
                setSelectedIcon(null);
                onClose();
              }
            }}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:scale-[1.03] shadow-md transition-all"
          >
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryDialog;
