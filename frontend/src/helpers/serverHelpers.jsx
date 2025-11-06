import axios from "axios";

// eslint-disable-next-line no-undef
const dev_mode = process.env.NODE_ENV === "development";
const server_prefix = dev_mode ? "http://localhost:5000/api/v1" : "/api/v1";

//?------- STORE ------------------

// create store
export const create_store = async (data) => {
  // const data = {storeId, storeName, storeSegment, slogan, shortInfo}
  try {
    const response = await axios.post(
      `${server_prefix}/store/create_store`,
      data
    );

    return {
      success: true,
      message: response.data.message,
      storeId: response.data.storeId,
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
export const delete_page = async (storeId, link) => {
  try {
    const response = await axios.delete(
      `${server_prefix}/page/delete/${storeId}/${link}`
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

//? category

// add category
export const add_category = async (storeId, category) => {
  try {
    const response = await axios.post(
      `${server_prefix}/product/add_category/${storeId}`,
      { category }
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

//?----------------------------------

//?------- USER ------------------
//!

//?------- AUTH ------------------
//!

//?----------------------------------
