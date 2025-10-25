import { useNavigate } from "react-router-dom";
import "../../Views/ItemList/itemlist.css";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import ShippingAndPaymentForm from "../../Forms/ShippingAndPaymentForm/ShippingAndPaymentForm";
import ItemForm from "../../Forms/ItemForm/ItemForm";
import { deleteItem } from "../../../services/itemService";
import { getPaymentByItemId } from "../../../services/paymentService";

const ItemCard = ({
  item,
  isPlaceholder = false,
  onFavoriteToggle,
  sold = "false",
  purchased = "false",
  onUpdate,
  auctionFailed,
}) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "hzxyensd5";
  const cld = new Cloudinary({ cloud: { cloudName } });

  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showShippingAndPayment, setShowShippingAndPayment] = useState(false);
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [showItemForm, setShowItemForm] = useState(false);
  const [toggleRefresh, setToggleRefresh] = useState(false);
  const [payment, setPayment] = useState(null);

  const fetchPayment = async (itemId) => {
    const paymentData = await getPaymentByItemId(itemId);
    if (paymentData) {
      setPayment(payment);
    }
  };

  useEffect(() => {
    if (item && Array.isArray(item.images)) {
      setImages(item.images);
      if (item.images.length === 0) {
        setCurrentIndex(0);
      } else if (currentIndex > item.images.length - 1) {
        setCurrentIndex(item.images.length - 1);
      }
      if (sold === "true" || purchased === "true") {
        fetchPayment(item.id);
      }
    } else {
      setImages([]);
      setCurrentIndex(0);
    }
  }, [item, toggleRefresh]); // keep dependency minimal

  const prevImage = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const nextImage = () =>
    setCurrentIndex((i) => Math.min(images.length - 1, i + 1));

  const handleLink = () => {
    if (!isPlaceholder) navigate(`/bidhub/marketplace/${item.id}`);
  };

  const handleShowShippingModal = () => {
    setShowShippingAndPayment(true);
  };

  const handleCloseShippingModal = () => {
    setShowShippingAndPayment(false);
  };

  const handleShowItemForm = () => {
    setShowItemForm(true);
  };

  const handleCheckout = () => {
    console.log("Item being passed:", item); // Debug: check if item exists
    setShowShippingForm(true);
  };

  const handlePaymentSuccess = (result) => {
    console.log("Payment completed:", result);
    setShowShippingForm(false);
    onUpdate?.(); // Refresh item list
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await deleteItem(itemId);
      setToggleRefresh(!toggleRefresh);
    } catch (err) {
      console.log("Error deleting item.", err);
    }
  };

  if (isPlaceholder) return <div className="item-card placeholder" />;

  return (
    <>
      <div className="item-card">
        <div className="heading">
          <span>
            {purchased === "true" || sold === "true" ? "" : item.item_name}
          </span>

          {sold === "true" && (
            <>
              <span className="shipping-payment-details">
                {payment
                  ? "Shipping Info Received"
                  : "Shipping Info Pending"}
              </span>
              <span className="shipping-payment-details">
                {payment
                  ? `${payment.status}`
                  : "Payment Pending"}
              </span>
            </>
          )}

          {purchased === "true" && (
            <>
              <span className="shipping-payment-details">
                {payment ? "Shipping Sent" : "Awaiting Shipping Info"}
              </span>
              <span className="shipping-payment-details">
                {payment ? `${payment.status}` : "Awaiting Payment"}
              </span>
            </>
          )}

          <span>
            {user ? (
              <FavoriteButton
                itemId={item?.id}
                onFavoriteToggle={onFavoriteToggle}
              />
            ) : (
              ""
            )}
          </span>
        </div>

        <div className="box">
          <div className="item-card-image-section">
            <div className="item-card-image">
              {images.length === 0 ? (
                <div className="gallery-placeholder">No images uploaded</div>
              ) : (
                <AdvancedImage
                  cldImg={cld
                    .image(images[currentIndex])
                    .resize(fill().width(300).height(400))}
                  plugins={[responsive(), placeholder()]}
                />
              )}
            </div>

            <div className="image-buttons">
              <button
                type="button"
                className="item-card-image-button-left"
                onClick={prevImage}
                disabled={images.length <= 1}
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                type="button"
                className="item-card-image-button-right"
                onClick={nextImage}
                disabled={images.length <= 1}
                aria-label="Next image"
              >
                ›
              </button>
            </div>
          </div>

          <div className="item-card-bottom">
            <div className="item-card-left">
              <div className="info">
                {purchased === "true" || sold === "true"
                  ? item.item_name
                  : item.description}
              </div>
              <div>
                {purchased === "true" || sold === "true"
                  ? "Final Bid: $"
                  : "Current Bid: $"}
                {item.current_bid}
              </div>
            </div>

            <div className="item-card-right">
              {user && (
                <>
                  {item.shipping_info?.street_address && sold === "true" && (
                    <button
                      className="view-details"
                      onClick={handleShowShippingModal}
                    >
                      View Shipping Info
                    </button>
                  )}

                  {purchased === "true" && (
                    <button className="view-details" onClick={handleCheckout}>
                      {item.payment_confirmation
                        ? "Update Shipping or Payment Info"
                        : "Add Shipping and Payment Info"}
                    </button>
                  )}

                  {auctionFailed === "true" && (
                    <button
                      className="view-details"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      Delete Item
                    </button>
                  )}

                  {auctionFailed === "true" ? (
                    <button
                      className="view-details"
                      onClick={handleShowItemForm}
                    >
                      Repost Item
                    </button>
                  ) : (
                    <button className="view-details" onClick={handleLink}>
                      View Details
                    </button>
                  )}
                </>
              )}
            </div>

            {/* Modal */}
            <div className="review-form">
              {showShippingAndPayment && (
                <div className="modal" role="dialog" aria-modal="true">
                  <div className="modal-content">
                    <button
                      className="close-button"
                      onClick={handleCloseShippingModal}
                      aria-label="Close"
                    >
                      ✕
                    </button>

                    {/* Pass only what the form actually needs; remove undefined props */}
                    <ShippingAndPaymentForm
                      onClose={handleCloseShippingModal}
                      itemId={item?.id}
                      // amount / quantity can be added here if your form needs them
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Render modal only when showShippingForm is true AND item exists */}
      {showShippingForm && item && (
        <ShippingAndPaymentForm
          item={item}
          onClose={() => setShowShippingForm(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
      {showItemForm && item && (
        <ItemForm item={item} handleDeleteItem={handleDeleteItem} />
      )}
    </>
  );
};

export default ItemCard;
