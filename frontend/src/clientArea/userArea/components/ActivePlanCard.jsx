import { Check, Rocket } from "lucide-react";
import { useUserStore } from "../store/useUserStore";
import { addonsList, plans } from "../../../utils/globalVariables";
import { formatNumber, formatReadableDate } from "../../../utils/formats";

const ActivePlanCard = ({ upgradeFn }) => {
  const { activePlan, planDetails } = useUserStore();
  if (!activePlan || !planDetails) return null;

  const { id, name, billing, renewalDate, limits, addons } = planDetails;

  function getTotalAddonsPrice(selected, billing = "monthly") {
    let total = 0;

    for (const key in selected) {
      const addon = addonsList.find((a) => a.id === key);
      if (!addon) continue;

      let qty = selected[key];

      // products must be converted into 200-packs
      if (key === "products") {
        qty = qty / 200;
      }

      const price = billing === "yearly" ? addon.yearlyPrice : addon.price;

      total += price * qty;
    }

    return total;
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-xl shadow-lg p-6">
      {/* Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 via-indigo-500/10 to-purple-500/20 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 mb-5">
        <div className="flex items-center gap-2 mb-1">
          {getPlanIcon(id)}
          <h2 className="text-xl font-bold text-gray-900">Active Plan</h2>
        </div>

        <p className="text-3xl font-semibold text-gray-900">{name || ""}</p>
        <p className="text-gray-600 mt-1 text-sm">
          {getPlanPrice(id, billing)} /{" "}
          {billing == "monthly" ? "month" : "year"}
        </p>

        {addons && getTotalAddonsPrice(addons, billing) != 0 && (
          <>
            <p className="text-gray-600 mt-1 text-sm">
              {formatNumber(getTotalAddonsPrice(addons, billing), true)} /{" "}
              {billing == "monthly" ? "month" : "year"} - Addons
            </p>
          </>
        )}
      </div>

      {/* Features */}
      <div className="relative z-10 space-y-3 mb-6">
        <h3 className="text-sm font-semibold text-gray-700">
          What you’re getting:
        </h3>

        <ul className="space-y-2">
          {[
            `${
              limits?.stores + addons?.stores == 1
                ? "Own & manage one store"
                : "Own & manage multiple stores"
            }`,
            `${
              limits?.products == -1
                ? "Unlimited"
                : limits?.products + addons?.products
            } product uploads`,
            `${
              limits?.pages == -1 ? "Unlimited" : limits?.pages + addons?.pages
            } editable pages`,
            "Priority customer support",
            "In-app messaging Assistant",
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
          {formatReadableDate(renewalDate)}
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

const getPlanPrice = (id, billing) => {
  const m_price = plans.find((p) => p.id == id)?.price || 0;
  const y_price = plans.find((p) => p.id == id)?.yearlyPrice || 0;

  if (billing == "monthly") return formatNumber(m_price, true);
  else return formatNumber(y_price, true);
};

const getPlanIcon = (id) => {
  return (
    plans.find((p) => p.id == id)?.icon || (
      <Rocket className="w-5 h-5 text-blue-600" />
    )
  );
};

export default ActivePlanCard;
