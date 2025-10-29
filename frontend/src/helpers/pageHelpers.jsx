import {
  create_page,
  delete_page,
  fetch_page,
  get_pages,
  update_page,
} from "./serverHelpers";

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
