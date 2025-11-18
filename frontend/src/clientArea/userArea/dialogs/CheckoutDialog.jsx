// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShieldCheck,
  CreditCard,
  Loader2,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function CheckoutDialog({
  open,
  onClose,
  checkoutData, // { plan, billing, addons }
  onPayment,
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    return () => (document.body.style.overflow = "");
  }, [open]);

  if (!open) return null;

  // ❗Handle missing plan data gracefully
  if (!checkoutData || !checkoutData.plan) {
    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="max-w-sm w-full bg-red-600 text-white p-6 rounded-2xl shadow-2xl text-center"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
          >
            <h2 className="text-xl font-semibold">Invalid Plan</h2>
            <p className="text-sm mt-2 opacity-90">
              Something went wrong. Please reselect your upgrade plan.
            </p>

            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-black/30 rounded-lg text-white font-medium hover:bg-black/50 transition"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  const { plan, billing, addons = [] } = checkoutData;

  const handlePayment = async () => {
    setLoading(true);
    await onPayment(checkoutData);
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
        {/* Dialog */}
        <motion.div
          className="w-full max-w-md bg-white/70 dark:bg-gray-900/70 
          backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/40
          shadow-2xl p-6 relative space-y-6"
          initial={{ scale: 0.85, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 20 }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-200/40 
            dark:hover:bg-gray-800/40 transition"
          >
            <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Complete Checkout
            </h2>
          </div>

          {/* Plan Summary */}
          <div className="bg-white/60 dark:bg-gray-800/60 border border-gray-200/40 
          dark:border-gray-700/40 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
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
              <div className="pt-3 mt-3 border-t border-gray-300/40 dark:border-gray-700/40">
                <p className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-1">
                  Add-ons:
                </p>
                {addons.map((a, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300"
                  >
                    <span>{a.name}</span>
                    <span>{a.price}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Total Price */}
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 pt-2 border-t border-gray-300/40 dark:border-gray-700/40">
              Total:{" "}
              <span className="text-blue-600 dark:text-blue-400">
                {plan.finalPrice}
              </span>
            </p>
          </div>

          {/* Payment Method */}
          <div className="bg-white/60 dark:bg-gray-800/60 border border-gray-200/40 
          dark:border-gray-700/40 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                Payment Method
              </h4>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition">
              Pay with Card
            </button>

            <p className="flex items-center gap-1 text-xs text-gray-500 mt-3">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              Payments are encrypted & secured
            </p>
          </div>

          {/* Complete Purchase */}
          <button
            disabled={loading}
            onClick={handlePayment}
            className={`w-full py-3 rounded-xl text-white font-semibold shadow transition flex items-center justify-center
            ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-900"
            }`}
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Complete Purchase"
            )}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
