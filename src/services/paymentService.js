import axios from "./axiosConfig";
const BASE_URL = `${ import.meta.env.VITE_BACK_END_SERVER_URL
  }/bidhub/payments`;

export const createOrder = async (itemId, shippingAddress) => {
  const { data } = await axios.post(`${BASE_URL}/create-order/`, {
    item_id: itemId,
    shipping_address: shippingAddress,
  });
  return data; // expect { order_id, ... }
};

export const captureOrder = async (orderId, payerId) => {
  const { data } = await axios.post(`${ BASE_URL }/capture-order/`, {
    order_id: orderId,
    payer_id: payerId,
  });
  return data;
};

export const getPaymentByItemId = async (itemId) => {
  const { data } = await axios.get(`${ BASE_URL }/get-payment/${ itemId }/`)
  return data;
}