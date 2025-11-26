import { create } from "zustand";
import {
  fetch_storeIds,
  get_categories,
  get_pages,
  get_products,
  get_stores,
} from "../helpers/serverHelpers";
import { notify } from "./useNotificationStore";

import { persist } from "zustand/middleware";

//! useStore.persist.clearStorage()
export const useClientStore = create(
  persist(
    (set, get) => ({
      activeStore: null,
      stores: [],
      existingIds: [],

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
          title: !activeStore ? "Store Active" : "Store Changed",
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
          if (activeStore?.storeId == store.storeId)
            set({ activeStore: store });
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

        const delayed = (fn, ms) => {
          setTimeout(fn, ms);
        };
        if (activeStore?.storeId == storeId)
          delayed(() => set({ activeStore: null }), 500);
      },
    }),
    {
      name: "dzVista", // 🗄 Key in localStorage
      partialize: (state) => ({
        activeStore: state.activeStore,
      }), // optional: only store these fields
    }
  )
);

export const useClientProductStore = create((set, get) => ({
  products: [],
  categories: [],
  rawCategories: [],
  existingIds: [],

  activeStoreId: null,

  fetchProducts: async (store) => {
    if (!store?.storeId) return;
    const { products, categories, activeStoreId } = get();

    if (!products.length || activeStoreId !== store.storeId) {
      const ps = await get_products(store?.storeId);

      if (ps != null) {
        const psa = ps.map((c) => c.productId);
        set({ products: ps, existingIds: psa });
      }
    }

    if (!categories.length || activeStoreId !== store.storeId) {
      const cs = await get_categories(store?.storeId);

      if (cs != null) {
        const csa = cs.map((c) => c.category);
        set({ categories: csa, rawCategories: cs });
      }
    }

    set({ activeStoreId: store?.storeId });
  },

  updateProduct: (product) => {
    if (!product || !product.productId) return;
    const { products, existingIds } = get();

    const productIndex = products.findIndex(
      (s) => s.productId == product.productId
    );
    if (productIndex === -1) {
      set({
        products: [...products, product],
        existingIds: [...existingIds, product.productId],
      });
    } else {
      products[productIndex] = product;
      set({ products: [...products] });
    }
  },

  deleteProduct: (productId) => {
    if (!productId) return;
    const { products, existingIds } = get();

    const deleteProduct = (products, productId) => {
      return products.filter((product) => product.productId !== productId);
    };

    const deleteProductId = (existingIds, productId) => {
      return existingIds.filter((id) => id !== productId);
    };

    const updatedProducts = deleteProduct(products, productId);
    const updatedProductIds = deleteProductId(existingIds, productId);

    set({
      products: [...updatedProducts],
      existingIds: [...updatedProductIds],
    });
  },

  addCategory: (category) => {
    const { categories, rawCategories } = get();

    const cat = [...categories, category.category];
    const raw_cat = [...rawCategories, category];

    set({ categories: cat, rawCategories: raw_cat });
  },

  removeCategory: (category) => {
    const { categories, rawCategories } = get();

    const upd = categories.filter((cat) => cat !== category);
    const raw_upd = rawCategories.filter((cat) => cat.category !== category);

    const cat = [...upd];
    const raw_cat = [...raw_upd];
    set({ categories: cat, rawCategories: raw_cat });
  },
}));

export const useClientPageStore = create((set, get) => ({
  pages: [],
  existingIds: [],

  activeStoreId: null,

  fetchPages: async (store) => {
    if (!store?.storeId) return;
    const { pages, activeStoreId } = get();

    if (!pages.length || activeStoreId !== store.storeId) {
      const ps = await get_pages(store?.storeId);

      if (ps != null) {
        const psa = ps.map((c) => c.pageId);
        set({ pages: ps, existingIds: psa });
      }
    }

    set({ activeStoreId: store?.storeId });
  },

  getPage: (pageId) => {
    const { pages } = get();
    const page = pages.find((s) => s.pageId == pageId);

    return page;
  },

  updatePage: (page) => {
    if (!page || !page.pageId) return;
    const { pages, existingIds } = get();

    const pageIndex = pages.findIndex((s) => s.pageId == page.pageId);

    if (pageIndex === -1) {
      set({
        pages: [...pages, page],
        existingIds: [...existingIds, page.pageId],
      });
    } else {
      pages[pageIndex] = page;
      set({ pages: [...pages] });
    }
  },

  deletePage: (pageId) => {
    if (!pageId) return;
    const { pages, existingIds } = get();

    const deletePage = (pages, pageId) => {
      return pages.filter((page) => page.pageId !== pageId);
    };

    const deletePageId = (existingIds, pageId) => {
      return existingIds.filter((id) => id !== pageId);
    };

    const updatedPages = deletePage(pages, pageId);
    const updatedPageIds = deletePageId(existingIds, pageId);

    set({
      pages: [...updatedPages],
      existingIds: [...updatedPageIds],
    });
  },
}));
