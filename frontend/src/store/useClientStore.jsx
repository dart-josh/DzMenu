import { create } from "zustand";
import { fetch_storeIds, get_stores } from "../helpers/serverHelpers";
import { notify } from "./useNotificationStore";

export const useClientStore = create((set, get) => ({
  activeStore: null,
  stores: [],
  existingIds: [],

  // changingStore: false,

  getMyStores: async () => {
    const { stores } = get();
    if (!stores || !stores.length) {
      const res = await get_stores();
      if (res && res.length) set({ stores: res });
    }
  },

  fetchStoreIds: async () => {
    const { existingIds } = get();
    if (!existingIds || !existingIds.length) {
      const res = await fetch_storeIds();
      if (res && res.length) set({ existingIds: res });
    }
  },

  changeStore: (storeId) => {
    if (!storeId) return;
    const { stores, activeStore } = get();
    const store = stores.find((s) => s.storeId == storeId);
    if (!store) return;
    set({ activeStore: store });
    notify({
      title: !activeStore ? 'Store Active' : "Store Changed",
      message: `Store with ID ${storeId} active!`,
      type: "success",
      duration: 4000,
    });
  },

  updateStore: (store) => {
    if (!store || !store.storeId) return;
    const { stores, activeStore, existingIds } = get();

    const storeIndex = stores.findIndex((s) => s.storeId == store.storeId);
    if (storeIndex === -1) {
      set({
        stores: [...stores, store],
        existingIds: [...existingIds, store.storeId],
      });
    } else {
      stores[storeIndex] = store;
      set({ stores: [...stores] });
      if (activeStore?.storeId == store.storeId) set({ activeStore: store });
    }
  },

  deleteStore: (storeId) => {
    if (!storeId) return;
    const { stores, activeStore } = get();

    const deleteStore = (stores, storeId) => {
      return stores.filter((store) => store.storeId !== storeId);
    };

    const updatedStores = deleteStore(stores, storeId);

    set({ stores: [...updatedStores] });
    if (activeStore?.storeId == storeId) set({ activeStore: null });
  },
}));
