import { Check, Rocket } from "lucide-react";

const ActivePlanCard = ({upgradeFn}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-xl shadow-lg p-6">
      {/* Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 via-indigo-500/10 to-purple-500/20 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 mb-5">
        <div className="flex items-center gap-2 mb-1">
          <Rocket className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Active Plan</h2>
        </div>

        <p className="text-3xl font-semibold text-gray-900">Pro Plan</p>
        <p className="text-gray-600 mt-1 text-sm">₦12,500 / month</p>
      </div>

      {/* Features */}
      <div className="relative z-10 space-y-3 mb-6">
        <h3 className="text-sm font-semibold text-gray-700">
          What you’re getting:
        </h3>

        <ul className="space-y-2">
          {[
            "Unlimited product uploads",
            "Priority customer support",
            "Analytics dashboard",
            "Multi-device access",
          ].map((feature, i) => (
            <li key={i} className="flex items-center gap-3 text-gray-700">
              <Check className="w-4 h-4 text-blue-600" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Renewal Badge */}
      <div className="relative z-10 p-3 rounded-xl bg-gray-50 border mb-6">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-800">Next Renewal:</span>{" "}
          March 28, 2025
        </p>
      </div>

      {/* Upgrade Button */}
      <button
      onClick={upgradeFn}
        className="relative z-10 w-full py-4 text-base font-semibold rounded-xl 
                   bg-gradient-to-r from-blue-600 to-indigo-600 text-white 
                   hover:from-blue-700 hover:to-indigo-700 
                   shadow-md transition-all"
      >
        Upgrade Plan
      </button>
    </div>
  );
};

export default ActivePlanCard;
