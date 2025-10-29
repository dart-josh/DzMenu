// import { create } from "zustand";

// export const useProductStore = create((set, get) => ({
//   products: [],

//   categories: [],
//   listTypes: [],
//   pages: [],

//   category: "All",
//   productsToDisplay: [],
//   filteredProducts: [],
//   searchQuery: "",
//   listType: "grid",

//   activeProductInfo: null,

//   setProductStoreData: (
//     {products,
//     categories,
//     category,
//     listTypes,
//     listType,
//     pages,}
//   ) => {
//     set({
//       products,
//       productsToDisplay: products,
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
//     const { products } = get();
//     if (category == "All") {
//       set({
//         category,
//         productsToDisplay: products,
//       });
//     } else {
//       const filtered = products ? products.filter(
//         (product) => product.category.toLowerCase() == category.toLowerCase()
//       ) : [];

//       set({
//         category,
//         productsToDisplay: filtered,
//       });
//     }
//   },

//   // Update search query and filter
//   setSearch: (query, searchCategory = "All") => {
//     const { products } = get();
//     if (!query) {
//       set({ filteredProducts: [], searchQuery: "" });
//       return;
//     }

//     var pf = products;
//     if (searchCategory && searchCategory != "All") {
//       pf = products.filter(
//         (product) =>
//           product.category.toLowerCase() == searchCategory.toLowerCase()
//       );
//     }

//     const filtered = pf.filter((product) =>
//       product.name.toLowerCase().includes(query.toLowerCase())
//     );

//     set({
//       searchQuery: `${query}-${searchCategory}`,
//       filteredProducts: filtered,
//     });
//   },

//   // Reset search
//   clearSearch: () => {
//     set({ filteredProducts: [], searchQuery: "" });
//   },

//   setActiveProductInfo: (product) => {
//     set({ activeProductInfo: product });
//   },

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

//   //
// }));
