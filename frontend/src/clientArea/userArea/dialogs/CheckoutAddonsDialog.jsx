// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { X, Package, Plus, Minus, CreditCard, Loader } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useState } from "react";
import { addonsList } from "../../../utils/globalVariables";
import { formatNumber } from "../../../utils/formats";
import PaystackResumePayment from "../components/PaystackResumePayment";
import { completePayment, startPayment } from "../../../helpers/serverHelpers";
import PaymentWaitingDialog from "./PaymentWaitingDialog";

export default function CheckoutAddonsDialog({
  open,
  onClose,
  billing = "monthly", // from parent plan (LOCKED)
  onPay,
  onFail,
}) {
  const [addons, setAddons] = useState({
    stores: 0,
    pages: 0,
    products: 0,
  });

  const [loading, setLoading] = useState(false);

  const getMax = (id) => {
    switch (id) {
      case "stores":
        return 15;
      case "pages":
        return 25;
      case "products":
        return 200 * 25;

      default:
        return 0;
    }
  };

  const increment = (id) => {
    setAddons((p) => ({
      ...p,
      [id]: p[id] >= getMax(id) ? p[id] : p[id] + (id === "products" ? 200 : 1),
    }));
  };

  const decrement = (id) => {
    setAddons((p) => ({
      ...p,
      [id]: Math.max(0, p[id] - (id === "products" ? 200 : 1)),
    }));
  };

  const total = useMemo(() => {
    let amount = 0;

    for (const key in addons) {
      const item = addonsList.find((a) => a.id === key);
      if (!item) continue;

      let qty = addons[key];

      if (key === "products") qty = qty / 200;
      const price = billing === "yearly" ? item.yearlyPrice : item.price;

      amount += price * qty;
    }

    return amount;
  }, [addons, billing]);

  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentPayload, setPaymentPayload] = useState(null);

  const payNow = async () => {
    if (!total) return;

    const data = {
      type: "Addons",
      amount: total,
      metadata: addons,
      transactionType: "Addons",
    };
    // onPay && onPay({ addons, total });

    // start payment
    setLoading(true);
    const res = await startPayment(data);
    setLoading(false);

    if (res.success && res.access_code) {
      setPaymentPayload({
        accessCode: res.access_code,
        reference: res.reference,
      });

      // 2. Show waiting dialog + start popup
      setShowPaymentDialog(true);
    }
  };

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xl flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 20 }}
          transition={{ type: "spring", damping: 18 }}
          className="w-full max-w-sm rounded-2xl p-6 relative
            bg-white/10 border border-white/20 backdrop-blur-xl shadow-2xl"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-5 text-white" />
          </button>

          {/* Title */}
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 text-blue-400" />
            <h2 className="text-white text-lg font-semibold">
              Purchase Add-ons
            </h2>
          </div>

          {/* Billing Display */}
          <p className="text-xs text-white/60 mb-6">
            Billing cycle:{" "}
            <span className="text-blue-300 font-medium">
              {billing === "monthly" ? "Monthly" : "Yearly"}
            </span>{" "}
            (locked)
          </p>

          {/* ADDONS LIST */}
          <div className="space-y-4">
            {addonsList.map((item) => (
              <div
                key={item.id}
                className="bg-white/10 border border-white/10 
                p-3 rounded-xl flex items-center justify-between"
              >
                <div>
                  <p className="text-white font-medium">{item.label}</p>
                  <p className="text-xs text-white/50">
                    {billing === "monthly"
                      ? `${formatNumber(item.price, true)}/mo`
                      : `${formatNumber(item.yearlyPrice, true)}/yr`}
                  </p>
                </div>

                {/* Counter */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decrement(item.id)}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
                  >
                    <Minus className="w-4 text-white" />
                  </button>

                  <span className="text-white font-semibold w-8 text-center">
                    {item.id === "products"
                      ? addons[item.id] / 200
                      : addons[item.id]}
                  </span>

                  <button
                    onClick={() => increment(item.id)}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
                  >
                    <Plus className="w-4 text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* TOTAL */}
          <div className="mt-6 bg-white/10 p-4 border border-white/10 rounded-xl flex justify-between">
            <span className="text-white/70 text-sm">Total</span>
            <span className="text-white text-lg font-semibold">
              {formatNumber(total, true)}
            </span>
          </div>

          {/* <CheckoutButton data={checkoutData} /> */}

          {/* CTA */}
          <button
            onClick={payNow}
            disabled={loading || showPaymentDialog}
            className="w-full mt-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 
            text-white font-semibold flex items-center justify-center gap-2 transition"
          >
            {((loading || showPaymentDialog) && (
              <div className="flex items-center justify-center animate-spin">
                <Loader />
              </div>
            )) || <CreditCard className="w-4" />}
            Pay with Paystack
          </button>
        </motion.div>

        {showPaymentDialog && paymentPayload && (
          <>
            <PaymentWaitingDialog
              onCancel={() => {
                setShowPaymentDialog(false);
                setPaymentPayload(null); // stops PaystackResumePayment
              }}
            />

            <PaystackResumePayment
              accessCode={paymentPayload.accessCode}
              reference={paymentPayload.reference}
              // publicKey={paystackKey}
              onSuccess={async (ref) => {
                const res = await completePayment(ref);
                if (res.success) {
                  // stop dialog + component
                  setShowPaymentDialog(false);
                  setPaymentPayload(null);

                  if (onPay) onPay(res.user);
                }
              }}
              onFail={(ref) => {
                setShowPaymentDialog(false);
                setPaymentPayload(null);

                if (onFail) onFail(ref);
              }}
            />
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
