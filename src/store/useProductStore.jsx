import { create } from "zustand";

export const useProductStore = create((set, get) => ({
  products: [
    {
      name: "Be Radiant",
      price: 2500,
      img: "/products/Juice-Be-Radiant-web.jpg",
      category: "Juice",
    },
    {
      name: "Brighter Side",
      price: 2500,
      img: "/products/Juice-Brighter-Side-web.jpg",
      category: "Juice",
    },
    {
      name: "Lift Me Up",
      price: 2500,
      img: "/products/Juice-Lift-Me-Up-web.jpg",
      category: "Juice",
    },
    {
      name: "Lovely Beet",
      price: 2500,
      img: "/products/Juice-Lovely-Beet-web.jpg",
      category: "Juice",
    },
    {
      name: "Move On Juice",
      price: 2500,
      img: "/products/Juice-Move-On-web.jpg",
      category: "Juice",
    },
    {
      name: "Follow Me",
      price: 2300,
      img: "/products/Smoothies-Follow-Me-web.jpg",
      category: "Smoothies",
    },
    {
      name: "Green Blossom",
      price: 2500,
      img: "/products/Smoothies-Green-Blossom-web.jpg",
      category: "Smoothies",
    },
    {
      name: "Pink Connect",
      price: 2300,
      img: "/products/Smoothies-Pink-Connect-web.jpg",
      category: "Smoothies",
    },
    {
      name: "Revive",
      price: 3500,
      img: "/products/Smoothies-Revive-web.jpg",
      category: "Smoothies",
    },
    {
      name: "Whitesnow",
      price: 3500,
      img: "/products/Smoothies-Whitesnow-web.jpg",
      category: "Smoothies",
    },
    {
      name: "Tigernut Banana",
      price: 2300,
      img: "/products/Tigernut-Banana-web.jpg",
      category: "Tiger nut",
    },
    {
      name: "Tigernut Delight Me",
      price: 2300,
      img: "/products/Tigernut-Delight-Me-web.jpg",
      category: "Tiger nut",
    },
    {
      name: "Tigernut Ginger",
      price: 2300,
      img: "/products/Tigernut-Ginger-web.jpg",
      category: "Tiger nut",
    },
    {
      name: "Tigernut Relish",
      price: 2300,
      img: "/products/Tigernut-Relish-web.jpg",
      category: "Tiger nut",
    },
  ],

  categories: ["All", "Juice", "Smoothies", "Tiger nut", "Yoghurt", "Whole foods", "Fruits"],

  productsToDisplay: [],
  filteredProducts: [],
  searchQuery: "",

  // Load products into the store
  setProducts: (data) => set({ products: data, productsToDisplay: data }),

  applyCategory: (category) => {
    const { products } = get();
    if (category == "All") {
      set({
        productsToDisplay: products,
      });
    } else {
      const filtered = products.filter(
        (product) => product.category.toLowerCase() == category.toLowerCase()
      );

      set({
        productsToDisplay: filtered,
      });
    }
  },

  // Update search query and filter
  setSearch: (query) => {
    const { products } = get();
    if (!query) {
      set({ filteredProducts: [], searchQuery: "" });
      return;
    }

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    set({
      searchQuery: query,
      filteredProducts: filtered,
    });
  },

  // Reset search
  clearSearch: () => {
    set({ filteredProducts: [], searchQuery: "" });
  },

  //
}));
