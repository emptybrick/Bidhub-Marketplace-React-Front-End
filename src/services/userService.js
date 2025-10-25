import axios from "./axiosConfig";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/bidhub/auth`;

const getUser = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/user/`);
    return res.data;
  } catch (err) {
    console.log(err);
    localStorage.removeItem("token");
    return null;
  }
};

const updateUser = async (userData) => {
  try {
    // Use PATCH for partial update
    const res = await axios.patch(`${BASE_URL}/user/`, userData, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (err) {
    console.error("Error updating user:", err);
    console.error("Response data:", err.response?.data);
    console.error("Response status:", err.response?.status);
    // log Allow header if present (shows which methods are allowed)
    console.error("Allow header:", err.response?.headers?.allow);
    const serverMsg =
      err.response?.data?.detail ||
      err.response?.data ||
      err.message ||
      "Failed to update user profile";
    throw new Error(
      typeof serverMsg === "string" ? serverMsg : JSON.stringify(serverMsg)
    );
  }
};

const toggleFavorite = async (itemId) => {
  try {
    const response = await axios.post(`${ BASE_URL }/user/favorites/toggle/`, {
      item_id: itemId,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getFavorites = async () => {
  try {
    const response = await axios.get(`${ BASE_URL }/user/favorites/`);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getShippingInfo = async (itemId) => {
  try {
    const response = await axios.get(`${ BASE_URL }/user/items/${ itemId }/shipping`);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getUsername = async (sellerId) => {
  try {
    const response = await axios.get(`${ BASE_URL }/user/seller/${ sellerId }`);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getSellerProfile = async (sellerId) => {
  try {
    const response = await axios.get(`${ BASE_URL }/user/seller/${ sellerId }/profile`);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export { getUser, updateUser, toggleFavorite, getFavorites, getShippingInfo, getUsername, getSellerProfile };
