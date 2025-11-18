import { create } from "zustand";

export const useUserStore = create((set, get) => ({
  user: '',
  activePlan: 'pro',
}));