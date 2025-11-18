// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, Loader2, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function ConfirmUpgradeDialog({
  open,
  onClose,
  upgradeData, // { billing, plan: { name, finalPrice, limits }, addons }
  onConfirm,
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    return () => (document.body.style.overflow = "");
  }, [open]);

  if (!open || !upgradeData) return null;

  const { billing, plan, finalPrice, addons = [] } = upgradeData;

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm(upgradeData);
    setLoading(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-full max-w-sm bg-white/70 dark:bg-gray-900/70 
          backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/40
          shadow-2xl p-6 relative space-y-5"
          initial={{ scale: 0.85, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 20 }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-200/50 
            dark:hover:bg-gray-800/50 transition"
          >
            <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Confirm Upgrade
            </h2>
          </div>

          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            Review your upgrade details before proceeding with payment.
          </p>

          {/* Plan Summary */}
          <div className="p-4 rounded-xl bg-gray-100/60 dark:bg-gray-800/60 border border-gray-300/50 dark:border-gray-700/50 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {plan.name}
              </h3>

              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
                {billing === "monthly" ? "Monthly" : "Yearly"}
              </span>
            </div>

            {/* Limits */}
            <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <p>Stores: {plan.limits.stores}</p>
              <p>Pages: {plan.limits.pages}</p>
              <p>Products: {plan.limits.products}</p>
            </div>

            {/* Addons */}
            {addons.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-300/40 dark:border-gray-700/40">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                  Addons:
                </p>
                {addons.map((addon, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300"
                  >
                    <span>{addon.name}</span>
                    <span>{addon.price}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Price */}
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 pt-2 border-t border-gray-300/40 dark:border-gray-700/40">
              Total:{" "}
              <span className="text-blue-600 dark:text-blue-400">
                {finalPrice}
              </span>
            </p>
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleConfirm}
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold shadow transition flex items-center justify-center
            ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <CheckCircle className="w-5 h-5 mr-2 text-white" />
                Confirm & Pay
              </>
            )}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
