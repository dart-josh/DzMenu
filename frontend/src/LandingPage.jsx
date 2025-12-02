// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ArrowRight, Users, Clock, Rocket, Sparkles } from "lucide-react";

export default function DzVistaLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative py-24 px-6 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            DzVista — A New Era of Digital Experience
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">
            The ultimate multi‑service platform designed to power your digital identity, online store, analytics, automation and more — all in one futuristic ecosystem.
            Experience the next-generation of online presence management.
          </p>

          {/* Coming Soon Badge */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-block px-4 py-2 text-sm font-medium bg-blue-600/20 text-blue-300 rounded-full border border-blue-500/40 backdrop-blur-md"
          >
            🚀 Launching Soon — Join the Waitlist
          </motion.span>

          {/* CTA Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#waitlist"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/20 font-semibold flex items-center gap-2"
            >
              Join Waitlist <Sparkles size={18} />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="/client/dashboard"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 font-semibold flex items-center gap-2"
            >
              Go to Client Area <ArrowRight size={18} />
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Live Stats Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 px-6 py-12">
        {[ 
          { label: "Users on Waitlist", value: "12,483", icon: Users },
          { label: "Hours Until Launch", value: "312", icon: Clock },
          { label: "Platform Modules", value: "27+", icon: Rocket } 
        ].map(({ label, value, icon: Icon }, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-xl shadow-xl"
          >
            <Icon className="mx-auto mb-3 text-blue-400" size={32} />
            <div className="text-3xl font-bold text-white">{value}</div>
            <p className="text-slate-400 text-sm mt-1">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* About the Platform */}
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold text-center"
        >
          What Is DzVista?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-slate-300 text-lg leading-relaxed text-center max-w-3xl mx-auto"
        >
          DzVista is a powerful digital ecosystem designed to simplify and elevate how individuals and businesses operate online. From hosting your digital identity to managing e‑commerce, automation, analytics, user profile systems, and advanced integrations — DzVista brings everything together in a seamless futuristic interface.
        </motion.p>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[ 
            "AI‑Enhanced Storefront Builder",
            "Smart Automation Engine",
            "Unified User & Team Management",
            "Integrated Payment Processing",
            "Insightful Analytics Dashboard",
            "Customizable Digital Identity Layers",
            "Plugin System for Addons",
            "Fast Cloud Performance",
            "Enterprise‑grade Security"
          ].map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-slate-200"
            >
              {text}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Waitlist Section */}
      <div id="waitlist" className="max-w-xl mx-auto px-6 py-16 text-center">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-4"
        >
          Join the Waitlist
        </motion.h3>

        <p className="text-slate-300 mb-6">
          Be among the first to experience the DzVista platform. Enter your email below.
        </p>

        <form className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold shadow-lg shadow-blue-600/20"
          >
            Join
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="text-center text-slate-500 py-10 text-sm">
        © {new Date().getFullYear()} DzVista — All Rights Reserved
      </div>
    </div>
  );
}
