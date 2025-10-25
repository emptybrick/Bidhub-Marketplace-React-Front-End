import axios from "./axiosConfig";

export const createOrder = async (itemId, shippingAddress) => {
  const { data } = await axios.post("/bidhub/payments/create-order/", {
    item_id: itemId,
    shipping_address: shippingAddress,
  });
  return data; // expect { order_id, ... }
};

export const captureOrder = async (orderId, payerId) => {
  const { data } = await axios.post("/bidhub/payments/capture-order/", {
    order_id: orderId,
    payer_id: payerId,
  });
  return data;
};
