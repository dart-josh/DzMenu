import {
  Mail,
  CheckCircle,
  XCircle,
  Store,
  FileText,
  Package,
  Sparkles,
  ArrowRight,
  ShoppingCart,
  Info,
} from "lucide-react";
import EditProfileModal from "../dialogs/EditProfileModal";
import { useState } from "react";
import EmailVerificationDialog from "../dialogs/EmailVerificationDialog";
import { Link } from "react-router-dom";
import { useUserStore } from "../hooks/useUserStore";
import { formatReadableDate, getInitials } from "../../../utils/formats";
import NoCurrentPlan from "../components/NoCurrentPlan";
import { plans } from "../../../utils/globalVariables";
import CheckoutDialog from "../dialogs/CheckoutDialog";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import ManageSubscriptionDialog from "../dialogs/ManageSubscriptionDialog";
import toast from "react-hot-toast";
import AddonsDialog from "../dialogs/AddonsDialog";
import CheckoutAddonsDialog from "../dialogs/CheckoutAddonsDialog";
import { notify } from "../../../store/useNotificationStore";

/**
 * MyAccount (modern / futuristic UI)
 *
 * Keeps original logic (plans, renew, checkout) but upgrades the look and feel.
 */
const MyAccount = () => {
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [emailVerificationOpen, setEmailVerificationOpen] = useState(false);

  const {
    userDetails,
    planDetails,
    isVerified,
    planActive,
    planUsage,
    updatePlanAutoRenewal,
    updateUser,
  } = useUserStore();

  const { id, name, renewalDate, limits, addons } = planDetails || {};

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const [manageSubscriptionOpen, setManageSubscriptionOpen] = useState(false);
  const [addonsCheckoutOpen, setAddonsCheckoutOpen] = useState(false);

  // Keep your pricing logic the same
  const getPrice = (plan) => {
    if (planDetails?.billing === "yearly" && plan?.yearlyPrice) {
      return plan.yearlyPrice;
    }
    return plan?.price ?? 0;
  };

  const renewFn = () => {
    const plan = plans.find((p) => p.id == planDetails.id) || plans[2];
    const data = {
      billing: planDetails.billing,
      plan,
      finalPrice: getPrice(plan),
      addons: planDetails?.addons || {},
    };
    setSelectedPlan(data);
    setCheckoutOpen(true);
  };

  // When user wants to specifically purchase addons we open checkout pre-filled
  const purchaseAddonsFn = () => {
    setAddonsCheckoutOpen(true);
  };

  // friendly safe defaults
  const safeUser = userDetails || {
    fullname: "",
    userId: "",
    email: "",
    userRole: "",
  };

  return (
    <div className="min-h-screen w-full px-3 sm:px-5 py-5 sm:py-10 flex justify-center bg-gradient-to-b from-white to-slate-100/40">
      <div className="w-full max-w-4xl space-y-10 animate-fadeIn">
        {/* Page Head */}
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
            Dashboard — Account
          </h1>
          <p className="text-slate-500 text-sm">
            Manage your profile, subscription & addons
          </p>
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ y: 6, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="group rounded-2xl border border-white/30 shadow-xl bg-white/70 backdrop-blur-2xl py-6 px-3 sm:px-6 transition-all hover:shadow-2xl hover:-translate-y-1"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {getInitials(safeUser.fullname)}
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col items-center sm:items-start">
              <h2 className="text-2xl font-bold text-slate-800 truncate">
                {safeUser.fullname}
              </h2>
              <div className="mt-1 flex flex-col xs:flex-row items-center gap-1 xs:gap-3">
                <p className="text-sm text-slate-500">ID: {safeUser.userId}</p>
                <div className="text-sm text-slate-600">
                  Role:{" "}
                  <span className="font-medium text-indigo-600">
                    {safeUser.userRole}
                  </span>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <button
                  onClick={() => setEditProfileOpen(true)}
                  className="px-4 py-1.5 text-xs font-medium rounded-lg bg-white/70 border border-slate-200 shadow-sm text-slate-700 hover:bg-white transition"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Email Row - inline verify button and icon */}
          <div className="mt-6 flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 w-full min-w-0">
              <div className="flex items-center gap-2 bg-white/90 border border-white/60 rounded-xl p-3 shadow-sm w-full">
                <Mail className="w-5 h-5 text-indigo-600" />
                <div className="flex-1 min-w-0">
                  <div className="text-slate-700 text-sm truncate">
                    {safeUser.email}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    {isVerified ? (
                      <div className="flex items-center gap-1 text-sm text-green-600">
                        <CheckCircle className="w-4 h-4" /> Verified
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-sm text-red-600">
                          <XCircle className="w-4 h-4" /> Not verified
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Move Verify button inline with email */}
                {!isVerified && (
                  <button
                    onClick={() => setEmailVerificationOpen(true)}
                    className="ml-2 px-3 py-1.5 text-xs rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow hover:opacity-90 transition min-w-fit"
                  >
                    Verify
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Plan + Addons Row (grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Plan Card (left big) */}
          <motion.div
            initial={{ y: 6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="col-span-2 rounded-2xl border border-white/30 shadow-xl bg-white/70 backdrop-blur-2xl p-5 space-y-5"
          >
            {/* Header (live) */}
            <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-500 shadow-md">
                  {/* find plan icon by looking up plans array */}
                  {(() => {
                    const planMeta =
                      plans.find((p) => p.id == id) || plans[0] || {};
                    const Icon = planMeta.iconMeta || Sparkles;
                    return <Icon className="w-6 h-6 text-white" />;
                  })()}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800">
                    {name || "No Plan"}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {planActive
                      ? "Active subscription"
                      : "No active subscription"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end xs:flex-row xs:items-center gap-1 xs:gap-3">
                {planDetails?.billing && (
                  <div className="text-sm px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow">
                    {planDetails.billing === "yearly" ? "Yearly" : "Monthly"}
                  </div>
                )}
                <div className="text-xs text-slate-500">
                  {formatReadableDate(renewalDate)}
                </div>
              </div>
            </div>

            {/* Live stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <PlanStat
                icon={<Store className="w-5 h-5" />}
                label="Stores"
                value={`${planUsage?.stores || 0} / ${
                  limits?.stores === -1
                    ? "ထ"
                    : (limits?.stores || 0) + (addons?.stores || 0)
                }`}
              />
              <PlanStat
                icon={<FileText className="w-5 h-5" />}
                label="Pages"
                value={`${planUsage?.pages || 0} / ${
                  limits?.pages === -1
                    ? "ထ"
                    : (limits?.pages || 0) + (addons?.pages || 0)
                }`}
              />
              <PlanStat
                icon={<Package className="w-5 h-5" />}
                label="Products"
                value={`${planUsage?.products || 0} / ${
                  limits?.products === -1
                    ? "ထ"
                    : (limits?.products || 0) + (addons?.products || 0)
                }`}
              />
            </div>

            {/* Description */}
            <div className="text-sm text-slate-600 leading-relaxed">
              <p>
                Your current plan provides{" "}
                <span className="font-medium text-slate-800">
                  {limits?.stores === -1
                    ? "Unlimited"
                    : (limits?.stores || 0) + (addons?.stores || 0)}{" "}
                  stores
                </span>
                ,{" "}
                <span className="font-medium text-slate-800">
                  {limits?.pages === -1
                    ? "Unlimited"
                    : (limits?.pages || 0) + (addons?.pages || 0)}{" "}
                  pages
                </span>
                , and{" "}
                <span className="font-medium text-slate-800">
                  {limits?.products === -1
                    ? "Unlimited"
                    : (limits?.products || 0) + (addons?.products || 0)}{" "}
                  products
                </span>
                .
              </p>
            </div>

            {/* Renewal & CTA row */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* renewal date */}
              {planDetails && (
                <div
                  className={`p-4 rounded-xl ${
                    planActive ? "bg-slate-50" : "bg-red-100"
                  } border text-sm shadow-inner flex items-center gap-4`}
                >
                  <div>
                    <p className="text-slate-600">
                      {planActive ? "Next Renewal" : "Plan Expired"}
                    </p>
                    <p className="font-semibold text-slate-800">
                      {formatReadableDate(renewalDate)}
                    </p>
                  </div>
                  <Sparkles className="w-6 h-6 text-yellow-500" />
                </div>
              )}

              <div className="flex gap-3">
                <Link
                  to="/client/plans"
                  className="inline-block px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:opacity-90 transition-all"
                >
                  {planDetails ? "View Plans & Upgrade" : "Select a plan"}
                </Link>

                {planDetails &&
                  (!planActive ? (
                    <button
                      onClick={renewFn}
                      className="inline-block px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-red-500 to-amber-600 text-white shadow-lg hover:opacity-90 transition-all"
                    >
                      Renew Plan
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setManageSubscriptionOpen(true);
                      }}
                      className="inline-block px-6 py-3 rounded-xl text-sm font-semibold bg-black text-white shadow-lg hover:opacity-90 transition-all"
                    >
                      Manage Subscription
                    </button>
                  ))}
              </div>
            </div>
          </motion.div>

          {/* Right column: Addons + Summary */}
          <motion.div className="rounded-2xl border border-white/30 shadow-xl bg-white/70 backdrop-blur-2xl p-5 space-y-5">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-lg">Add-ons</h4>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">Installed</span>
                <div className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
                  {Object.values(addons || {}).reduce(
                    (s, v) => s + (v || 0),
                    0
                  )}
                </div>
              </div>
            </div>

            {/* Addon List (separated from plan limits) */}
            <div className="space-y-3">
              {addons && Object.keys(addons).length > 0 ? (
                Object.entries(addons).map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-center justify-between p-2 rounded-lg bg-white/30 border border-white/40"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-indigo-600/10">
                        {k === "stores" && (
                          <Store className="w-5 h-5 text-indigo-600" />
                        )}
                        {k === "pages" && (
                          <FileText className="w-5 h-5 text-indigo-600" />
                        )}
                        {k === "products" && (
                          <Package className="w-5 h-5 text-indigo-600" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-800">
                          {k === "products"
                            ? "Extra Products"
                            : k === "stores"
                            ? "Extra Store"
                            : "Extra Page"}
                        </div>
                        <div className="text-xs text-slate-500">
                          {k === "products" ? `${v} products` : `${v} ${k}`}
                        </div>
                      </div>
                    </div>

                    <div className="text-sm font-semibold text-indigo-600">
                      {/* price hint: if you want to show price here, you can compute via getPrice */}
                      {/* placeholder: keep the UI light */}•
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-slate-500 italic">
                  No add-ons installed.
                </div>
              )}
            </div>

            {planActive && (
              <div className="pt-2 border-t border-white/30">
                <button
                  onClick={purchaseAddonsFn}
                  className="mt-2 w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow hover:opacity-95 transition"
                >
                  <ShoppingCart className="w-4 h-4" /> Purchase Addons
                </button>

                <p className="text-xs text-slate-500 mt-3 flex items-start gap-2">
                  <Info className="w-4 h-4 mt-0.5 text-slate-400" />
                  Add-ons are billed on your current billing cycle. You can add
                  multiple quantities of each addon.
                </p>
              </div>
            )}

            {/* Combined Summary */}
            <div className="mt-2 p-3 rounded-lg bg-white/40 border border-white/40">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500">Summary</div>
                  <div className="font-semibold text-slate-800">
                    Limits + Add-ons
                  </div>
                </div>

                <div className="text-sm text-slate-600">
                  <div>
                    Stores:{" "}
                    {(limits?.stores === -1 ? "∞" : limits?.stores || 0) +
                      (addons?.stores || 0)}
                  </div>
                  <div>
                    Pages:{" "}
                    {(limits?.pages === -1 ? "∞" : limits?.pages || 0) +
                      (addons?.pages || 0)}
                  </div>
                  <div>
                    Products:{" "}
                    {(limits?.products === -1 ? "∞" : limits?.products || 0) +
                      (addons?.products || 0)}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Checkout Dialog (unchanged logic) */}
        <CheckoutDialog
          checkoutData={selectedPlan}
          autoRenewalEnabled={planDetails?.autoRenewal || false}
          open={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
          transactionType={"Renewal"}
          onPay={async (data) => {
            if (data) updateUser(data);
            console.log(data);
            setCheckoutOpen(false);
            notify({
              title: "Payment completed",
              message: "Your payment was completed successfully",
              type: "success",
              duration: 3000,
            });
          }}
          onFail={(ref) => {
            console.log(ref);
            notify({
              title: "Payment failed",
              message: "Your payment was not successful, please try again",
              type: "error",
              duration: 3000,
            });
          }}
        />

        {/* Modals */}
        <ManageSubscriptionDialog
          open={manageSubscriptionOpen}
          onClose={() => setManageSubscriptionOpen(false)}
          subscription={{
            planName: name,
            billing: planDetails?.billing,
            expiresAt: renewalDate,
            autoRenewal: planDetails?.autoRenewal,
          }}
          onToggleAutoRenewal={async (data) => {
            console.log(data);
            var res = await updatePlanAutoRenewal();

            if (res.success) {
              toast.success(res.message);
            } else {
              toast.error(res.message, { id: "error1" });
            }
          }}
        />

        <CheckoutAddonsDialog
          open={addonsCheckoutOpen}
          onClose={() => setAddonsCheckoutOpen(false)}
          billing={planDetails?.billing}
          onPay={async (data) => {
            if (data) updateUser(data);
            console.log(data);
            setAddonsCheckoutOpen(false);
            notify({
              title: "Payment completed",
              message: "Your payment was completed successfully",
              type: "success",
              duration: 3000,
            });
          }}
          onFail={(ref) => {
            console.log(ref);
            notify({
              title: "Payment failed",
              message: "Your payment was not successful, please try again",
              type: "error",
              duration: 3000,
            });
          }}
        />

        <EditProfileModal
          isOpen={editProfileOpen}
          onClose={() => setEditProfileOpen(false)}
          user={userDetails}
        />
        <EmailVerificationDialog
          isOpen={emailVerificationOpen}
          onClose={() => setEmailVerificationOpen(false)}
          email={userDetails?.email}
        />
      </div>
    </div>
  );
};

const PlanStat = ({ label, value, icon }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="rounded-xl bg-white/85 backdrop-blur-sm border border-white/60 shadow p-4 flex flex-col items-center gap-2 transition-all"
  >
    <div className="text-indigo-600">{icon}</div>
    <span className="text-slate-500 text-sm">{label}</span>
    <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
      {value}
    </span>
  </motion.div>
);

// const getNextPlan = (id) => {
//   if (!id) return plans[0];
//   const plan = plans.findIndex((p) => p.id == id);
//   if (plan == -1) return plans[0];
//   else if (plan < plans.length - 1) return plans[plan + 1];
//   else return plans[plan];
// };

export default MyAccount;
