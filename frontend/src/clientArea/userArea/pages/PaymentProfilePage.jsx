// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { CreditCard, CheckCircle2, Clock, ArrowUpRight, Repeat } from "lucide-react";

export default function PaymentProfile() {
  const history = [
    {
      id: 1,
      title: "Subscription Renewal",
      date: "Jan 4, 2025",
      amount: "$29.99",
      icon: <Repeat className="w-5 h-5 text-blue-500" />,
    },
    {
      id: 2,
      title: "Plan Upgrade",
      date: "Dec 21, 2024",
      amount: "$14.00",
      icon: <ArrowUpRight className="w-5 h-5 text-purple-500" />,
    },
    {
      id: 3,
      title: "New Subscription",
      date: "Nov 12, 2024",
      amount: "$29.99",
      icon: <CreditCard className="w-5 h-5 text-green-500" />,
    },
  ];

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
          <p className="text-xl font-semibold text-gray-800">No Outstanding Payments</p>
          <p className="text-gray-500 text-sm">You're fully up to date on all invoices.</p>
        </div>
      </motion.div>

      {/* Payment History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/60 backdrop-blur-xl border border-blue-100 shadow-xl rounded-2xl p-6"
      >
        <h2 className="text-2xl font-semibold mb-4">Payment History</h2>

        <div className="space-y-4">
          {history.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex items-center justify-between p-5 border rounded-xl bg-white/70 hover:shadow-md hover:bg-white transition cursor-pointer"
            >
              {/* Left */}
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 p-3 rounded-xl shadow-sm">{item.icon}</div>
                <div className="space-y-1">
                  <p className="font-semibold text-gray-800 text-lg">{item.title}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" /> {item.date}
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="text-right">
                <p className="font-bold text-gray-900 text-lg">{item.amount}</p>
                <p className="text-green-600 text-sm font-medium">Completed</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
