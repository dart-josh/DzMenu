import { Bell, X, Trash2 } from "lucide-react";
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Order",
      message: "You received a new order from John Doe",
      time: "2m ago",
    },
    {
      id: 2,
      title: "Store Update",
      message: "Your store ‘Vista Market’ is now live!",
      time: "10m ago",
    },
    {
      id: 3,
      title: "Payment Received",
      message: "₦15,000 has been credited to your wallet",
      time: "1h ago",
    },
    {
      id: 4,
      title: "Payment Received",
      message: "₦15,000 has been credited to your wallet",
      time: "1h ago",
    },
    {
      id: 5,
      title: "Payment Received",
      message: "₦15,000 has been credited to your wallet",
      time: "1h ago",
    },
    {
      id: 6,
      title: "Payment Received",
      message: "₦15,000 has been credited to your wallet",
      time: "1h ago",
    },
  ]);

  const clearOne = (id) => setNotifications(notifications.filter((n) => n.id !== id));
  const clearAll = () => setNotifications([]);

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative rounded-full size-10 bg-white/60 text-gray-700 flex items-center justify-center transition"
      >
        <Bell className="size-5" />
        {notifications.length > 0 && (
          <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full ring-1 ring-white"></span>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setOpen(false)}
            ></div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-20 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
                <h3 className="text-gray-800 font-semibold text-lg">Notifications</h3>
                {notifications.length > 0 && (
                  <button
                    onClick={clearAll}
                    className="text-sm text-gray-500 hover:text-red-600 flex items-center gap-1 transition"
                  >
                    <Trash2 className="w-4 h-4" /> Clear All
                  </button>
                )}
              </div>

              {/* Notifications List */}
              <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
                {notifications.length > 0 ? (
                  notifications.map((n) => (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3 p-4 hover:bg-gray-50 transition relative"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 text-sm">
                          {n.title}
                        </h4>
                        <p className="text-gray-600 text-sm">{n.message}</p>
                        <span className="text-xs text-gray-400 mt-1 block">
                          {n.time}
                        </span>
                      </div>
                      <button
                        onClick={() => clearOne(n.id)}
                        className="text-gray-400 hover:text-red-500 transition p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-10 flex flex-col items-center justify-center text-center text-gray-500">
                    <Bell className="w-10 h-10 mb-2 text-gray-400" />
                    <p className="font-medium">No new notifications</p>
                    <span className="text-sm text-gray-400 mt-1">
                      You’re all caught up!
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
