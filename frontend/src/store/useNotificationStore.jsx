// useNotificationStore.js
import { create } from "zustand";

export const useNotificationStore = create((set, get) => ({
  notifications: [],
  addNotification: (note) => {
    const { notifications } = get();
    set({
      notifications: [
        ...notifications,
        { id: Date.now(), duration: 4000, type: "info", ...note },
      ],
    });
  },
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));

// helper function to call from anywhere
export const notify = (note) => {
  useNotificationStore.getState().addNotification(note);
};
