import { create } from "zustand";
import { fetch_page } from "../helpers/serverHelpers";

export const routerHook = create((set, get) => ({
  route: null,
  isFetching: false,
  pageData: {},

  routePage: (path) => {
    const paths = path.slice(1).split("/");

    const main = paths[0];

    if (main == "client" || main == "admin") {
      return set({ route: "client_broken" });
    }

    if (paths.length > 2) {
      return set({ route: "store_broken" });
    }

    const { fetchPage } = get();
    fetchPage(path);
  },

  fetchPage: async (path) => {
    const paths = path.slice(1).split("/");

    const storeId = paths[0];
    const page = paths[1];

    set({ isFetching: true });

    const pageData = await fetch_page(storeId, page);

    if (!pageData) {
      return set({ isFetching: false, pageData, route: "not_found" });
    }
    
    set({ isFetching: false, pageData, route: path });
  },

  //
}));
