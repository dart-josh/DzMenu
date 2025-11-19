import axios from "axios";

// eslint-disable-next-line no-undef
const dev_mode = process.env.NODE_ENV === "development";
const server_prefix = dev_mode ? "http://localhost:5000/api/v1" : "/api/v1";

axios.defaults.withCredentials = true;

//?------- STORE ------------------

// create store
export const create_store = async (data) => {
  // const data = {storeId, storeName, storeSegment, slogan, shortInfo}
  try {
    const response = await axios.post(
      `${server_prefix}/store/create_store`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data", // ✅ required for axios
        },
      }
    );

    return {
      success: true,
      message: response.data.message,
      store: response.data.store,
    };
  } catch (error) {
    console.log("Error in create_store function - ", error);
    return {
      success: false,
      message: error.response?.data?.error || error.message || error,
    };
  }
};

export const update_store = async (data) => {
  // const data = {storeId, storeName, storeType, address}
  try {
    const response = await axios.post(
      `${server_prefix}/store/update_store`,
      data
    );

    return {
      success: true,
      message: response.data.message,
      store: response.data.store,
    };
  } catch (error) {
    console.log("Error in update_store function - ", error);
    return {
      success: false,
      message: error.response?.data?.error || error.message || error,
    };
  }
};

export const toggleStoreLive = async (data) => {
  // const data = {storeId, value}
  try {
    const response = await axios.post(
      `${server_prefix}/store/toggleStoreLive`,
      data
    );

    return {
      success: true,
      message: response.data.message,
      store: response.data.store,
    };
  } catch (error) {
    console.log("Error in toggleStoreLive function - ", error);
    return {
      success: false,
      message: error.response?.data?.error || error.message || error,
    };
  }
};

// get store
export const get_store = async (storeId) => {
  try {
    const response = await axios.get(
      `${server_prefix}/store/get_store/${storeId}`
    );

    return response.data;
  } catch (error) {
    console.log("Error in get_store function - ", error);
    return null;
  }
};

// get stores
export const get_stores = async () => {
  try {
    const response = await axios.get(`${server_prefix}/store/get_stores`);

    return response.data;
  } catch (error) {
    console.log("Error in get_stores function - ", error);
    return null;
  }
};

// fetch_storeIds
export const fetch_storeIds = async () => {
  try {
    const response = await axios.get(`${server_prefix}/store/fetch_storeIds`);

    return response.data;
  } catch (error) {
    console.log("Error in fetch_storeIds function - ", error);
    return null;
  }
};

// delete store
export const delete_store = async (storeId) => {
  try {
    const response = await axios.delete(
      `${server_prefix}/store/delete_store/${storeId}`
    );

    return {
      success: true,
      message: response.data.message,
    };
  } catch (error) {
    console.log("Error in delete_store function - ", error);
    return {
      success: false,
      message: error.response?.data?.error || error.message || error,
    };
  }
};

//?----------------------------------

//?------- PAGE ------------------

// create page
export const create_page = async (storeId, data) => {
  // const data = {pageDetails}
  try {
    const response = await axios.post(
      `${server_prefix}/page/create/${storeId}`,
      data
    );

    return {
      success: true,
      message: response.data.message,
      page: response.data.page,
    };
  } catch (error) {
    console.log("Error in create_page function - ", error);
    return {
      success: false,
      message: error.response?.data?.error || error.message || error,
    };
  }
};

// update page
export const update_page = async (storeId, data) => {
  // const data = {pageDetails}
  try {
    const response = await axios.post(
      `${server_prefix}/page/update/${storeId}`,
      data
    );

    return {
      success: true,
      message: response.data.message,
      page: response.data.updatedPage,
    };
  } catch (error) {
    console.log("Error in update_page function - ", error);
    return {
      success: false,
      message: error.response?.data?.error || error.message || error,
    };
  }
};

// toggle page visibility
export const togglePageLive = async (storeId, data) => {
  // const data = {storeId, pageId, value}
  try {
    const response = await axios.post(
      `${server_prefix}/page/togglePageLive`,
      data
    );

    return {
      success: true,
      message: response.data.message,
      page: response.data.page,
    };
  } catch (error) {
    console.log("Error in togglePageLive function - ", error);
    return {
      success: false,
      message: error.response?.data?.error || error.message || error,
    };
  }
};

// fetch page
export const fetch_page = async (storeId, link) => {
  const url = !link
    ? `${server_prefix}/page/fetch/${storeId}`
    : `${server_prefix}/page/fetch/${storeId}/${link}`;
  try {
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.log("Error in fetch_page function - ", error);
    return null;
  }
};

// delete page
export const delete_page = async (storeId, pageId) => {
  try {
    const response = await axios.delete(
      `${server_prefix}/page/delete/${storeId}/${pageId}`
    );

    return {
      success: true,
      message: response.data.message,
    };
  } catch (error) {
    console.log("Error in delete_page function - ", error);
    return {
      success: false,
      message: error.response?.data?.error || error.message || error,
    };
  }
};

// get pages
export const get_pages = async (storeId) => {
  try {
    const response = await axios.get(
      `${server_prefix}/page/get_pages/${storeId}`
    );

    return response.data;
  } catch (error) {
    console.log("Error in get_pages function - ", error);
    return null;
  }
};

//?----------------------------------

//?------- PRODUCT ------------------

// create product
export const create_product = async (storeId, data) => {
  // const data = {productDetails}
  try {
    const response = await axios.post(
      `${server_prefix}/product/create/${storeId}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data", // ✅ required for axios
        },
      }
    );

    return {
      success: true,
      message: response.data.message,
      product: response.data.product,
    };
  } catch (error) {
    console.log("Error in create_product function - ", error);
    return {
      success: false,
      message: error.response?.data?.error || error.message || error,
    };
  }
};

// update product
export const update_product = async (storeId, data) => {
  try {
    const response = await axios.post(
      `${server_prefix}/product/update/${storeId}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data", // ✅ required for axios
        },
      }
    );

    return {
      success: true,
      message: response.data.message,
      product: response.data.updatedProduct,
    };
  } catch (error) {
    console.log("Error in update_product function - ", error);
    return {
      success: false,
      message: error.response?.data?.error || error.message || error,
    };
  }
};

// delete product
export const delete_product = async (storeId, productId) => {
  try {
    const response = await axios.delete(
      `${server_prefix}/product/delete/${storeId}/${productId}`
    );

    return {
      success: true,
      message: response.data.message,
    };
  } catch (error) {
    console.log("Error in delete_product function - ", error);
    return {
      success: false,
      message: error.response?.data?.error || error.message || error,
    };
  }
};

// get products
export const get_products = async (storeId) => {
  // const data = {productDetails}
  try {
    const response = await axios.get(
      `${server_prefix}/product/get_products/${storeId}`
    );

    return response.data;
  } catch (error) {
    console.log("Error in get_products function - ", error);
    return null;
  }
};

//? category

// add category
export const add_category = async (storeId, data) => {
  try {
    const response = await axios.post(
      `${server_prefix}/product/add_category/${storeId}`,
      data
    );

    return {
      success: true,
      message: response.data.message,
      category: response.data.new_category,
    };
  } catch (error) {
    console.log("Error in add_category function - ", error);
    return {
      success: false,
      message: error.response?.data?.error || error.message || error,
    };
  }
};

// remove category
export const remove_category = async (storeId, category) => {
  try {
    const response = await axios.delete(
      `${server_prefix}/product/remove_category/${storeId}/${category}`
    );

    return {
      success: true,
      message: response.data.message,
    };
  } catch (error) {
    console.log("Error in remove_category function - ", error);
    return {
      success: false,
      message: error.response?.data?.error || error.message || error,
    };
  }
};

// get categories
export const get_categories = async (storeId) => {
  // const data = {productDetails}
  try {
    const response = await axios.get(
      `${server_prefix}/product/get_categories/${storeId}`
    );

    return response.data;
  } catch (error) {
    console.log("Error in get_categories function - ", error);
    return null;
  }
};

//?----------------------------------

//?------- USER ------------------

// create profile
export const createProfile = async (data) => {
  try {
    const response = await axios.post(
      `${server_prefix}/user/createProfile`,
      data
    );

    return {
      success: true,
      message: response.data.message,
      user: response.data.user,
    };
  } catch (error) {
    console.log("Error in createProfile function - ", error);
    return {
      success: false,
      message: error.response?.data?.error || error.message || error,
    };
  }
};

// edit profile
export const editProfile = async (data) => {
  try {
    const response = await axios.post(
      `${server_prefix}/user/editProfile`,
      data
    );

    return {
      success: true,
      message: response.data.message,
      user: response.data.user,
    };
  } catch (error) {
    console.log("Error in editProfile function - ", error);
    return {
      success: false,
      message: error.response?.data?.error || error.message || error,
    };
  }
};

// startEmailVerification
export const startEmailVerification = async () => {
  try {
    const response = await axios.post(
      `${server_prefix}/user/startEmailVerification`
    );

    return {
      success: true,
      message: response.data.message,
    };
  } catch (error) {
    console.log("Error in startEmailVerification function - ", error);
    return {
      success: false,
      message: error.response?.data?.error || error.message || error,
    };
  }
};

//?------- AUTH ------------------

// signup
export const signup = async (data) => {
  try {
    const response = await axios.post(`${server_prefix}/auth/signup`, data);

    return {
      success: true,
      message: response.data.message,
      user: response.data.user,
    };
  } catch (error) {
    console.log("Error in signup function - ", error);
    return {
      success: false,
      message: error.response?.data?.error || error.message || error,
    };
  }
};

// login
export const login = async (data) => {
  try {
    const response = await axios.post(`${server_prefix}/auth/login`, data);

    return {
      success: true,
      message: response.data.message,
      user: response.data.user,
    };
  } catch (error) {
    console.log("Error in login function - ", error);
    return {
      success: false,
      message: error.response?.data?.error || error.message || error,
    };
  }
};

// getAuthUser
export const getAuthUser = async () => {
  try {
    const response = await axios.get(`${server_prefix}/auth/getAuthUser`);

    return response.data;
  } catch (error) {
    console.log("Error in getAuthUser function - ", error);
    return null;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${server_prefix}/auth/logout`);

    return {
      success: true,
      message: response.data.message,
    };
  } catch (error) {
    console.log("Error in logout function - ", error);
    return {
      success: false,
      message: error.response?.data?.error || error.message || error,
    };
  }
};

// verifyEmail
export const verifyEmail = async (code) => {
  try {
    const response = await axios.post(`${server_prefix}/auth/verifyEmail`, {code});

    return {
      success: true,
      message: response.data.message,
      user: response.data.user,
    };
  } catch (error) {
    console.log("Error in verifyEmail function - ", error);
    return {
      success: false,
      message: error.response?.data?.error || error.message || error,
    };
  }
};

//?----------------------------------
