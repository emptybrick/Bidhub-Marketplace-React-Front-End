import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import {
  createOrder as apiCreateOrder,
  captureOrder as apiCaptureOrder,
} from "../../../services/paymentService";
import "../form.css";

const ShippingAndPaymentForm = ({ item, onClose, onSuccess }) => {
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  if (!item) {
    return (
      <div className="modal">
        <div className="shipping-wrapper">
          <div className="shipping">
            <button className="form-close-btn" onClick={onClose}>
              ×
            </button>
            <div className="error-message">
              Item information is not available. Please try again.
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const isShippingValid = () => {
    const required = [
      "fullName",
      "address",
      "city",
      "state",
      "zipCode",
      "country",
    ];
    return required.every(
      (k) => String(shippingInfo[k] || "").trim().length > 0
    );
  };

  return (
    <div className="modal">
      <div className="form-wrapper">
        <div className="form-container">
          <button className="form-close-btn" onClick={onClose}>
            ×
          </button>
          <h2 className="form-title">Shipping & Payment</h2>
          <div className="form-content">
            <div className="form-left">
              <h3 className="form-subtitle">Shipping Information</h3>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    name="fullName"
                    value={shippingInfo.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Address *</label>
                  <input
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City *</label>
                    <input
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>State *</label>
                    <input
                      name="state"
                      value={shippingInfo.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Zip Code *</label>
                    <input
                      name="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Country *</label>
                    <input
                      name="country"
                      value={shippingInfo.country}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </form>
            </div>
            <div className="form-right">
              <h3 className="form-subtitle">Order Summary</h3>
              <div className="order-summary">
                <div className="summary-item">
                  <span>Item:</span>
                  <span>{item.item_name}</span>
                </div>
                <div className="summary-item">
                  <span>Price:</span>
                  <span>${item.current_bid}</span>
                </div>
                <div className="summary-item total">
                  <span>Total:</span>
                  <span>${item.current_bid}</span>
                </div>
              </div>
              <div className="payment-section">
                <h3 className="form-subtitle">Payment</h3>
                {isProcessing && (
                  <div className="loading">Processing payment...</div>
                )}
                <PayPalButtons
                  style={{
                    layout: "vertical",
                    color: "gold",
                    shape: "rect",
                    label: "paypal",
                    height: 50,
                  }}
                  onClick={(_, actions) => {
                    if (!isShippingValid()) {
                      alert(
                        "Please fill in all required shipping information."
                      );
                      return actions.reject();
                    }
                    return actions.resolve();
                  }}
                  createOrder={async () => {
                    try {
                      const data = await apiCreateOrder(item.id, shippingInfo);
                      if (!data?.order_id)
                        throw new Error("No order_id returned");
                      return data.order_id;
                    } catch (err) {
                      console.error("createOrder failed:", err);
                      alert(
                        `Could not initiate PayPal Checkout. ${
                          err.message || err
                        }`
                      );
                      throw err;
                    }
                  }}
                  onApprove={async (data, actions) => {
                    try {
                      const res = await apiCaptureOrder(
                        data.orderID,
                        data.payerID
                      );
                      onSuccess?.(res);
                      alert("Payment successful!");
                      onClose();
                    } catch (err) {
                      console.error("captureOrder failed:", err);
                      alert(
                        `Sorry, your transaction could not be processed. ${
                          err.message || err
                        }`
                      );
                      if (actions?.restart) return actions.restart();
                    }
                  }}
                  onError={(err) => {
                    console.error("PayPal error:", err);
                    alert("An error occurred with PayPal. Please try again.");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingAndPaymentForm;
