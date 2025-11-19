import { CheckCircle, Plus } from "lucide-react";
import { plans } from "../../../utils/globalVariables.jsx";
import { useUserStore } from "../store/useUserStore";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import UpgradePlanDialog from "../dialogs/UpgradePlanDialog";
import CheckoutDialog from "../dialogs/CheckoutDialog";
import ConfirmUpgradeDialog from "../dialogs/ConfirmUpgradeDialog";
import ActivePlanCard from "../components/ActivePlanCard";

export default function PlansPage() {
  const { activePlan } = useUserStore();

  const [billing, setBilling] = useState("monthly");

  // Update price display based on billing
  const getPrice = (plan) => {
    if (billing === "yearly" && plan.yearlyPrice) {
      return plan.yearlyPrice;
    }
    return plan.price;
  };

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [confirmUpgradeOpen, setConfirmUpgradeOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 flex flex-col items-center px-2 sm:px-4 py-12">
      {/* Initialize accent colors for Tailwind */}
      <div className="hidden bg-purple-600 hover:bg-purple-700 bg-purple-500"></div>
      <div className="hidden bg-blue-600 hover:bg-blue-700 bg-blue-500"></div>
      <div className="hidden bg-amber-600 hover:bg-amber-700 bg-amber-500"></div>
      <div className="hidden bg-cyan-600 hover:bg-cyan-700 bg-cyan-500"></div>

      {/* Header */}
      <div className="max-w-3xl text-center mb-10">
        <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-gray-100 tracking-tight">
          Choose the Perfect Plan
        </h1>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
          Plans designed for every business — restaurants, boutiques, lounges,
          supermarkets, art galleries, and multi-category brands. Scale your
          stores, pages, and products with flexible pricing.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex items-center gap-3 mb-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 shadow">
        <button
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
            billing === "monthly"
              ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
              : "text-gray-600 dark:text-gray-300"
          }`}
          onClick={() => setBilling("monthly")}
        >
          Monthly
        </button>
        <button
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
            billing === "yearly"
              ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
              : "text-gray-600 dark:text-gray-300"
          }`}
          onClick={() => setBilling("yearly")}
        >
          Yearly{" "}
          <span className="text-green-600 font-semibold">(Save 20%)</span>
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-6 w-full max-w-7xl">
        <ActivePlanCard
          upgradeFn={() => {
            setUpgradeOpen(true);
          }}
        />
        {plans.map((plan, index) => (
          <PlanTile
            plan={plan}
            activePlan={activePlan}
            getPrice={getPrice}
            setCheckoutOpen={setCheckoutOpen}
            index={index}
            key={index}
          />
        ))}
      </div>

      {/* Comparison Table */}
      <ComparisonTable plans={plans} />

      <UpgradePlanDialog
        open={upgradeOpen}
        currentPlan={"Basic"}
        onClose={() => setUpgradeOpen(false)}
        onUpgrade={(plan) => {
          const data = {
            billing: plan.billingCycle,
            plan: plan.plan,
            finalPrice: plan.finalPrice,
            addons: {},
          };
          setUpgradeOpen(false);
          setSelectedPlan(data);
          setConfirmUpgradeOpen(true);
        }}
      />

      <ConfirmUpgradeDialog
        upgradeData={selectedPlan}
        open={confirmUpgradeOpen}
        onClose={() => setConfirmUpgradeOpen(false)}
        onConfirm={(upgradeData) => {
          setConfirmUpgradeOpen(false);
          console.log(upgradeData);
          setCheckoutOpen(true);
        }}
      />

      <CheckoutDialog
        checkoutData={selectedPlan}
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onPayment={() => {}}
      />
    </div>
  );
}

/* ------------------------ COMPONENTS ------------------------- */

const PlanTile = ({ plan, activePlan, getPrice, setCheckoutOpen, index }) => {
  return (
    <motion.div
      key={plan.id}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 
              hover:shadow-xl transition-all py-5 sm:py-6 px-3 sm:px-6 flex flex-col overflow-hidden"
    >
      {/* Accent Glow */}
      {activePlan === plan.id && (
        <div
          className={`absolute inset-0 opacity-20 blur-3xl bg-${plan.accent}-500`}
        />
      )}

      {/* Most Popular Tag */}
      {plan.mostPopular && (
        <div className="absolute top-3 right-3 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
          MOST POPULAR
        </div>
      )}

      {/* Header */}
      <div className="relative z-10 flex items-center gap-3 mb-4">
        {plan.icon}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {plan.name}
        </h2>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6 relative z-10">
        {plan.tagline}
      </p>

      {/* Limits */}
      <div className="relative z-10 space-y-3 mb-6">
        <PlanLimit label="Stores" value={plan.limits.stores} />
        <PlanLimit label="Pages" value={plan.limits.pages} />
        <PlanLimit label="Products" value={plan.limits.products} />
      </div>

      {/* Add-ons */}
      <div className="relative z-10 mb-6">
        <h4 className="font-medium text-gray-900 dark:text-gray-200 mb-3 flex items-center gap-2">
          <Plus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          Add-ons
        </h4>

        <div className="space-y-2">
          {plan.addons.map((addon, index) => (
            <div
              key={index}
              className="flex justify-between text-sm text-gray-700 dark:text-gray-300 py-1"
            >
              <span>{addon.label}</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {addon.price}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="relative z-10 mt-auto">
        <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {getPrice(plan)}
        </p>

        <button
          onClick={() => {
            setCheckoutOpen(true);
          }}
          disabled={activePlan === plan.id}
          className={`w-full py-3 rounded-xl ${
            activePlan === plan.id
              ? "bg-gray-700/60 dark:bg-gray-600 cursor-not-allowed"
              : `bg-${plan.accent}-600 hover:bg-${plan.accent}-700 cursor-pointer`
          }  
                text-white font-semibold transition-all shadow`}
        >
          {activePlan === plan.id ? "Current Plan" : "Get Started"}
        </button>
      </div>
    </motion.div>
  );
};

function PlanLimit({ label, value }) {
  return (
    <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg px-1.5 sm:px-3 py-2 border border-gray-200 dark:border-gray-600">
      <span className="text-gray-700 dark:text-gray-300 font-medium">
        {label}
      </span>
      <div className="flex items-center gap-1 sm:gap-2">
        <CheckCircle className="size-4 sm:size-5 text-green-500" />
        <span className="text-gray-900 dark:text-gray-100 font-semibold">
          {value}
        </span>
      </div>
    </div>
  );
}

const ComparisonTable = ({ plans }) => {
  return (
    <div className="mt-16 w-full max-w-5xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow">
      <h3 className="text-xl font-semibold p-6 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
        Compare Plans
      </h3>

      <div className="overflow-auto">
        <table className="w-full min-w-[700px] text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700/40">
              <th className="p-4 text-left text-gray-800 dark:text-gray-200">
                Feature
              </th>
              {plans.map((p) => (
                <th
                  key={p.id}
                  className="p-4 text-center text-gray-800 dark:text-gray-200"
                >
                  {p.name}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <ComparisonRow
              label="Stores"
              values={plans.map((p) => p.limits.stores)}
            />
            <ComparisonRow
              label="Pages"
              values={plans.map((p) => p.limits.pages)}
            />
            <ComparisonRow
              label="Products"
              values={plans.map((p) => p.limits.products)}
            />
            <ComparisonRow
              label="Support"
              values={plans.map((p) => p.support || "Standard")}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

function ComparisonRow({ label, values }) {
  return (
    <tr className="border-t border-gray-200 dark:border-gray-700">
      <td className="p-4 font-medium text-gray-700 dark:text-gray-300">
        {label}
      </td>
      {values.map((val, i) => (
        <td
          key={i}
          className="p-4 text-center text-gray-900 dark:text-gray-100"
        >
          {val}
        </td>
      ))}
    </tr>
  );
}
