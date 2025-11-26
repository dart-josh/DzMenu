import {
  Mail,
  CheckCircle,
  XCircle,
  Store,
  FileText,
  Package,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import EditProfileModal from "../dialogs/EditProfileModal";
import { useEffect, useState } from "react";
import EmailVerificationDialog from "../dialogs/EmailVerificationDialog";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import { formatReadableDate, getInitials } from "../../../utils/formats";
import NoCurrentPlan from "../components/NoCurrentPlan";
import { plans } from "../../../utils/globalVariables";
import { getRenewalDate, replaceUnlimited } from "../../../utils/generalFns";
import CheckoutDialog from "../dialogs/CheckoutDialog";

const MyAccount = () => {
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [emailVerificationOpen, setEmailVerificationOpen] = useState(false);

  const {
    userDetails,
    planDetails,
    isVerified,
    planActive,
    updatePlan,
    planUsage,
  } = useUserStore();
  const { id, name, renewalDate, limits, addons } = planDetails || {};

  const [nextPlan, setNextPlan] = useState(getNextPlan(id));

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const getPrice = (plan) => {
    if (planDetails.billing === "yearly" && plan.yearlyPrice) {
      return plan.yearlyPrice;
    }
    return plan.price;
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

  useEffect(() => {
    setNextPlan(getNextPlan(id));
  }, [id]);

  console.log(planDetails)

  return (
    <div className="min-h-screen w-full px-3 sm:px-5 py-5 sm:py-10 flex justify-center bg-gradient-to-b from-white to-slate-100/40">
      <div className="w-full max-w-4xl space-y-10 animate-fadeIn">
        {/* Small Page Info */}
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
            User Profile
          </h1>
          <p className="text-slate-500 text-sm">
            Manage your profile, plan & identity
          </p>
        </div>

        {/* PROFILE CARD */}
        <div className="group rounded-2xl border border-white/40 shadow-xl bg-white/70 backdrop-blur-2xl py-6 px-3 sm:px-6 transition-all hover:shadow-2xl hover:-translate-y-1">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="size-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {getInitials(userDetails.fullname)}
            </div>

            {/* Info */}
            <div className="space-y-1 flex flex-col items-center sm:items-start max-w-fit">
              <h2 className="text-2xl font-bold text-slate-800">
                {userDetails.fullname}
              </h2>
              <p className="text-sm text-slate-500">ID: {userDetails.userId}</p>

              <p className="text-sm text-slate-600">
                Role:{" "}
                <span className="font-medium text-indigo-600">
                  {userDetails.userRole}
                </span>
              </p>

              <button
                onClick={() => setEditProfileOpen(true)}
                className="mt-2 px-4 py-1.5 text-xs font-medium rounded-lg bg-white/70 border border-slate-200 shadow-sm text-slate-700 hover:bg-white transition"
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* Email Section */}
          <div className="mt-6 flex items-center justify-between bg-white/90 border gap-2 border-white/60 shadow-sm rounded-xl p-3 sm:p-4 w-full">
            <div className="flex items-center gap-1.5 sm:gap-3 w-full min-w-0">
              <div>
                <Mail className="size-4 sm:size-5 text-indigo-600" />
              </div>
              <span className="text-slate-700 text-sm truncate">
                {userDetails.email}
              </span>

              <div>
                {isVerified ? (
                  <CheckCircle className="size-4 text-green-500" />
                ) : (
                  <XCircle className="size-4 text-red-500" />
                )}
              </div>
            </div>

            {!isVerified && (
              <button
                onClick={() => setEmailVerificationOpen(true)}
                className="px-3 py-1.5 text-xs rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow hover:opacity-90 transition min-w-fit"
              >
                <span>Verify</span>
                <span className="hidden sm:flex"> Email</span>
              </button>
            )}
          </div>
        </div>

        {/* CURRENT PLAN CARD (Upgraded) */}
        <div className="rounded-2xl border border-white/40 shadow-xl bg-white/70 backdrop-blur-2xl py-5 sm:py-7 px-3 sm:px-7 space-y-8 hover:shadow-2xl transition-all hover:-translate-y-1">
          {(planDetails && (
            <>
              {/* Header */}
              <div className="flex gap-1 items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">
                    Current Plan
                  </h3>
                  <p
                    className={`text-sm ${
                      planActive ? "text-slate-500" : "text-red-500"
                    } mt-1`}
                  >
                    {planActive
                      ? "Your active subscription details"
                      : "Your current plan has expired!"}
                  </p>
                </div>
                <span className="min-w-fit px-3 py-1.5 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold shadow">
                  {name}
                </span>
              </div>

              {/* Expanded Plan Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <PlanStat
                  icon={<Store className="w-5 h-5" />}
                  label="Stores"
                  value={`${planUsage?.stores || 0} / ${
                    limits?.stores == -1 ? "ထ" : limits?.stores + addons?.stores
                  }`}
                />
                <PlanStat
                  icon={<FileText className="w-5 h-5" />}
                  label="Pages"
                  value={`${planUsage?.pages || 0} / ${
                    limits?.pages == -1 ? "ထ" : limits?.pages + addons?.pages
                  }`}
                />
                <PlanStat
                  icon={<Package className="w-5 h-5" />}
                  label="Products"
                  value={`${planUsage?.products || 0} / ${
                    limits?.products == -1
                      ? "ထ"
                      : limits?.products + addons?.products
                  }`}
                />
              </div>

              {/* More Details */}
              <div className="space-y-2">
                <p className="text-sm text-slate-600 leading-relaxed">
                  Your current plan allows you to create{" "}
                  {limits?.stores == -1 ? "" : "up to"}{" "}
                  <span className="font-medium text-slate-700">
                    {limits?.stores == -1
                      ? "Unlimited"
                      : limits?.stores + addons?.stores}{" "}
                    stores
                  </span>
                  ,
                  <span className="font-medium text-slate-700">
                    {" "}
                    {limits?.pages == -1
                      ? "Unlimited"
                      : limits?.pages + addons?.pages}{" "}
                    pages
                  </span>
                  , and
                  <span className="font-medium text-slate-700">
                    {" "}
                    {limits?.products == -1
                      ? "Unlimited"
                      : limits?.products + addons?.products}{" "}
                    products
                  </span>
                  .{" "}
                  {id == "elite"
                    ? "You are currently on the highest plan with all limits & features unlocked"
                    : "Upgrade your plan to unlock advanced features, higher limits, and premium tools"}
                  .
                </p>

                {/* Renewal */}
                <div
                  className={`mt-4 p-4 rounded-xl ${
                    planActive ? "bg-slate-50" : "bg-red-100"
                  } border text-sm shadow-inner flex items-center justify-between`}
                >
                  <div>
                    <p className="text-slate-600">
                      {planActive ? "Next Renewal" : "Plan Expired"}
                    </p>
                    <p className="font-semibold text-slate-800">
                      {formatReadableDate(renewalDate)}
                    </p>
                  </div>
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                </div>

                {/* Recommended Next Plan */}
                {id && nextPlan.id != id && (
                  <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">
                        Recommended Next Plan
                      </p>
                      <p className="font-semibold text-indigo-700">
                        {nextPlan.name} Plan
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-indigo-600" />
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="mt-4 flex gap-5 flex-col xs:flex-row">
                <Link
                  to="/client/plans"
                  className="inline-block px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all"
                >
                  View Plans & Upgrade
                </Link>

                {!planActive && (
                  <div
                    onClick={renewFn}
                    className="cursor-pointer inline-block px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-red-500 to-amber-600 text-white shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all"
                  >
                    Renew Plan
                  </div>
                )}
              </div>
            </>
          )) || <NoCurrentPlan />}
        </div>
      </div>

      <CheckoutDialog
        checkoutData={selectedPlan}
        autoRenewalEnabled={planDetails?.autoRenewal || false}
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onPayment={async (data) => {
          // update plan
          const planDetails = {
            id: data.plan.id,
            name: data.plan.name,
            limits: replaceUnlimited(data.plan.limits, -1),
            addons: data.addons,
            billing: data.billing,
            renewalDate: getRenewalDate(new Date(), data.billing),
            autoRenewal: data.autoRenewal,
          };
          const res = await updatePlan({ planDetails });
          if (res.success) {
            setCheckoutOpen(false);
          }
          console.log(res);

          // save transaction
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
        email={userDetails.email}
      />
    </div>
  );
};

const PlanStat = ({ label, value, icon }) => (
  <div className="rounded-xl bg-white/85 backdrop-blur-sm border border-white/60 shadow p-4 flex flex-col items-center gap-2 transition-all hover:shadow-lg hover:-translate-y-1">
    <div className="text-indigo-600">{icon}</div>
    <span className="text-slate-500 text-sm">{label}</span>
    <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
      {value}
    </span>
  </div>
);

const getNextPlan = (id) => {
  if (!id) return plans[0];
  const plan = plans.findIndex((p) => p.id == id);
  if (plan == -1) return plans[0];
  else if (plan < plans.length - 1) return plans[plan + 1];
  else return plans[plan];
};

export default MyAccount;
