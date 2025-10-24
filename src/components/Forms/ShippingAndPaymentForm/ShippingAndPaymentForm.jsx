import { useState } from "react";
import { updateShippingAndPayment } from "../../../services/itemService";

const ShippingAndPaymentForm = () => {
  const [formData, setFormData] = useState(
    (shipping_info = {
      first_name: "",
      last_name: "",
      street_address: "",
      city: "",
      state: "",
      postal_code: "",
      country: "",
      phone_number: "",
    }),
    (payment_confirmation = "")
  );

  const handleChange = (evt) => {
    setMessage("");
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  // check for payment input and set payment_confirmation as "Payment Confirmed"
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      // if (payment info) {formData.payment_confirmation = 'Payment Confirmed'}
      await updateShippingAndPayment(formData);
      navigate("/bidhub/home");
    } catch (err) {
      setMessage(err.message);
    }
  };

  // only have address form details here so far
  // need to add payment here and make a formData to send to updateShippingAndPayment(formData, itemId)
  return (
    <>
      <h2>Address</h2>

      <div className="form-columns">
        <div className="form-group">
          <input
            type="text"
            id="street_address"
            value={street_address}
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
            value={city}
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
            value={state}
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
            value={postal_code}
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
            value={country}
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
            value={phone_number}
            name="phone_number"
            onChange={handleChange}
            required
          />
          <label htmlFor="phone_number">Phone</label>
        </div>
      </div>
    </>
  );
};
