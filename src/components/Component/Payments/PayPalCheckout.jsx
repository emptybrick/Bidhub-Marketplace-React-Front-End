// src/components/Payments/PayPalCheckout.jsx
import React from "react";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const API_BASE = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");
const CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID;
const CURRENCY = import.meta.env.VITE_PAYPAL_CURRENCY || "USD";

// centralised axios instance
const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // if cookies/CSRF is used
});

export default function PayPalCheckout({ orderMeta }) {
  /**
   * orderMeta is optional and can include anything that is required to pass to the backend,
   * e.g. { itemId, amount, quantity }
   * Django view can read this to build a PayPal order server-side.
   */

  const createOrder = async () => {
    try {
      const res = await api.post("/paypal/create-order/", orderMeta ?? {});
      // Backend should return { id: "<paypal order id>" }
      return res.data.id;
    } catch (err) {
      console.error("Error creating order:", err);
      throw err;
    }
  };

  const onApprove = async (data) => {
    try {
      // Ifbackend expects form-encoded: keep this header.
      // If JSON is fine, send JSON instead and remove headers.
      await api.post(
        "/paypal/capture-order/",
        data,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      alert("Payment successful!");
      // TODO: navigate to success page, refresh order, etc.
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
          // Optional: intent, vault, components, etc.
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