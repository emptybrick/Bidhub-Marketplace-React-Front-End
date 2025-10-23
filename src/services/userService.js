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

const updateUser = async (userId, userData) => {
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

export { getUser, updateUser };
