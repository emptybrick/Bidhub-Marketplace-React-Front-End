// src/components/Forms/ShippingAndPaymentForm/ShippingAndPaymentForm.jsx
import { useState } from "react";
import PayPalCheckout from "../../../components/Payments/PayPalCheckout";
import "./shippingandpaymentform.css";

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

  const [showPayPal, setShowPayPal] = useState(false);

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
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContinueToPayment = (e) => {
    e.preventDefault();
    const requiredFields = [
      "fullName",
      "address",
      "city",
      "state",
      "zipCode",
      "country",
    ];
    const isValid = requiredFields.every((field) => shippingInfo[field].trim());

    if (!isValid) {
      alert("Please fill in all required shipping information");
      return;
    }

    setShowPayPal(true);
  };

  const handlePaymentSuccess = (result) => {
    console.log("Payment successful:", result);
    onSuccess?.(result);
    onClose();
  };

  const handlePaymentError = (error) => {
    console.error("Payment error:", error);
    alert("Payment failed. Please try again.");
  };

  return (
    <div className="modal">
      <div className="shipping-wrapper">
        <div className="shipping">
          <button className="form-close-btn" onClick={onClose}>
            ×
          </button>

          <h2>Shipping & Payment</h2>

          <div className="shipping-content">
            {/* Left Column: Shipping Information */}
            <div className="shipping-left">
              <h3>Shipping Information</h3>
              <form onSubmit={handleContinueToPayment}>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={shippingInfo.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Address *</label>
                  <input
                    type="text"
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
                      type="text"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>State *</label>
                    <input
                      type="text"
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
                      type="text"
                      name="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Country *</label>
                    <input
                      type="text"
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
                    type="tel"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handleInputChange}
                  />
                </div>

                {!showPayPal && (
                  <button type="submit" className="btn-continue">
                    Continue to Payment
                  </button>
                )}
              </form>
            </div>

            {/* Right Column: Order Summary & Payment */}
            <div className="shipping-right">
              <h3>Order Summary</h3>
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

              {showPayPal && (
                <div className="payment-section">
                  <h3>Payment</h3>
                  <PayPalCheckout
                    itemId={item.id}
                    amount={item.current_bid}
                    shippingAddress={shippingInfo}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingAndPaymentForm;
