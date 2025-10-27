import { add_category, create_page, create_product, create_store, delete_page, delete_product, fetch_page, get_pages, remove_category, update_page, update_product } from "./serverHelpers";

const products = [
  {
    name: "Be Radiant",
    price: 2500,
    image: "/products/Juice-Be-Radiant-web.jpg",
    category: "Juice",
  },
  {
    name: "Brighter Side",
    price: 2500,
    image: "/products/Juice-Brighter-Side-web.jpg",
    category: "Juice",
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
];

const items = [
  {
    name: "Be Radiant pepper mint with salad dressing and salt pepper dish",
    price: 2500,
    image: "/products/Juice-Be-Radiant-web.jpg",
    category: "Edible",
    description:
      "This is a special dish made by african hands of a great chef and a very great cook of adverisity",
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
];

const categories = [
  "All",
  "Juice",
  "Smoothies",
  "Tiger nut",
  "Yoghurt",
  "Whole foods",
  "Fruits",
];
const cate2 = [
  "All",
  "Edible",
  "Swallow",
  "Protein",
  "Soup",
  "Drinks",
  "Fruits",
];

const listTypes = ["grid", "list"];
const listTypes2 = ["grid", "list", "menu"];
const pages = [
  { link: "/meals", label: "Meals" },
  { link: "/category", label: "Category" },
];

const pages2 = [
  { link: "/products", label: "Products" },
  { link: "/category", label: "Category" },
];

export const fetchPageFromRoute = async (path) => {
  const pathn = path.slice(1).split("/");
  const store = pathn[0];
  console.log(store);
  const tf = {
    products: store == "products" ? products : items,
    categories: store == "products" ? categories : cate2,
    category: "All",
    listTypes: store == "products" ? listTypes : listTypes2,
    listType: "grid",
    pages: store == "products" ? pages : pages2,
  };

  // updateProduct('del', {productDetails: {productId: 'buv22', name: 'Celeb', category: "Black"}});

  // getPages('del')

  // updatePage('del', {pageDetails: {link: 'buv22', title: 'M', categories: ['All', 'Juice'], category: 'Juice', listTypes: ['list'], listType: 'list'}});

  // updatePage('del', {pageDetails: {link: 'buv', title: 'M2',listType: 'grid'}});

  return { pageType: store == "products" ? "Product" : "Menu", storeData: tf };
};


//? PAGE

export const createPage = async (storeId, data) => {
  var vf = await create_page(storeId, data);
  console.log(vf);
};

export const updatePage = async (storeId, data) => {
  var vf = await update_page(storeId, data);
  console.log(vf);
};

export const fetchPage = async (storeId, link) => {
  var vf = await fetch_page(storeId, link);
  console.log(vf);
};

export const deletePage = async (storeId, link) => {
  var vf = await delete_page(storeId, link);
  console.log(vf);
};

export const getPages = async (storeId) => {
  var vf = await get_pages(storeId);
  console.log(vf);
};

//?

//? PRODUCT

export const createProduct = async (storeId, data) => {
  var vf = await create_product(storeId, data);
  console.log(vf);
};

export const updateProduct = async (storeId, data) => {
  var vf = await update_product(storeId, data);
  console.log(vf);
};

export const deleteProduct = async (storeId, productId) => {
  var vf = await delete_product(storeId, productId);
  console.log(vf);
};

export const addCategory = async (storeId, category) => {
  var vf = await add_category(storeId, category);
  console.log(vf);
};

export const removeCategory = async (storeId, category) => {
  var vf = await remove_category(storeId, category);
  console.log(vf);
};

//?

export const createStore = async (data) => {
  var vf = await create_store(data);
  console.log(vf);
};
