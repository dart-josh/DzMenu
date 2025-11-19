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
import { useState } from "react";
import EmailVerificationDialog from "../dialogs/EmailVerificationDialog";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import { getInitials } from "../../../utils/formats";
import NoCurrentPlan from "../components/NoCurrentPlan";

const MyAccount = () => {
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [emailVerificationOpen, setEmailVerificationOpen] = useState(false);

  const { userDetails, planDetails, isVerified } = useUserStore();

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
                  <p className="text-sm text-slate-500 mt-1">
                    Your active subscription details
                  </p>
                </div>
                <span className="min-w-fit px-3 py-1.5 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold shadow">
                  Enterprise
                </span>
              </div>

              {/* Expanded Plan Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <PlanStat
                  icon={<Store className="w-5 h-5" />}
                  label="Stores"
                  value="1 / 4"
                />
                <PlanStat
                  icon={<FileText className="w-5 h-5" />}
                  label="Pages"
                  value="1 / 5"
                />
                <PlanStat
                  icon={<Package className="w-5 h-5" />}
                  label="Products"
                  value="1 / 100"
                />
              </div>

              {/* More Details */}
              <div className="space-y-2">
                <p className="text-sm text-slate-600 leading-relaxed">
                  Your current plan allows you to create up to{" "}
                  <span className="font-medium text-slate-700">4 stores</span>,
                  <span className="font-medium text-slate-700"> 5 pages</span>,
                  and
                  <span className="font-medium text-slate-700">
                    {" "}
                    100 products
                  </span>
                  . Upgrade your plan to unlock advanced features, higher
                  limits, and premium tools.
                </p>

                {/* Renewal */}
                <div className="mt-4 p-4 rounded-xl bg-slate-50 border text-sm shadow-inner flex items-center justify-between">
                  <div>
                    <p className="text-slate-600">Next Renewal</p>
                    <p className="font-semibold text-slate-800">
                      March 28, 2025
                    </p>
                  </div>
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                </div>

                {/* Recommended Next Plan */}
                <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">
                      Recommended Next Plan
                    </p>
                    <p className="font-semibold text-indigo-700">Pro Plan</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-indigo-600" />
                </div>
              </div>

              {/* CTA */}
              <Link
                to="/client/plans"
                className="mt-4 inline-block px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all"
              >
                View Plans & Upgrade
              </Link>
            </>
          )) || <NoCurrentPlan />}
        </div>
      </div>

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

export default MyAccount;
