import axios from "./axiosConfig";
const BASE_URL = `${
  import.meta.env.VITE_BACK_END_SERVER_URL
}/bidhub/marketplace`;

const getItems = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getFilteredItems = async (
  categoryFilter,
  conditionFilter,
  endTime,
  startTime,
  currentBid,
  owner = "none",
  userbids = "none",
  favorites = 'none'
) => {
  try {
    const res = await axios.get(`${BASE_URL}/`, {
      params: {
        category: categoryFilter,
        condition: conditionFilter,
        owner: owner,
        end: endTime,
        start: startTime,
        bid: currentBid,
        userbids: userbids,
        favorites: favorites
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getItemById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/${id}/`);
    return res.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const updateItem = async (id, Item) => {
  try {
    const res = await axios.put(`${BASE_URL}/${id}/`, Item);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteItem = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}/`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createItem = async (formData) => {
  try {
    const res = await axios.post(`${BASE_URL}/new/`, formData);
    return res.data;
  } catch (err) {
    console.error("Create item error:", err.response ? err.response.data : err);
    throw new Error(
      err.response?.data?.detail ||
        "Failed to create item. Please check all fields and try again."
    );
  }
};

export {
  getItems,
  getItemById,
  updateItem,
  deleteItem,
  createItem,
  getFilteredItems,
};
