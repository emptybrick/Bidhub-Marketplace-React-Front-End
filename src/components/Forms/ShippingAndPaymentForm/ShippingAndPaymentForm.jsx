import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { PayPalButtons } from "@paypal/react-paypal-js"; // Only for inline checkout here (see Option B)
import { updateShippingAndPayment } from "../../../services/itemService";

const ShippingAndPaymentForm = ({ amount: amountProp }) => {
  const navigate = useNavigate();
  const { itemId } = useParams(); // if this form sits under a route with :itemId
  const [message, setMessage] = useState("");

  // Form initial state
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    street_address: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    phone_number: "",
    payment_confirmation: "" // set this after capture
  });

  const handleChange = (evt) => {
    setMessage("");
    setFormData((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await updateShippingAndPayment(formData); // include itemId?
      navigate("/bidhub/home");
    } catch (err) {
      setMessage(err.message || "Failed to save address");
    }
  };

  // --- Trigger checkout (navigate) ---
  // Prefer getting price from props/context/selected item; fallback to a safe default:
  const amount = amountProp ?? 1.0;
  const quantity = 1;

  const requiredFilled = [
    "street_address",
    "city",
    "state",
    "postal_code",
    "country",
    "phone_number",
  ].every((k) => String(formData[k] || "").trim().length > 0);

  const handleBuyNow = () => {
    // Pass everything checkout page needs
    navigate("/bidhub/checkout", {
      state: {
        itemId,
        amount,
        quantity,
        shipping: formData
      }
    });
  };

  return (
    <>
      <h2>Address</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-columns">
          <div className="form-group">
            <input
              type="text"
              id="street_address"
              value={formData.street_address}
              name="street_address"
              onChange={handleChange}
              required
            />
            <label htmlFor="street_address">Street</label>
          </div>

          <div className="form-group">
            <input
              type="text"
              id="city"
              value={formData.city}
              name="city"
              onChange={handleChange}
              required
            />
            <label htmlFor="city">City</label>
          </div>

          <div className="form-group">
            <input
              type="text"
              id="state"
              value={formData.state}
              name="state"
              onChange={handleChange}
              required
            />
            <label htmlFor="state">State</label>
          </div>

          <div className="form-group">
            <input
              type="text"
              id="postal_code"
              value={formData.postal_code}
              name="postal_code"
              onChange={handleChange}
              required
            />
            <label htmlFor="postal_code">Postal Code</label>
          </div>

          <div className="form-group">
            <input
              type="text"
              id="country"
              value={formData.country}
              name="country"
              onChange={handleChange}
              required
            />
            <label htmlFor="country">Country</label>
          </div>

          <div className="form-group">
            <input
              type="text"
              id="phone_number"
              value={formData.phone_number}
              name="phone_number"
              onChange={handleChange}
              required
            />
            <label htmlFor="phone_number">Phone</label>
          </div>
        </div>

        {/* Save address (optional workflow) */}
        <button type="submit">Save Address</button>

        {/* 🔹 Trigger checkout from here */}
        <button
          type="button"
          onClick={handleBuyNow}
          disabled={!requiredFilled}
          className="paypal-buy-now"
          style={{ marginLeft: 12 }}
        >
          Buy with PayPal
        </button>

        {message && <p className="error">{message}</p>}
      </form>

      {/*
        OPTION B (Inline checkout here instead of navigating):
        <PayPalButtons
          style={{ layout: "horizontal" }}
          createOrder={...}   // call backend
          onApprove={async (data) => {
            await api.capture(...);
            await updateShippingAndPayment({ ...formData, payment_confirmation: "Payment Confirmed" });
            navigate("/bidhub/home");
          }}
          onError={(err) => setMessage("Payment error")}
        />
        (Ensure a PayPalScriptProvider wraps this component or a parent)
      */}
    </>
  );
};

export default ShippingAndPaymentForm;