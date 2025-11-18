// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { User, Mail, Lock, Trash2, ShieldOff, Database } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="w-full max-w-5xl mx-auto p-6 space-y-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
        <User className="w-8 h-8 text-blue-600" />
      </motion.div>

      {/* Profile Settings */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/60 backdrop-blur-xl border border-blue-100 shadow-xl rounded-2xl p-6 space-y-6"
      >
        <h2 className="text-2xl font-semibold mb-2">Profile Settings</h2>

        {/* Edit Profile */}
        <div className="p-4 bg-white/70 border rounded-xl flex items-center justify-between hover:bg-white transition cursor-pointer">
          <div className="flex items-center gap-3">
            <User className="w-6 h-6 text-blue-500" />
            <div>
              <p className="font-semibold text-gray-800 text-lg">Edit Profile</p>
              <p className="text-gray-500 text-sm">Update your personal information</p>
            </div>
          </div>
        </div>

        {/* Change Email */}
        <div className="p-4 bg-white/70 border rounded-xl flex items-center justify-between hover:bg-white transition cursor-pointer">
          <div className="flex items-center gap-3">
            <Mail className="w-6 h-6 text-purple-500" />
            <div>
              <p className="font-semibold text-gray-800 text-lg">Change Email</p>
              <p className="text-gray-500 text-sm">Update your account email address</p>
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="p-4 bg-white/70 border rounded-xl flex items-center justify-between hover:bg-white transition cursor-pointer">
          <div className="flex items-center gap-3">
            <Lock className="w-6 h-6 text-green-500" />
            <div>
              <p className="font-semibold text-gray-800 text-lg">Change Password</p>
              <p className="text-gray-500 text-sm">Set a new login password</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/60 backdrop-blur-xl border border-red-200 shadow-xl rounded-2xl p-6 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-red-600 mb-2">Danger Zone</h2>

        {/* Deactivate Account */}
        <div className="p-4 bg-red-50/70 border border-red-200 rounded-xl flex items-center justify-between hover:bg-red-100 transition cursor-pointer">
          <div className="flex items-center gap-3">
            <ShieldOff className="w-6 h-6 text-red-500" />
            <div>
              <p className="font-semibold text-red-700 text-lg">Deactivate Account</p>
              <p className="text-red-500 text-sm">Temporarily disable your account</p>
            </div>
          </div>
        </div>

        {/* Clear Data */}
        <div className="p-4 bg-red-50/70 border border-red-200 rounded-xl flex items-center justify-between hover:bg-red-100 transition cursor-pointer">
          <div className="flex items-center gap-3">
            <Database className="w-6 h-6 text-red-500" />
            <div>
              <p className="font-semibold text-red-700 text-lg">Clear Data</p>
              <p className="text-red-500 text-sm">Remove all stored app data</p>
            </div>
          </div>
        </div>

        {/* Delete Account */}
        <div className="p-4 bg-red-50/70 border border-red-200 rounded-xl flex items-center justify-between hover:bg-red-100 transition cursor-pointer">
          <div className="flex items-center gap-3">
            <Trash2 className="w-6 h-6 text-red-600" />
            <div>
              <p className="font-semibold text-red-700 text-lg">Delete Account</p>
              <p className="text-red-500 text-sm">Permanently remove your account and data</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}