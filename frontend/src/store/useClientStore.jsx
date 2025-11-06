import { create } from "zustand";

export const useClientStore = create((set, get) => ({
  activeStore: null,
  stores: [
    {
      storeId: "del",
      storeName: "Delightsome Juice",
      shortInfo:
        "Fresh & tasty goodness every day in a millions bucks a lifetime access to medicare and services",
      slogan: "Fresh & tasty goodness",
      segment: "Health products",
    },
  ],

  // changingStore: false,

  changeStore: (storeId) => {
    if (!storeId) return;
    const { stores } = get();
    const store = stores.find((s) => s.storeId == storeId);
    if (!store) return;
    set({ activeStore: store });
  },

  updateStore: (store) => {
    if (!store || !store.storeId) return;
    const { stores, activeStore } = get();

    const storeIndex = stores.findIndex((s) => s.storeId == store.storeId);
    if (storeIndex === -1) {
      set({ stores: [...stores, store] });
    } else {
      stores[storeIndex] = store;
      set({ stores: [...stores] });
      if (activeStore?.storeId == store.storeId) set({ activeStore: store });
    }
  },
}));
