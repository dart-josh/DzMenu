// NotificationContainer.jsx
import { useEffect, useState } from "react";
import { X, CheckCircle, Info, AlertTriangle, AlertCircle } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useNotificationStore } from "../store/useNotificationStore";

const variants = {
  info: {
    bg: "bg-white/80 dark:bg-gray-900/80",
    border: "border border-blue-200 dark:border-blue-700",
    text: "text-gray-800 dark:text-gray-100",
    icon: <Info className="w-5 h-5 text-blue-500" />,
  },
  success: {
    bg: "bg-emerald-50/80 dark:bg-emerald-900/40",
    border: "border border-emerald-200 dark:border-emerald-700",
    text: "text-emerald-800 dark:text-emerald-100",
    icon: <CheckCircle className="w-5 h-5 text-emerald-500" />,
  },
  warning: {
    bg: "bg-yellow-50/80 dark:bg-yellow-900/40",
    border: "border border-yellow-200 dark:border-yellow-700",
    text: "text-yellow-800 dark:text-yellow-100",
    icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
  },
  error: {
    bg: "bg-red-50/80 dark:bg-red-900/40",
    border: "border border-red-200 dark:border-red-700",
    text: "text-red-800 dark:text-red-100",
    icon: <AlertCircle className="w-5 h-5 text-red-500" />,
  },
};

export default function NotificationContainer() {
  const { notifications, removeNotification } = useNotificationStore();

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 items-end pointer-events-none">
      <AnimatePresence>
        {notifications.map((note) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto"
          >
            <NotificationCard note={note} onClose={() => removeNotification(note.id)} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function NotificationCard({ note, onClose }) {
  const { title, message, type = "info", duration = 4000 } = note;
  const variant = variants[type] || variants.info;
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => handleClose(), duration);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 250);
  };

  return (
    <div
      className={`flex items-start gap-3 p-3 min-w-[300px] max-w-[350px] rounded-xl shadow-lg backdrop-blur-md 
        ${variant.bg} ${variant.border} ${variant.text} 
        ${closing ? "opacity-0 scale-95" : "opacity-100 scale-100"} transition-all duration-300`}
    >
      <div className="mt-1">{variant.icon}</div>

      <div className="flex-1">
        <p className="font-semibold text-sm">{title}</p>
        {message && <p className="text-xs mt-1 text-gray-600 dark:text-gray-300">{message}</p>}
      </div>

      <button
        onClick={handleClose}
        className="ml-2 mt-1 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
