import { useNavigate } from "react-router-dom";
import "../../Views/ItemList/itemlist.css";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import { scale } from "@cloudinary/url-gen/actions/resize";
import ShippingAndPaymentForm from "../../Forms/ShippingAndPaymentForm/ShippingAndPaymentForm";
import ItemForm from "../../Forms/ItemForm/ItemForm";
import { deleteItem } from "../../../services/itemService";
import { getPaymentByItemId } from "../../../services/paymentService";
import ShippingDetailsModal from "../Modal/ShippingDetailsModal";

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
  const [showShippingModal, setShowShippingModal] = useState(false);
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [showItemForm, setShowItemForm] = useState(false);
  const [toggleRefresh, setToggleRefresh] = useState(false);
  const [payment, setPayment] = useState(null);

  const fetchPayment = async (itemId) => {
    const paymentData = await getPaymentByItemId(itemId);
    if (paymentData) {
      setPayment(paymentData);
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
  }, [item, toggleRefresh]);

  const prevImage = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const nextImage = () =>
    setCurrentIndex((i) => Math.min(images.length - 1, i + 1));

  const handleLink = () => {
    if (!isPlaceholder) navigate(`/bidhub/marketplace/${item.id}`);
  };

  const handleShowItemForm = () => {
    setShowItemForm(true);
  };

  const handleCheckout = () => {
    setShowShippingForm(true);
  };

  const handlePaymentSuccess = (result) => {
    setShowShippingForm(false);
    onUpdate?.(); 
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
                {payment ? "Shipping Info Received" : "Shipping Info Pending"}
              </span>
              <span className="shipping-payment-details">
                {payment ? `Payment Confirmed` : "Payment Pending"}
              </span>
            </>
          )}

          {purchased === "true" && (
            <>
              <span className="shipping-payment-details">
                {payment ? "Shipping Sent" : "Awaiting Shipping Info"}
              </span>
              <span className="shipping-payment-details">
                {payment ? `Payment Sent` : "Awaiting Payment"}
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
                <div className="image-wrapper">
                  <AdvancedImage
                    cldImg={cld
                      .image(images[currentIndex])
                      .resize(scale().width(300))
                      .quality("auto")
                      .format("auto")}
                    plugins={[responsive(), placeholder()]}
                  />
                </div>
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
                  : "Current Bid: "}
                {item.current_bid ? `${item.current_bid}` : "No Bids"}
              </div>
            </div>

            <div className="item-card-right">
              {user && (
                <>
                  {payment && sold === "true" && (
                    <button
                      className="view-details"
                      onClick={() => setShowShippingModal(true)}
                    >
                      View Shipping Info
                    </button>
                  )}

                  {purchased === "true" && (
                    <button className="view-details" onClick={handleCheckout}>
                      {payment
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
          </div>
        </div>
      </div>

      {showShippingForm && item && (
        <ShippingAndPaymentForm
          item={item}
          onClose={() => setShowShippingForm(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
      {showItemForm && item && (
        <ItemForm
          onClose={() => setShowItemForm(false)}
          item={item}
          handleDeleteItem={handleDeleteItem}
        />
      )}

      {payment && showShippingModal && (
        <div className="modal">
          <div className="modal-content">
            <ShippingDetailsModal
              onClose={() => setShowShippingModal(false)}
              shipping={payment.shipping_address}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ItemCard;
