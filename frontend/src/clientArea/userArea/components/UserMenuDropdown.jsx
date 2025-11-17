import {
  User,
  Settings,
  Store,
  CreditCard,
  HelpCircle,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function UserMenuDropdown() {
  const [open, setOpen] = useState(false);

  const user = {
    name: "Joshua Adelooye",
    id: "USR-93281",
    avatar: "https://api.dicebear.com/9.x/identicon/svg?seed=joshua",
  };

  const menu = [
    {
      title: "My Account",
      icon: <LayoutDashboard className="w-5 h-5 text-blue-500" />,
      href: "/client/account",
    },
    {
      title: "My Stores",
      icon: <Store className="w-5 h-5 text-emerald-500" />,
      href: "/client/store",
    },
    {
      title: "Payment Profile",
      icon: <CreditCard className="w-5 h-5 text-purple-500" />,
      href: "/client/payments",
    },
    {
      divider: true,
    },
    {
      title: "Settings",
      icon: <Settings className="w-5 h-5 text-gray-500" />,
      href: "/client/settings",
    },
    {
      title: "Help & Support",
      icon: <HelpCircle className="w-5 h-5 text-amber-500" />,
      href: "/client/support",
    },
  ];

  return (
    <div className="relative">
      {/* Avatar Button */}
      <div className="rounded-full  size-10 bg-white/60 text-black/60 flex items-center justify-center">
        <button
          onClick={() => setOpen(!open)}
          className="flex size-10 items-center cursor-pointer justify-center rounded-full hover:bg-gray-100 transition"
        >
          <img
            src={user.avatar}
            alt="User"
            className="size-7"
          />
        </button>
      </div>

      {/* Dropdown Modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay click to close */}
            <div
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-10"
            ></div>

            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-20 backdrop-blur-md"
            >
              {/* Profile Section */}
              <div className="p-4 bg-gradient-to-r from-blue-50 via-white to-teal-50 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {user.name}
                    </h3>
                    <p className="text-xs text-gray-500">{user.id}</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="flex flex-col">
                {menu.map((item, i) =>
                  item.divider ? (
                    <div
                      key={i}
                      className="border-t border-gray-100 my-1"
                    ></div>
                  ) : (
                    <Link
                      key={i}
                      to={item.href}
                      onClick={()=> setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gradient-to-r hover:from-blue-50 hover:to-emerald-50 transition-all"
                    >
                      <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gray-50 border border-gray-100">
                        {item.icon}
                      </div>
                      <span className="font-medium text-sm">{item.title}</span>
                    </Link>
                  )
                )}
              </div>

              {/* Footer / Logout */}
              <div className="border-t border-gray-100 p-3">
                <button
                  onClick={() => alert("Logging out...")}
                  className="flex items-center justify-center w-full gap-2 text-red-500 hover:bg-red-50 font-semibold text-sm py-2 rounded-xl transition"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
