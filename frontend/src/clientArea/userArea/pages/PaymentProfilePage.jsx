// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  CreditCard,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Repeat,
  PackagePlus,
  FileQuestion,
} from "lucide-react";
import { useUserStore } from "../hooks/useUserStore";
import {
  capitalizeFirst,
  formatNumber,
  formatReadableDate,
} from "../../../utils/formats";
import { nairaSign } from "../../../utils/globalVariables";

export default function PaymentProfile() {
  const { paymentHistory, pendingPayments } = useUserStore();

  

  return (
    <div className="w-full max-w-5xl mx-auto p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <h1 className="text-4xl font-bold tracking-tight">Payment Profile</h1>
        <CreditCard className="w-8 h-8 text-blue-600" />
      </motion.div>

      {/* No Outstanding Payments */}
      {(pendingPayments.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/60 backdrop-blur-xl border border-blue-100 shadow-xl rounded-2xl p-6"
        >
          <h2 className="text-2xl font-semibold mb-4">Pending Payments</h2>

          <div className="space-y-4">
            {pendingPayments.map((item, index) => (
              <PaymentTile item={item} index={index} key={index} />
            ))}{" "}
          </div>
        </motion.div>
      )) || (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/60 backdrop-blur-xl border border-blue-100 shadow-lg rounded-2xl p-6 flex items-center gap-4"
        >
          <div className="bg-green-100 p-3 rounded-full">
            <CheckCircle2 className="w-7 h-7 text-green-600" />
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-800">
              No Outstanding Payments
            </p>
            <p className="text-gray-500 text-sm">
              You're fully up to date on all invoices.
            </p>
          </div>
        </motion.div>
      )}

      {/* Payment History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/60 backdrop-blur-xl border border-blue-100 shadow-xl rounded-2xl p-6"
      >
        <h2 className="text-2xl font-semibold mb-4">Payment History</h2>

        <div className="space-y-4">
          {(paymentHistory.length &&
            paymentHistory.map((item, index) => (
              <PaymentTile item={item} index={index} key={index} />
            ))) || <NoPaymentYet />}
        </div>
      </motion.div>
    </div>
  );
}

const NoPaymentYet = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col items-center justify-center py-16 px-6"
    >
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 shadow-sm rounded-2xl p-6 flex flex-col items-center gap-3 max-w-sm">
        <div className="p-3 rounded-xl bg-white shadow-sm">
          <FileQuestion className="w-8 h-8 text-blue-600" />
        </div>

        <h2 className="text-xl font-semibold text-slate-800">No Payment Yet</h2>

        <p className="text-slate-600 text-center text-sm leading-relaxed">
          You haven't made any payments yet. Once you do, your payment history
          will appear here.
        </p>
      </div>
    </motion.div>
  );
};

const PaymentTile = ({ item, index }) => {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      className="flex items-center justify-between p-5 border rounded-xl bg-white/70 hover:shadow-md hover:bg-white transition cursor-pointer"
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        <div className="bg-blue-50 p-3 rounded-xl shadow-sm">
          {getIconType(item.transactionType)}
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-gray-800 text-lg">
            {getTitle(item.transactionType)}
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />{" "}
            {formatReadableDate(item.createdAt) || "---"}
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="text-right">
        <p className="font-bold text-gray-900 text-lg">
          {nairaSign}
          {formatNumber(item.amount)}
        </p>
        <p
          className={`${
            item.status == "completed"
              ? "text-green-600"
              : item.status == "paid"
              ? "text-blue-600"
              : "text-red-600"
          } text-sm font-medium`}
        >
          {capitalizeFirst(item.status) || "Pending"}
        </p>
      </div>
    </motion.div>
  );
};

const getIconType = (type) => {
  switch (type) {
    case "Subscription":
      return <CreditCard className="w-5 h-5 text-green-500" />;
    case "Renewal":
      return <Repeat className="w-5 h-5 text-blue-500" />;
    case "Upgrade":
      return <ArrowUpRight className="w-5 h-5 text-purple-500" />;
    case "Addons":
      return <PackagePlus className="w-5 h-5 text-blue-600" />;

    default:
      return <CreditCard className="w-5 h-5 text-gray-500" />;
  }
};

const getTitle = (type) => {
  switch (type) {
    case "Subscription":
      return "New Subscription";
    case "Renewal":
      return "Subscription Renewal";
    case "Upgrade":
      return "Plan Upgrade";
    case "Addons":
      return "Addons Purchase";
    default:
      return "New Payment";
  }
};
