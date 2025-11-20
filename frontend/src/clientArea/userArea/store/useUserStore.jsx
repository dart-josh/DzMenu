import { create } from "zustand";
import { editProfile, getAuthUser } from "../../../helpers/serverHelpers";

export const useUserStore = create((set, get) => ({
  user: {},
  isVerified: false,

  userDetails: {},
  planDetails: {},
  activePlan: "pro",

  paymentHistory: [],
  activeTransactions: [],

  updateUser: (user) => {
    set({
      user,
      isVerified: user?.isVerified,
      userDetails: {
        userId: user?.userId,
        fullname: user?.fullname,
        userRole: user?.userRole,
        email: user?.email,
      }, // userId, fullname, userRole, email
      planDetails: user?.planDetails, // id, name, limits, period, expDate
      activePlan: user?.planDetails?.id || "",
      paymentHistory: user?.paymentHistory, // id, title, type, date, amount, discount, status,
      activeTransactions: user?.activeTransactions,
    });
  },

  fetchUser: async () => {
    const { updateUser } = get();
    const user = await getAuthUser();
    updateUser(user);
  },

  editProfile: async (data) => {
    const { updateUser } = get();
    const res = await editProfile(data);

    if (res.success) {
      const user = res.user;
      updateUser(user);
    }

    return { success: res.success, message: res.message };
  },

  //? PLANS
  updatePlan: async () => {},

  //? TRANSACTIONS
  updatePaymentHistory: () => {},

  storeActiveTransactions: () => {},

  //?
}));
