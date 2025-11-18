import { X, User, Briefcase } from "lucide-react";

const EditProfileModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative w-full max-w-sm bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg rounded-2xl p-6 animate-fadeIn scale-95 hover:scale-100 transition-all">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/60 hover:bg-white shadow-sm"
        >
          <X className="w-4 h-4 text-slate-700" />
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-slate-900 mb-1">
          Edit Profile
        </h2>
        <p className="text-sm text-slate-500 mb-5">
          Update your personal details
        </p>

        {/* FORM */}
        <form className="space-y-4">

          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-sm text-slate-700 font-medium flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-600" />
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter full name"
              className="w-full px-4 py-2 bg-white/70 backdrop-blur-sm border border-white/60 rounded-lg shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Role */}
          <div className="space-y-1.5">
            <label className="text-sm text-slate-700 font-medium flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-indigo-600" />
              Role
            </label>

            <select
              className="w-full px-4 py-2 bg-white/70 backdrop-blur-sm border border-white/60 rounded-lg shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option>Marketer</option>
              <option>Product Designer</option>
              <option>Sales Manager</option>
              <option>Freelancer</option>
            </select>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg text-sm font-medium
                       bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow hover:opacity-90 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
