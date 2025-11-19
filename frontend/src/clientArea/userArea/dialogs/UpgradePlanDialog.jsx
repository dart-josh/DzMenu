// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";
import { plans } from "../../../utils/globalVariables.jsx";
import { useEffect, useState } from "react";

export default function UpgradePlanDialog({
  open,
  onClose,
  onUpgrade,
  currentPlan,
}) {
  const [selected, setSelected] = useState(null);
  const [billing, setBilling] = useState("monthly"); // NEW
  const selectedPlan = plans.find((p) => p.id === selected);

  // Calculate price based on billing cycle
  const getPlanPrice = (plan) => {
    if (!plan) return null;
    const base = parseFloat(plan.price.replace("$", ""));

    // You can customize this discount logic:
    return billing === "yearly" ? base * 12 * 0.8 : base; // yearly = 20% off
  };

  const finalPrice = selectedPlan ? getPlanPrice(selectedPlan) : null;

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    return () => (document.body.style.overflow = "");
  }, [open]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Dialog Container */}
        <motion.div
          className="w-full max-w-md bg-white/70 dark:bg-gray-900/70
            backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/50
            shadow-2xl p-6 relative space-y-5"
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 18 }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full 
              hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition"
          >
            <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Upgrade Your Plan
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            Select a plan to upgrade from your current:
            <span className="font-semibold ml-1 text-blue-600 dark:text-blue-400">
              {currentPlan}
            </span>
          </p>

          {/* BILLING TOGGLE — NEW */}
          <div className="flex items-center bg-gray-200/60 dark:bg-gray-800/60 p-1 rounded-xl w-full">
            <button
              onClick={() => setBilling("monthly")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition
                ${
                  billing === "monthly"
                    ? "bg-white dark:bg-gray-900 shadow text-blue-600"
                    : "text-gray-600 dark:text-gray-300"
                }`}
            >
              Monthly
            </button>

            <button
              onClick={() => setBilling("yearly")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition
                ${
                  billing === "yearly"
                    ? "bg-white dark:bg-gray-900 shadow text-blue-600"
                    : "text-gray-600 dark:text-gray-300"
                }`}
            >
              Yearly (Save 20%)
            </button>
          </div>

          {/* Plan Options */}
          <div className="space-y-3 max-h-96 overflow-y-auto pr-1 custom-scrollbar">
            {plans.map((plan) => {
              const isSelected = selected === plan.id;
              const isCurrent = currentPlan === plan.id;

              return (
                <div
                  key={plan.id}
                  className={`relative rounded-xl p-4 border cursor-pointer transition
                  ${
                    isSelected
                      ? "border-blue-500 bg-blue-50/60 dark:bg-blue-500/10"
                      : "border-gray-200 dark:border-gray-700 hover:bg-gray-100/60 dark:hover:bg-gray-800/60"
                  }
                  ${isCurrent ? "opacity-60 cursor-not-allowed" : ""}`}
                  onClick={() => !isCurrent && setSelected(plan.id)}
                >
                  <div className="flex items-center gap-3">
                    {plan.icon}

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {plan.tagline}
                      </p>
                    </div>

                    {isSelected && (
                      <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>

                  {/* Limits */}
                  <div className="flex gap-4 mt-3 text-sm text-gray-700 dark:text-gray-300">
                    <span>Stores: {plan.limits.stores}</span>
                    <span>Pages: {plan.limits.pages}</span>
                    <span>Products: {plan.limits.products}</span>
                  </div>

                  {/* Price Display */}
                  <p className="mt-2 text-gray-900 dark:text-gray-100 font-bold text-lg">
                    {billing === "monthly"
                      ? plan.price
                      : `$${(
                          parseFloat(plan.price.replace("$", "")) *
                          12 *
                          0.8
                        ).toFixed(0)}/yr`}
                  </p>

                  {plan.mostPopular && (
                    <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full shadow">
                      Popular
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Upgrade Button */}
          <button
            disabled={!selectedPlan}
            onClick={() =>
              selectedPlan &&
              onUpgrade({
                plan: selectedPlan,
                billingCycle: billing,
                finalPrice,
              })
            }
            className={`w-full py-3 rounded-xl text-white font-semibold shadow transition
            ${
              selectedPlan
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {selectedPlan
              ? `Upgrade to ${
                  selectedPlan.name
                } (${billing}) — $${finalPrice?.toFixed(0)}`
              : "Select a plan to continue"}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
