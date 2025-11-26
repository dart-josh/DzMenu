// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShieldCheck,
  CreditCard,
  Loader2,
  Sparkles,
  RefreshCw,
  CalendarDays,
} from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { formatNumber } from "../../../utils/formats";
import { useUserStore } from "../store/useUserStore";
import { notify } from "../../../store/useNotificationStore";
import AddonsDialog from "./AddonsDialog";
import { addonsList } from "../../../utils/globalVariables";

export default function CheckoutDialog({
  open,
  onClose,
  checkoutData, // { plan, billing, addons }
  onPayment,
  autoRenewalEnabled,
}) {
  const { plan, billing, finalPrice, addons } = checkoutData || {};

  const [loading, setLoading] = useState(false);
  const [autoRenewal, setAutoRenewal] = useState(autoRenewalEnabled);

  const [addonsOpen, setAddonsOpen] = useState(false);

  const [selectedAddons, setSelectedAddons] = useState(addons);
  const [selectedAddonsDetails, setSelectedAddonsDetails] = useState([]);

  const [addonPrice, setAddonPrice] = useState(0);
  const [checkoutPrice, setCheckoutPrice] = useState(finalPrice);

  const { planUsage } = useUserStore();

  const getAddonPrice = (addon) => {
    if (!addon) return 0;
    if (addon.addon.id == "products") {
      return (
        (addon.value / 200) *
        (billing == "monthly" ? addon.addon.price : addon.addon.yearlyPrice)
      );
    } else {
      return (
        addon.value *
        (billing == "monthly" ? addon.addon.price : addon.addon.yearlyPrice)
      );
    }
  };

  useEffect(() => {
    setAutoRenewal(autoRenewalEnabled);
  }, [autoRenewalEnabled, open]);

  useEffect(() => {
    setSelectedAddons(addons);
  }, [addons, open, checkoutData]);

  useEffect(() => {
    const getAddonsDetails = (addons) => {
      const adn = Object.entries(addons).map(([key, value]) =>
        value
          ? {
              addon: addonsList.find((a) => a.id === key) || {},
              value,
            }
          : null
      );

      const totalAddonPrice = adn.reduce(
        (total, item) => total + getAddonPrice(item),
        0
      );

      setAddonPrice(totalAddonPrice);
      setCheckoutPrice(finalPrice + totalAddonPrice);
      setSelectedAddonsDetails(adn);
    };

    if (selectedAddons) getAddonsDetails(selectedAddons);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAddons, checkoutData]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    return () => (document.body.style.overflow = "");
  }, [open]);

  if (!open) return null;

  const checkPlanLimit = (currentPlan, newPlan) => {
    if (currentPlan.stores > newPlan.stores && newPlan.stores != -1)
      return {
        success: false,
        message: `Stores limit exceeded, select another plan or add more stores. You need ${
          currentPlan.stores - newPlan.stores
        } more store${currentPlan.stores - newPlan.stores == 1 ? "" : "s"}.`,
      };

    if (currentPlan.pages > newPlan.pages && newPlan.pages != -1)
      return {
        success: false,
        message: `Pages limit exceeded, select another plan or add more pages. You need ${
          currentPlan.pages - newPlan.pages
        } more page${currentPlan.pages - newPlan.pages == 1 ? "" : "s"}.`,
      };

    if (currentPlan.products > newPlan.products && newPlan.products != -1)
      return {
        success: false,
        message: `Products limit exceeded, select another plan or add more products. You need ${
          currentPlan.products - newPlan.products
        } more product${
          currentPlan.products - newPlan.products == 1 ? "" : "s"
        }.`,
      };

    return { success: true, message: "Plan good" };
  };

  const checkPlan = () => {
    const newPlanLimits = checkoutData?.plan?.limits || {};

    const currentPlan = {
      stores: planUsage?.stores || 0,
      pages: planUsage?.pages || 0,
      products: planUsage?.products || 0,
    };

    const newPlan = {
      stores:
        newPlanLimits?.stores == "Unlimited"
          ? -1
          : (newPlanLimits?.stores || 0) + (selectedAddons?.stores || 0),
      pages:
        newPlanLimits?.pages == "Unlimited"
          ? -1
          : (newPlanLimits?.pages || 0) + (selectedAddons?.pages || 0),
      products:
        newPlanLimits?.products == "Unlimited"
          ? -1
          : (newPlanLimits?.products || 0) + (selectedAddons?.products || 0),
    };

    var res = checkPlanLimit(currentPlan, newPlan);
    if (!res.success) {
      notify({
        title: "Subscription Error",
        message: res.message,
        type: "error",
        duration: 4000,
      });
    }

    return res.success;
  };

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

  const handlePayment = async () => {
    const isPlanValid = checkPlan();
    if (!isPlanValid) return;

    checkoutData.addonPrice = addonPrice;
    checkoutData.totalPrice = checkoutPrice;
    checkoutData.addons = selectedAddons;
    checkoutData.autoRenewal = autoRenewal;

    setLoading(true);
    await onPayment(checkoutData);
    setLoading(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-xl z-50 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Dialog */}
        <motion.div
          className="w-full max-w-lg 
        bg-white/50 dark:bg-gray-900/30
        backdrop-blur-2xl rounded-3xl 
        border border-white/30 dark:border-gray-700/50
        shadow-[0_0_30px_rgba(0,0,0,0.3)]
        py-7 px-3 xs:px-7 relative space-y-7
        text-gray-900 dark:text-gray-100 max-h-full overflow-hidden flex flex-col
      "
          initial={{ scale: 0.85, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 20 }}
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full 
        bg-white/20 dark:bg-gray-800/30 border border-white/30
        hover:bg-white/30 transition shadow"
          >
            <X className="w-5 h-5 text-gray-900 dark:text-gray-200" />
          </button>

          {/* HEADER */}
          <div className="flex items-center gap-3">
            <Sparkles className="w-7 h-7 text-blue-500 drop-shadow" />
            <h2 className="text-2xl font-extrabold tracking-tight">
              Complete Your Checkout
            </h2>
          </div>

          <div className="flex-1 overflow-auto custom-scrollbar space-y-5">
            {/* PLAN CARD */}
            <div
              className="bg-white/40 dark:bg-gray-800/40
        border border-gray-200/40 dark:border-gray-700/40
        rounded-2xl p-5 shadow-inner
      "
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{plan.name}</h3>

                <span
                  className="px-4 py-1.5 rounded-full text-xs font-medium 
            bg-blue-600/90 text-white shadow"
                >
                  {billing === "monthly" ? "Monthly Billing" : "Yearly Billing"}
                </span>
              </div>

              {/* Plan Limits */}
              <div className="mt-3 text-sm space-y-1">
                <p>Stores: {plan.limits.stores}</p>
                <p>Pages: {plan.limits.pages}</p>
                <p>Products: {plan.limits.products}</p>
              </div>
            </div>

            {/* ADD-ONS SECTION */}
            <div
              className="bg-white/40 dark:bg-gray-800/40 
        border border-gray-200/40 dark:border-gray-700/40
        rounded-2xl p-5 shadow-inner space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Add-ons</h3>

                <button
                  onClick={() => setAddonsOpen(true)}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm
              bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 
              transition"
                >
                  <Sparkles className="w-4 h-4" />
                  Select
                </button>
              </div>

              {/* Show Selected Addons */}
              {selectedAddonsDetails.length === 0 ? (
                <p className="text-sm text-gray-600 dark:text-gray-300 italic">
                  No add-ons selected yet.
                </p>
              ) : (
                <div className="space-y-2">
                  {selectedAddonsDetails.map((a, idx) =>
                    !a ? null : (
                      <div
                        key={idx}
                        className="flex items-center justify-between
                text-sm bg-white/30 dark:bg-gray-800/30 p-2.5 rounded-xl"
                      >
                        <span className="capitalize">
                          {a.addon.id}: {a.value}
                        </span>
                        <span className="font-semibold">
                          {formatNumber(getAddonPrice(a), true)}
                        </span>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            {/* TOTAL */}
            <div
              className="bg-white/50 dark:bg-gray-800/50 border border-gray-300/40 
        dark:border-gray-700/40 p-5 rounded-2xl shadow-inner"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-lg">Total Amount</span>
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {formatNumber(checkoutPrice, true)}
                </span>
              </div>

              <div className="flex justify-between items-center mt-2">
                <span className="text-sm">Plan price:</span>
                <span className="font-semibold">
                  {formatNumber(finalPrice, true)}
                </span>
              </div>

              {(addonPrice && (
                <div className="flex justify-between items-center mt-0.5">
                  <span className="text-sm">Addons price:</span>
                  <span className="font-semibold">
                    {formatNumber(addonPrice, true)}
                  </span>
                </div>
              )) || <></>}

              <p className="text-xs text-gray-500 mt-1">
                VAT included • Secure encryption
              </p>
            </div>

            <AutoRenewToggle
              billing={billing}
              onChange={(state) => console.log("Auto-renew:", state)}
              enabled={autoRenewal}
              setEnabled={setAutoRenewal}
            />

            {/* PAYMENT METHODS */}
            <div
              className="bg-white/40 dark:bg-gray-800/40 
        border border-gray-200/40 dark:border-gray-700/40
        rounded-2xl p-5 shadow-inner"
            >
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="w-5 h-5 text-gray-800 dark:text-gray-300" />
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                  Payment Method
                </h4>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition shadow-md">
                Pay with Card
              </button>

              <p className="flex items-center gap-1 text-xs text-gray-500 mt-3">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                100% encrypted & secured
              </p>
            </div>
          </div>

          {/* PRIMARY BUTTON */}
          <button
            disabled={loading}
            onClick={handlePayment}
            className={`w-full py-3 rounded-xl text-white font-semibold shadow-lg transition flex items-center justify-center
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

        <AddonsDialog
          open={addonsOpen}
          onClose={() => setAddonsOpen(false)}
          addons={addonsList}
          billing={billing}
          currentAddons={{
            ...selectedAddons,
            products: (selectedAddons?.products || 0) / 200,
          }}
          onSave={(data) => {
            setSelectedAddons(data);
            setAddonsOpen(false);
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}

const AutoRenewToggle = ({ billing = "monthly", onChange, enabled, setEnabled }) => {
  // Calculate renewal date automatically
  const renewalDate = useMemo(() => {
    const date = new Date();

    if (billing === "monthly") {
      date.setMonth(date.getMonth() + 1);
    } else {
      date.setFullYear(date.getFullYear() + 1);
    }

    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, [billing]);

  const toggle = () => {
    setEnabled((prev) => {
      const newVal = !prev;
      onChange && onChange(newVal);
      return newVal;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg 
                 flex items-center justify-between gap-4 select-none"
    >
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-semibold text-gray-900/90">Auto-Renewal</h3>
        </div>

        <p className="text-xs text-gray-900/60 flex items-center gap-1 mt-1">
          <CalendarDays className="w-3 h-3 text-indigo-500" />
          {enabled
            ? `Your plan will auto-renew on ${renewalDate}`
            : `Auto-renew is disabled`}
        </p>
      </div>

      {/* Toggle Switch */}
      <motion.button
        onClick={toggle}
        whileTap={{ scale: 0.9 }}
        className={`relative w-14 h-7 rounded-full transition-all 
          ${enabled ? "bg-blue-500/80" : "bg-gray-500/30"}`}
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`absolute top-1 left-1 h-5 w-5 rounded-full shadow-md 
            ${enabled ? "translate-x-7 bg-white" : "bg-white/40"}`}
        />
      </motion.button>
    </motion.div>
  );
};
