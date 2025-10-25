import axios from "./axiosConfig";

const BASE_URL = "/bidhub/payments";

export const createOrder = async (itemId, shippingAddress) => {
  try {
    const response = await axios.post(`${BASE_URL}/create-order/`, {
      item_id: itemId,
      shipping_address: shippingAddress,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const captureOrder = async (orderId, payerId) => {
  try {
    const response = await axios.post(`${BASE_URL}/capture-order/`, {
      order_id: orderId,
      payer_id: payerId,
    });
    return response.data;
  } catch (error) {
    console.error("Error capturing order:", error);
    throw error;
  }
};

export const getPaymentHistory = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/history/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching payment history:", error);
    throw error;
  }
};
