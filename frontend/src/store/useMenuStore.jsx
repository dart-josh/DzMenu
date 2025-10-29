// import { create } from "zustand";

// export const useMenuStore = create((set, get) => ({
//   items: [],

//   categories: [],
//   listTypes: [],
//   pages: [],

//   category: "All",
//   itemsToDisplay: [],
//   filteredItems: [],
//   searchQuery: "",
//   listType: "menu",

//   activeMealInfo: null,

//   // Load items into the store
//   setMenuStoreData: (
//     {items,
//     categories,
//     category,
//     listTypes,
//     listType,
//     pages,}
//   ) => {
//     set({
//       items,
//       itemsToDisplay: items,
//       categories,
//       category,
//       listTypes,
//       listType,
//       pages,
//     });

//     const {applyCategory} = get();
//     applyCategory(category);
//   },

//   // set
//   applyCategory: (category) => {
//     const { items } = get();
//     if (category == "All") {
//       set({
//         category,
//         itemsToDisplay: items,
//       });
//     } else {
//       const filtered = items.filter(
//         (item) => item.category.toLowerCase() == category.toLowerCase()
//       );

//       set({
//         category,
//         itemsToDisplay: filtered,
//       });
//     }
//   },

//   // Update search query and filter
//   setSearch: (query, searchCategory = "All") => {
//     const { items } = get();
//     if (!query) {
//       set({ filteredItems: [], searchQuery: "" });
//       return;
//     }

//     var pf = items;
//     if (searchCategory && searchCategory != "All") {
//       pf = items.filter(
//         (item) => item.category.toLowerCase() == searchCategory.toLowerCase()
//       );
//     }

//     const filtered = pf.filter((item) =>
//       item.name.toLowerCase().includes(query.toLowerCase())
//     );

//     set({
//       searchQuery: `${query}-${searchCategory}`,
//       filteredItems: filtered,
//     });
//   },

//   // Reset search
//   clearSearch: () => {
//     set({ filteredItems: [], searchQuery: "" });
//   },

//   // Set list style
//   listTypeIndex: 0,
//   changeListType: () => {
//     const { listTypes, listTypeIndex } = get();

//     let lti = listTypeIndex + 1;
//     if (lti >= listTypes.length) {
//       lti = 0;
//     }

//     const listType = listTypes[lti];

//     set({ listType, listTypeIndex: lti });
//   },

//   setActiveMealInfo: (meal) => {
//     set({ activeMealInfo: meal });
//   },

//   //
// }));
