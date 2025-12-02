import { create } from "zustand";
import {
  editProfile,
  getAuthUser,
  updatePlanAutoRenewal,
} from "../../../helpers/serverHelpers";

export const useUserStore = create((set, get) => ({
  user: {},
  isVerified: false,

  userDetails: {},
  planDetails: null,
  activePlan: "",
  planActive: false,
  planUsage: {},

  paymentHistory: [],
  pendingPayments: [],

  updateUser: (user) => {
    const paymentHistory = sortByNewest(user?.paymentHistory || []);
    const pendingPayments = sortByNewest(user?.pendingPayments || []);

    set({
      user,
      isVerified: user?.isVerified,
      userDetails: {
        userId: user?.userId || "",
        fullname: user?.fullname || "",
        userRole: user?.userRole || "",
        email: user?.email || "",
      }, // userId, fullname, userRole, email
      planDetails: user?.planDetails || null, // id, name, limits, period, expDate
      activePlan: isPlanActive(user?.planDetails?.renewalDate)
        ? user?.planDetails?.id || ""
        : "",
      planUsage: user?.planUsage || {},
      paymentHistory,
      pendingPayments,
      planActive: isPlanActive(user?.planDetails?.renewalDate),
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

  updatePlanAutoRenewal: async () => {
    const { planDetails, updateUser } = get();
    const new_value = planDetails?.autoRenewal || false;
    const res = await updatePlanAutoRenewal({
      value: !new_value,
    });

    if (res.success) {
      const user = res.user;
      updateUser(user);
    }

    return { success: res.success, message: res.message };
  },

  //? TRANSACTIONS
  updatePaymentHistory: () => {},

  storeActiveTransactions: () => {},

  //?
}));

const isPlanActive = (date) => {
  if (!date) return false;
  const now = new Date();
  const target = new Date(date);

  return target > now;
};

const sortByNewest = (arr) =>
  arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
