import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Store, PlusCircle, Compass, AlertCircle } from "lucide-react";

export const NoActiveStore = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      {/* Background visuals */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-blue-500/20 blur-3xl rounded-full" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-cyan-400/10 blur-3xl rounded-full" />
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center max-w-xl bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-10"
      >
        {/* Animated Icon */}
        <motion.div
          animate={{ rotate: [0, 8, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-400/30 mb-5"
        >
          <Store className="w-10 h-10 text-white" />
        </motion.div>

        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          No Active Store Selected
        </h1>

        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
          You currently don’t have an active store selected.  
          To continue, please choose one of your existing stores or create a new store.
        </p>

        {/* Possible reasons / hints */}
        <div className="text-left text-gray-600 dark:text-gray-400 text-sm mb-8 space-y-2">
          <p className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5" />
            Your session might have expired — your active store context was reset.
          </p>
          <p className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5" />
            You might have deleted or switched from your previously active store.
          </p>
          <p className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5" />
            No store has been selected yet after signup.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            to="/client/store"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow-md transition-transform hover:scale-[1.02]"
          >
            <Compass className="w-4 h-4" />
            View All Stores
          </Link>
        </div>
      </motion.div>

      {/* Decorative animation */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0.5 }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-[15%] left-[20%] w-24 h-24 rounded-full border-2 border-blue-400/40 shadow-[0_0_50px_10px_rgba(59,130,246,0.1)]"
      />
    </div>
  );
};
