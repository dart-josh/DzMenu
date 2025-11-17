import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ShieldAlert, LockKeyhole, AlertTriangle, Compass } from "lucide-react";

export const AccessDeniedPage = ({storeId, owner}) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      {/* Background lights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-red-500/20 blur-3xl rounded-full" />
        <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-blue-400/10 blur-3xl rounded-full" />
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center max-w-xl bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-10"
      >
        {/* Animated Icon */}
        <motion.div
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-orange-500 shadow-lg shadow-red-400/40 mb-5"
        >
          <LockKeyhole className="w-10 h-10 text-white" />
        </motion.div>

        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Access Denied
        </h1>

        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
          You don’t have permission to create a new page under this store.
          Please verify that you have selected the correct active store or have
          the necessary access rights.
        </p>

        {/* Hints / possible reasons */}
        <div className="text-left text-gray-600 dark:text-gray-400 text-sm mb-8 space-y-2">
          <p className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
            You might not be the owner or manager of this store.
          </p>
          <p className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
            Your active store context might be missing or expired.
          </p>
          <p className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
            Ensure you are logged into the correct workspace.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            to="/client/store"
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow-md transition-transform hover:scale-[1.02]"
          >
            <ShieldAlert className="w-4 h-4" />
            Select Active Store
          </Link>

          {owner && <Link
            to={`/client/s/${storeId}/p`}
            className="flex items-center gap-2 border border-red-500 text-red-600 dark:text-red-400 hover:bg-red-500/10 px-5 py-2.5 rounded-xl text-sm font-medium transition-transform hover:scale-[1.02]"
          >
            <Compass className="w-4 h-4" />
            View All Pages
          </Link>}
        </div>
      </motion.div>

      {/* Decorative animated ring */}
      <motion.div
        initial={{ opacity: 0.4, scale: 0.9 }}
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.05, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-[15%] left-[25%] w-24 h-24 rounded-full border-2 border-red-400/40 shadow-[0_0_50px_10px_rgba(239,68,68,0.15)]"
      />
    </div>
  );
};
