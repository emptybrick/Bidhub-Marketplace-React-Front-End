import axios from "./axiosConfig";
const BASE_URL = `${ import.meta.env.VITE_BACK_END_SERVER_URL
  }/bidhub/marketplace`;

const getItems = async () => {
  try {
    const res = await axios.get(`${ BASE_URL }/`);
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
  userbids = "false",
  favorites = "false",
  purchased = "false",
  sold = "false",
  auctionFailed = 'false',
  page = 1,
  pageSize = 20
) => {
  try {
    const res = await axios.get(`${ BASE_URL }/`, {
      params: {
        category: categoryFilter,
        condition: conditionFilter,
        owner,
        end: endTime,
        start: startTime,
        bid: currentBid,
        userbids,
        favorites,
        purchased,
        sold,
        auctionFailed,
        page,
        page_size: pageSize,
      },
    });
    // Return the full paginated response (count, next, previous, results)
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getItemById = async (id) => {
  try {
    const res = await axios.get(`${ BASE_URL }/${ id }/`);
    return res.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const updateItem = async (id, Item) => {
  try {
    const res = await axios.put(`${ BASE_URL }/${ id }/`, Item);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteItem = async (id) => {
  try {
    await axios.delete(`${ BASE_URL }/${ id }/`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createItem = async (formData) => {
  try {
    const res = await axios.post(`${ BASE_URL }/new/`, formData);
    return res.data;
  } catch (err) {
    console.error("Create item error:", err.response ? err.response.data : err);
    let detail = err.response?.data?.detail;
    if (typeof detail !== "string") {
      detail = JSON.stringify(detail);
    }
    throw new Error(
      detail || "Failed to create item. Please check all fields and try again."
    );
  }
};

const updateShippingAndPayment = async (formData, itemId) => {
  try {
    const res = await axios.post(`${ BASE_URL }/${ itemId }/shipping-and-payment`, formData);
    return res.data;
  } catch (err) {
    console.error("Create item error:", err.response ? err.response.data : err);
    let detail = err.response?.data?.detail;
    if (typeof detail !== "string") {
      detail = JSON.stringify(detail);
    }
    throw new Error(
      detail || "Failed to update shipping and payment info. Please check all fields and try again."
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
  updateShippingAndPayment
};
