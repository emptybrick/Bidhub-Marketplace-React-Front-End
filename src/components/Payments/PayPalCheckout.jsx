import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { createOrder, captureOrder } from "../../services/paymentService";
import { useState } from "react";

const PayPalCheckout = ({
  itemId,
  shippingAddress,
  onSuccess,
  onError,
}) => {
  const [loading, setLoading] = useState(false);

  const initialOptions = {
    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
    currency: "USD",
    intent: "capture",
  };

  const createOrderHandler = async () => {
    try {
      setLoading(true);
      const data = await createOrder(itemId, shippingAddress);
      return data.order_id;
    } catch (error) {
      console.error("Error creating order:", error);
      onError?.(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const onApproveHandler = async (data) => {
    try {
      setLoading(true);
      const result = await captureOrder(data.orderID, data.payerID);
      onSuccess?.(result);
    } catch (error) {
      console.error("Error capturing order:", error);
      onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="paypal-checkout-container">
      {loading && <div className="loading">Processing payment...</div>}
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          createOrder={createOrderHandler}
          onApprove={onApproveHandler}
          onError={(err) => {
            console.error("PayPal error:", err);
            onError?.(err);
          }}
          style={{
            layout: "vertical",
            color: "gold",
            shape: "rect",
            label: "paypal",
            height: 55,
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PayPalCheckout;
