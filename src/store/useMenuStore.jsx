import { create } from "zustand";

export const useMenuStore = create((set, get) => ({
  items: [
    {
      name: "Be Radiant pepper mint with salad dressing and salt pepper dish",
      price: 2500,
      image: "/products/Juice-Be-Radiant-web.jpg",
      category: "Edible",
      description: 'This is a special dish made by african hands of a great chef and a very great cook of adverisity'
    },
    {
      name: "Brighter Side",
      price: 2500,
      image: "/products/Juice-Brighter-Side-web.jpg",
      category: "Juice",
      description: "This is a special dish made by african",
    },
    {
      name: "Lift Me Up",
      price: 2500,
      image: "/products/Juice-Lift-Me-Up-web.jpg",
      category: "Juice",
    },
    {
      name: "Lovely Beet",
      price: 2500,
      image: "/products/Juice-Lovely-Beet-web.jpg",
      category: "Juice",
    },
    {
      name: "Move On Juice",
      price: 2500,
      image: "/products/Juice-Move-On-web.jpg",
      category: "Juice",
    },
    {
      name: "Follow Me",
      price: 2300,
      image: "/products/Smoothies-Follow-Me-web.jpg",
      category: "Smoothies",
    },
    {
      name: "Green Blossom",
      price: 2500,
      image: "/products/Smoothies-Green-Blossom-web.jpg",
      category: "Smoothies",
    },
    {
      name: "Pink Connect",
      price: 2300,
      image: "/products/Smoothies-Pink-Connect-web.jpg",
      category: "Smoothies",
    },
    {
      name: "Revive",
      price: 3500,
      image: "/products/Smoothies-Revive-web.jpg",
      category: "Smoothies",
    },
    {
      name: "Whitesnow",
      price: 3500,
      image: "/products/Smoothies-Whitesnow-web.jpg",
      category: "Smoothies",
    },
    {
      name: "Tigernut Banana",
      price: 2300,
      image: "/products/Tigernut-Banana-web.jpg",
      category: "Tiger nut",
    },
    {
      name: "Tigernut Delight Me",
      price: 2300,
      image: "/products/Tigernut-Delight-Me-web.jpg",
      category: "Tiger nut",
    },
    {
      name: "Tigernut Ginger",
      price: 2300,
      image: "/products/Tigernut-Ginger-web.jpg",
      category: "Tiger nut",
    },
    {
      name: "Tigernut Relish",
      price: 2300,
      image: "/products/Tigernut-Relish-web.jpg",
      category: "Tiger nut",
    },
  ],

  categories: [
    "All",
    "Edible",
    "Swallow",
    "Protein",
    "Soup",
    "Drinks",
    "Fruits",
  ],
  listTypes: ["grid", "list"],

  category: "All",
  itemsToDisplay: [],
  filteredItems: [],
  searchQuery: "",
  listType: "menu",

  activeMealInfo: null,

  // Load items into the store
  setItems: (data) => set({ items: data, itemsToDisplay: data }),

  // set
  applyCategory: (category) => {
    const { items } = get();
    if (category == "All") {
      set({
        category,
        itemsToDisplay: items,
      });
    } else {
      const filtered = items.filter(
        (item) => item.category.toLowerCase() == category.toLowerCase()
      );

      set({
        category,
        itemsToDisplay: filtered,
      });
    }
  },

  // Update search query and filter
  setSearch: (query, searchCategory = 'All') => {
    const { items } = get();
    if (!query) {
      set({ filteredItems: [], searchQuery: "" });
      return;
    }

    var pf = items;
    if (searchCategory && searchCategory != 'All') {
      pf = items.filter(
        (item) => item.category.toLowerCase() == searchCategory.toLowerCase()
      );
    }

    const filtered = pf.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );

    set({
      searchQuery: `${query}-${searchCategory}`,
      filteredItems: filtered,
    });
  },

  // Reset search
  clearSearch: () => {
    set({ filteredItems: [], searchQuery: "" });
  },

  // Set list style
  setListType: (listType) => {
    set({listType});
  },

  setActiveMealInfo: (meal) => {
    set({ activeMealInfo: meal });
  },

  //
}));
