// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { X, CalendarDays, RefreshCcw, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";

export default function ManageSubscriptionDialog({
  open,
  onClose,
  subscription, // { planName, billing, expiresAt, autoRenewal }
  onToggleAutoRenewal,
}) {
  const [autoRenewal, setAutoRenewal] = useState(subscription.autoRenewal);

  useEffect(() => {
    setAutoRenewal(subscription.autoRenewal);
  }, [open, subscription]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  if (!open) return null;

  const expires = new Date(subscription.expiresAt).toLocaleDateString();

  const toggle = () => {
    const newVal = !autoRenewal;
    setAutoRenewal(newVal);
    onToggleAutoRenewal(newVal);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Dialog */}
        <motion.div
          className="w-full max-w-sm bg-white/10 dark:bg-gray-900/20
          rounded-2xl backdrop-blur-xl border border-white/20 dark:border-gray-700/40
          shadow-2xl p-6 relative space-y-6"
          initial={{ scale: 0.85, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 18 }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full hover:bg-white/15 dark:hover:bg-gray-800/40 transition"
          >
            <X className="w-5 h-5 text-white/80" />
          </button>

          {/* Title */}
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">
              Manage Subscription
            </h2>
          </div>

          {/* Subscription Details */}
          <div className="bg-white/10 p-4 rounded-xl border border-white/10 space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-white/80 text-sm">Plan</p>
              <p className="font-semibold text-white">{subscription.planName}</p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-white/80 text-sm">Billing</p>
              <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300">
                {subscription.billing === "monthly" ? "Monthly" : "Yearly"}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-white/80 text-sm">Expires</p>
              <div className="flex items-center gap-2 text-white">
                <CalendarDays className="w-4 h-4 text-blue-300" />
                <span>{expires}</span>
              </div>
            </div>
          </div>

          {/* Auto Renewal Section */}
          <div className="bg-white/10 p-4 rounded-xl border border-white/10 space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white font-medium flex items-center gap-2">
                  <RefreshCcw className="w-4 h-4 text-blue-400" />
                  Auto Renewal
                </p>
                <p className="text-xs text-white/60 mt-1">
                  {autoRenewal ? 'Your plan will auto renew on' : 'Your plan will expire on'} <span className="text-blue-300">{expires}</span>
                </p>
              </div>

              {/* Toggle */}
              <button
                onClick={toggle}
                className={`relative w-14 h-7 rounded-full transition-all 
                ${autoRenewal ? "bg-blue-500/70" : "bg-white/20"}`}
              >
                <motion.div
                  layout
                  className={`w-6 h-6 rounded-full bg-white absolute top-0.5 shadow
                  ${autoRenewal ? "right-0.5" : "left-0.5"}`}
                />
              </button>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition"
          >
            Done
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
