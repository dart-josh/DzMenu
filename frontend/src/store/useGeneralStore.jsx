import { create } from "zustand";

export const useGeneralStore = create((set) => ({
  openConfirm: false,
  toggleConfirm: (value) => {
    set({ openConfirm: value });
  },
  confirmDetails: {
    onConfirm: () => {},
    title: "",
    description: "",
    icon: "", // "warning", "success", "error", "info"
    confirmText: "",
    cancelText: "",
  },

  setConfirmDetails: (confirmDetails) => {
    set({ confirmDetails: { ...confirmDetails }, openConfirm: true });
  },
}));
