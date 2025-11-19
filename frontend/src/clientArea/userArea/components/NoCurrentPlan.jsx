import { Sparkles, PackageSearch, ArrowRight, Layers } from "lucide-react";
import { Link } from "react-router-dom";

const NoCurrentPlan = () => {
  return (
    <div className="w-full px-3 sm:px-6 py-4 sm:py-6 rounded-2xl bg-gradient-to-br from-slate-50 to-white border shadow-lg text-center space-y-6 animate-fadeIn">
      
      {/* Icon Section */}
      <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-xl shadow-indigo-300/40">
        <PackageSearch className="w-10 h-10 text-white" />
      </div>

      {/* Header */}
      <div>
        <h3 className="text-2xl font-bold text-slate-800">No Active Plan</h3>
        <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
          You currently don't have any subscription plan.  
          Choose a plan to unlock advanced tools, increased limits, and premium features for your business.
        </p>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        <div className="p-4 bg-white border rounded-xl shadow flex flex-col items-center text-sm">
          <Layers className="w-6 h-6 text-indigo-600 mb-2" />
          <p className="font-semibold text-slate-700">Unlock Features</p>
          <p className="text-xs text-slate-500 mt-1 text-center">
            Access advanced tools to grow your business.
          </p>
        </div>

        <div className="p-4 bg-white border rounded-xl shadow flex flex-col items-center text-sm">
          <Sparkles className="w-6 h-6 text-yellow-500 mb-2" />
          <p className="font-semibold text-slate-700">Boost Capacity</p>
          <p className="text-xs text-slate-500 mt-1 text-center">
            Increase product, store, and page limits instantly.
          </p>
        </div>

        <div className="p-4 bg-white border rounded-xl shadow flex flex-col items-center text-sm">
          <ArrowRight className="w-6 h-6 text-blue-600 mb-2" />
          <p className="font-semibold text-slate-700">Scale Faster</p>
          <p className="text-xs text-slate-500 mt-1 text-center">
            Move to the next level with powerful premium tools.
          </p>
        </div>
      </div>

      {/* CTA */}
      <Link
        to="/client/plans"
        className="block w-full sm:w-auto mx-auto px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all"
      >
        View Plans & Subscribe
      </Link>
    </div>
  );
};

export default NoCurrentPlan;
