import {
  add_category,
  create_product,
  delete_product,
  remove_category,
  update_product,
} from "./serverHelpers";

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
