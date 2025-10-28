import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const API_BASE = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");
const CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID;
const CURRENCY = import.meta.env.VITE_PAYPAL_CURRENCY || "USD";


const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true, 
});

export default function PayPalCheckout ({ orderMeta }) {
  
  const createOrder = async () => {
    try {
      const res = await api.post("/paypal/create-order/", orderMeta ?? {});
      return res.data.id;
    } catch (err) {
      console.error("Error creating order:", err);
      throw err;
    }
  };

  const onApprove = async (data) => {
    try {
      await api.post(
        "/paypal/capture-order/",
        data,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      alert("Payment successful!");
    } catch (err) {
      console.error("Error capturing order:", err);
      alert("Payment failed.");
    }
  };

  const onError = (err) => {
    console.error("PayPal error:", err);
    alert("An error occurred.");
  };

  return (
    <div style={{ padding: 16 }}>
      <PayPalScriptProvider
        options={{
          "client-id": CLIENT_ID,
          currency: CURRENCY,
        }}
      >
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
        />
      </PayPalScriptProvider>
    </div>
  );
}