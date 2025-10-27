const ShippingDetailsModal = ({ shipping, onClose }) => {
  return (
    <div className="shipping-address-container">
      <h2>Shipping Address</h2>
      <ul className="shipping-address">
        <li>{shipping.fullName}</li>
        <li>{shipping.address}</li>
        <li>
          {shipping.zipCode} {shipping.city}, {shipping.state}{" "}
          {shipping.country}
        </li>
        <li>Phone #: {shipping.phone}</li>
      </ul>
      <button className="form-close-btn" onClick={onClose}>
        X
      </button>
    </div>
  );
};

export default ShippingDetailsModal;
