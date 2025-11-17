import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Building2, SearchX, RefreshCw, Store, Compass } from "lucide-react";

export const StoreNotFoundPage = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Background glowing orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-400/20 blur-3xl rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 blur-3xl rounded-full" />
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center max-w-xl bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl p-10"
      >
        {/* Animated Icon */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg shadow-blue-400/40 mb-5"
        >
          <SearchX className="w-10 h-10 text-white" />
        </motion.div>

        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Store Not Found
        </h1>

        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
          The store you’re looking for doesn’t exist or may have been removed.
          Double-check the store ID, or return to your store list to manage your
          active stores.
        </p>

        {/* Possible reasons */}
        <div className="text-left text-gray-600 dark:text-gray-400 text-sm mb-8 space-y-2">
          <p className="flex items-start gap-2">
            <Building2 className="w-4 h-4 text-blue-500 mt-0.5" />
            The store might have been deleted or renamed.
          </p>
          <p className="flex items-start gap-2">
            <RefreshCw className="w-4 h-4 text-blue-500 mt-0.5" />
            Your connection may have expired — try reloading or signing in again.
          </p>
          <p className="flex items-start gap-2">
            <Compass className="w-4 h-4 text-blue-500 mt-0.5" />
            The store ID or URL might be incorrect.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            to="/client/store"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow-md transition-transform hover:scale-[1.02]"
          >
            <Store className="w-4 h-4" />
            View All Stores
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 border border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 px-5 py-2.5 rounded-xl text-sm font-medium transition-transform hover:scale-[1.02]"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </motion.div>

      {/* Floating holo ring */}
      <motion.div
        initial={{ opacity: 0.3, scale: 0.8 }}
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-[20%] left-[30%] w-28 h-28 rounded-full border-2 border-blue-400/40 shadow-[0_0_50px_10px_rgba(59,130,246,0.15)]"
      />
    </div>
  );
};
