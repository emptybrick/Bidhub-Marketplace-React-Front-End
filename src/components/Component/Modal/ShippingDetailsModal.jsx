const ShippingDetailsModal = ({ shipping }) => {
  return (
    <div className="shipping-address-container">
      <ul className="shipping-address">
        <li>Full Name: {shipping.fullName}</li>
        <li>Address: {shipping.address}</li>
        <li>
          {shipping.zipCode} {shipping.city}, {shipping.state}{" "}
          {shipping.country}
        </li>
        <li>Phone #: {shipping.phone}</li>
      </ul>
    </div>
  );
};

export default ShippingDetailsModal;
