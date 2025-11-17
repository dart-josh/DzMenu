// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

export const FullPageLoader = ({ text = "Loading..." }) => {
  // Prevent page scroll when loader is active
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-md bg-white/20 dark:bg-gray-900/40">
      {/* Animated loader content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center justify-center bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl px-8 py-6 backdrop-blur-lg"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        >
          <Loader2 className="w-10 h-10 text-blue-600 dark:text-blue-400" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-gray-800 dark:text-gray-200 font-semibold tracking-wide"
        >
          {text}
        </motion.p>

        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="mt-4 h-[3px] w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 rounded-full shadow-lg"
        />
      </motion.div>

      {/* Subtle futuristic grid glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.1),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(14,165,233,0.08),transparent_50%)]" />
    </div>
  );
};
