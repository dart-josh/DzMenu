import { create } from "zustand";

export const usePageStore = create((set, get) => ({
  products: [],
  categories: [],
  defaultCategory: "All",
  listStyle: [],
  defaultListStyle: "grid",
  externalPages: [],

  productsToDisplay: [],
  filteredProducts: [],
  searchQuery: "",
 
  activeProductInfo: null,

  //   set page data
  setPageData: ({
    products,
    categories,
    defaultCategory,
    listStyle,
    defaultListStyle,
    externalPages,
  }) => {
    set({
      products,
      productsToDisplay: products,
      categories,
      defaultCategory,
      listStyle,
      defaultListStyle,
      externalPages,
    });

    const { applyCategory } = get();
    applyCategory(defaultCategory);
  },

  // apply category
  applyCategory: (category) => {
    console.log(category)
    const { products } = get();
    if (category == "All") {
      set({
        defaultCategory: category,
        productsToDisplay: products,
      });
    } else {
      const filtered = products
        ? products.filter(
            (product) =>
              product.category?.toLowerCase() == category?.toLowerCase()
          )
        : [];

      set({
        defaultCategory: category,
        productsToDisplay: filtered,
      });
    }
  },

  // Update search query and filter
  setSearch: (query, searchCategory = "All") => {
    const { products } = get();
    if (!query) {
      set({ filteredProducts: [], searchQuery: "" });
      return;
    }

    var pf = products;
    if (searchCategory && searchCategory != "All") {
      pf = products.filter(
        (product) =>
          product.category.toLowerCase() == searchCategory.toLowerCase()
      );
    }

    const filtered = pf.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    set({
      searchQuery: `${query}-${searchCategory}`,
      filteredProducts: filtered,
    });
  },

  // Reset search
  clearSearch: () => {
    set({ filteredProducts: [], searchQuery: "" });
  },

  setActiveProductInfo: (product) => {
    set({ activeProductInfo: product });
  },

  //   change list type
  listStyleIndex: 0,
  changeListType: () => {
    const { listStyle, listStyleIndex } = get();

    let lti = listStyleIndex + 1;
    if (lti >= listStyle.length) {
      lti = 0;
    }

    const _listStyle = listStyle[lti];

    set({ defaultListStyle: _listStyle, listStyleIndex: lti }); // 
  },

  //
}));
