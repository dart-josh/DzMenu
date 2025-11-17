import React, { useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Building2, FilePlus2, PackagePlus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateShortcutDialog = ({ isOpen, onClose, hasActiveStore, activeStore }) => {
  const navigate = useNavigate();

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const shortcuts = hasActiveStore
    ? [
        {
          label: "Create Page",
          desc: "Add a new page under your current store to organize your content.",
          icon: <FilePlus2 className="w-6 h-6 text-blue-500" />,
          action: () => navigate(`/client/s/${activeStore}/p/new`),
          color: "from-blue-500/20 to-blue-600/10 border-blue-400/30",
        },
        {
          label: "Add Product",
          desc: "Add products to your store and display them to your customers.",
          icon: <PackagePlus className="w-6 h-6 text-emerald-500" />,
          action: () => navigate(`/client/products?x=create`),
          color: "from-emerald-500/20 to-emerald-600/10 border-emerald-400/30",
        },
      ]
    : [
        {
          label: "Create Store",
          desc: "Start by creating your first store to manage your pages and products.",
          icon: <Building2 className="w-6 h-6 text-violet-500" />,
          action: () => navigate("/client/store?x=create"),
          color: "from-violet-500/20 to-violet-600/10 border-violet-400/30",
        },
      ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-[90%] max-w-md rounded-2xl bg-gradient-to-b from-gray-900/90 to-gray-800/80 border border-white/10 shadow-2xl p-6 text-white backdrop-blur-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold tracking-tight mb-2">
                Quick Actions
              </h2>
              <p className="text-gray-400 text-sm">
                {hasActiveStore
                  ? "Select an action to manage your store faster."
                  : "You don’t have an active store yet. Start by creating one."}
              </p>
            </div>

            {/* Action Cards */}
            <div className="space-y-3">
              {shortcuts.map((item, i) => (
                <motion.button
                  key={i}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  className={`w-full flex items-center gap-4 text-left bg-gradient-to-br ${item.color} border rounded-xl px-5 py-4 hover:bg-white/10 transition relative overflow-hidden group`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-medium">{item.label}</h3>
                    <p className="text-sm text-gray-400 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                  <motion.div
                    className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition"
                    initial={false}
                  />
                </motion.button>
              ))}
            </div>

            <div className="mt-6 text-center text-xs text-gray-500">
              Press <kbd className="px-1.5 py-0.5 bg-gray-700/50 rounded">ESC</kbd> to close
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateShortcutDialog;
