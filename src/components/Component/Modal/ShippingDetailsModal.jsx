// render popup with shipping details for seller view
const ShippingDetailsModal = ({shipping}) => {
  return (
    <ul>
      <li>{ shipping.fullName}</li>
      <li>{ shipping.address}</li>
      <li>{ shipping.city}</li>
      <li>{ shipping.zipCode}</li>
      <li>{ shipping.country}</li>
      <li>{ shipping.phone}</li>
    </ul>
  )
};

export default ShippingDetailsModal;
