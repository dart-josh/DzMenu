/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react";
import { useGeneralStore } from "../../store/useGeneralStore";
import { useEffect } from "react";

const ConfirmDialog = () => {
  const {
    confirmDetails,
    toggleConfirm,
    openConfirm: open,
  } = useGeneralStore();
  const { onConfirm, title, description, icon, confirmText, cancelText } =
    confirmDetails;

  const onClose = () => {
    toggleConfirm(false);
  };

  useEffect(() => {
    if (open) {
      // lock body scroll
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => (document.body.style.overflow = "");
  }, [open]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
      if (!open) return;
      if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        onConfirm();
        onClose();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  const getIcon = () => {
    switch (icon) {
      case "success":
        return <CheckCircle className="w-12 h-12 text-green-500" />;
      case "error":
        return <XCircle className="w-12 h-12 text-red-500" />;
      case "info":
        return <Info className="w-12 h-12 text-blue-500" />;
      default:
        return <AlertTriangle className="w-12 h-12 text-yellow-500" />;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Dialog Card */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 max-w-sm w-full border border-gray-200 dark:border-gray-700 text-center"
        >
          {/* Icon */}
          <div className="flex justify-center mb-4">{getIcon()}</div>

          {/* Title & Description */}
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100">
            {title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {description}
          </p>

          {/* Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-sm rounded-xl font-medium border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-5 py-2.5 text-sm rounded-xl font-medium bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md hover:shadow-blue-500/30 hover:scale-[1.03] active:scale-[0.97] transition-all"
            >
              {confirmText}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ConfirmDialog;
