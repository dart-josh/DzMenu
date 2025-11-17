import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCcw, Compass, Store } from "lucide-react";

export const PageNotFound = ({ storeId, owner }) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      {/* Background Glow / Visual */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-blue-500/20 blur-3xl rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-400/10 blur-3xl rounded-full" />
      </div>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center max-w-lg bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-10"
      >
        <motion.div
          animate={{ rotate: [0, 8, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-400/30 mb-5"
        >
          <AlertTriangle className="w-10 h-10 text-white" />
        </motion.div>

        <h1 className="text-6xl font-extrabold text-gray-800 dark:text-gray-100 tracking-tight mb-3">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Page Not Found
        </h2>

        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
          Oops! We couldn’t find the page you were looking for.
          <br />
          Here are a few possible reasons:
        </p>

        <ul className="text-left text-gray-600 dark:text-gray-400 text-sm mb-8 space-y-2 list-disc list-inside">
          <li>The page has been moved or deleted.</li>
          <li>The URL might be incorrect or misspelled.</li>
          <li>You may not have permission to access this page.</li>
          <li>Your session might have expired — try reloading.</li>
        </ul>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            to={`/client/store/${storeId}`}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow-md transition-transform hover:scale-[1.02]"
          >
            <Store className="w-4 h-4" />
            View store
          </Link>

          {owner && (
            <Link
              to={`/client/s/${storeId}/p`}
              className="flex items-center gap-2 border border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 px-5 py-2.5 rounded-xl text-sm font-medium transition-transform hover:scale-[1.02]"
            >
              <Compass className="w-4 h-4" />
              View All Pages
            </Link>
          )}

          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200/30 dark:hover:bg-gray-700/40 px-5 py-2.5 rounded-xl text-sm font-medium transition-transform hover:scale-[1.02]"
          >
            <RefreshCcw className="w-4 h-4" />
            Reload
          </button>
        </div>
      </motion.div>

      {/* Floating Glow Ring Animation */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0.6 }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-[15%] right-[20%] w-24 h-24 rounded-full border-2 border-blue-400/40 shadow-[0_0_50px_10px_rgba(59,130,246,0.1)]"
      />
    </div>
  );
};
