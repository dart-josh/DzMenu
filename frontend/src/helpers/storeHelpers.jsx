import {
  create_store,
  delete_store,
  get_store,
  get_stores,
  update_store,
} from "./serverHelpers";


export const createStore = async (data) => {
  var vf = await create_store(data);
  console.log(vf);
};

export const updateStore = async (data) => {
  var vf = await update_store(data);
  console.log(vf);
};

export const getStore = async (storeId) => {
  var vf = await get_store(storeId);
  console.log(vf);
};

export const getStores = async () => {
  var vf = await get_stores();
  console.log(vf);
};

export const deleteStore = async (storeId) => {
  var vf = await delete_store(storeId);
  console.log(vf);
};
