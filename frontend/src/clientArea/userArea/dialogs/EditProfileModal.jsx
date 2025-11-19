import { X, User, Briefcase, Loader, LockKeyhole } from "lucide-react";
import { useUserStore } from "../store/useUserStore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { sanitizeString } from "../../../utils/stringSanitizers";
import { userRoles } from "../../../utils/globalVariables";

const EditProfileModal = ({ isOpen, onClose, user }) => {
  const { editProfile } = useUserStore();

  const [formData, setFormData] = useState({
    fullname: user?.fullname || "",
    userRole: user?.userRole || "",
    password: undefined,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const word = sanitizeString(value, 50);
    setFormData((prev) => ({ ...prev, [name]: word }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullname) {
      return toast.error("Enter Fullname", { id: "error1" });
    }

    if (!formData.password) {
      return toast.error("Enter Password", { id: "error1" });
    }

    setIsLoading(true);
    const res = await editProfile(formData);
    setIsLoading(false);

    if (res.success) {
      toast.success(res.message);
      onClose?.();
    }
    else toast.error(res.message, { id: "error2" });
  };

  useEffect(() => {
    setFormData({
      fullname: user?.fullname || "",
      userRole: user?.userRole || "",
      password: undefined,
    });
  }, [isOpen, user]);

  useEffect(() => {
    if (isOpen) {
      // lock body scroll
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        onClick={() => {
          if (isLoading) {
            return toast("Please wait...", { id: "close1" });
          }
          onClose?.();
        }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative w-full max-w-sm bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg rounded-2xl p-6 animate-fadeIn scale-95 hover:scale-100 transition-all">
        {/* Close Button */}
        <button
          onClick={() => {
            if (isLoading) {
              return toast("Please wait...", { id: "close1" });
            }
            onClose?.();
          }}
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
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-sm text-slate-700 font-medium flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-600" />
              Full Name
            </label>

            <input
              disabled={isLoading}
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
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
              disabled={isLoading}
              name="userRole"
              value={formData.userRole}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/70 backdrop-blur-sm border border-white/60 rounded-lg shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              {userRoles.map((role, i) => (<option key={i} value={role}>{role}</option>))}
            </select>
          </div>

          <div className="space-y-1.5 mt-4">
            <label className="text-sm text-slate-700 font-medium flex items-center gap-2">
              <LockKeyhole className="w-4 h-4 text-indigo-600" />
              Password
            </label>

            <input
              disabled={isLoading}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 bg-white/70 backdrop-blur-sm border border-white/60 rounded-lg shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Save Button */}
          <button
            disabled={isLoading}
            type="submit"
            className="w-full py-2.5 rounded-lg text-sm font-medium
                       bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow hover:opacity-90 transition"
          >
            {(isLoading && (
              <div className="flex item-center justify-center gap-2">
                <div className="flex items-center justify-center animate-spin">
                  <Loader />
                </div>
                <>Updating...</>
              </div>
            )) || <>Save Changes</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
