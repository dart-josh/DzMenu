import { Link } from "react-router-dom";
import { AlertTriangle, Home } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Client404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 relative overflow-hidden">
      {/* Subtle background effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center"
      >
        {/* Icon */}
        <div className="relative mx-auto w-20 h-20 mb-6 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg shadow-blue-500/30">
          <AlertTriangle className="w-10 h-10 text-white" />
          <div className="absolute inset-0 rounded-2xl bg-blue-500/30 blur-md animate-pulse" />
        </div>

        {/* Text */}
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          404 — Invalid Page
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
          Oops! The page you’re looking for doesn’t exist or may have been moved.
          Let’s get you back to safety.
        </p>

        {/* Button */}
        <Link
          to="/client/dashboard"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
        >
          <Home className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </motion.div>

      {/* Animated floating numbers */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute text-[160px] font-bold text-gray-200 dark:text-gray-800/40 select-none z-0"
      >
        404
      </motion.div>
    </div>
  );
};

export default Client404;
