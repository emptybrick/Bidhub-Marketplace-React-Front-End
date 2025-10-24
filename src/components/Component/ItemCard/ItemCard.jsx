import { useNavigate } from "react-router-dom";
import "../../Views/ItemList/itemlist.css";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";

const ItemCard = ({ item, isPlaceholder = false, onFavoriteToggle, sold = 'false', purchased = 'false' }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "hzxyensd5";
  const cld = new Cloudinary({ cloud: { cloudName } });

  const [images, setImages] = useState([]);
  const [ currentIndex, setCurrentIndex ] = useState(0);
  
  useEffect(() => {
    console.log(item)
    // Ensure item and item.images exist before setting images
    if (item && Array.isArray(item.images)) {
      setImages(item.images); // item.images is already an array
      if (item.images.length === 0) {
        setCurrentIndex(0);
      } else if (currentIndex > item.images.length - 1) {
        setCurrentIndex(item.images.length - 1);
      }
    } else {
      setImages([]); // Set to empty array if no images
      setCurrentIndex(0);
    }
  }, [item]); // Depend on item, not currentIndex

  const prevImage = () => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  };

  const nextImage = () => {
    setCurrentIndex((i) => Math.min(images.length - 1, i + 1));
  };

  const handleLink = () => {
    if (!isPlaceholder) {
      navigate(`/bidhub/marketplace/${item.id}`);
    }
  };

  const handleShowShippingModal = () => {
    // add logic here
  }

  if (isPlaceholder) {
    return <div className="item-card placeholder" />;
  }

  return (
    <div className="item-card">
      <div className="heading">
        <span>{purchased === "true" || sold === "true"
                ? '' : item.item_name }</span>
        {sold === "true" && (
          <>
            <span className="shipping-payment-details">
              {item.shipping_info.street_address
                ? "Shipping Info Received"
                : "Shipping Info Pending"}
            </span>
            <span className="shipping-payment-details">
              {item.payment_confirmation
                ? "Payment Confirmed"
                : "Payment Pending"}
            </span>
          </>
        )}
        {purchased === "true" && (
          <>
            <span className="shipping-payment-details">
              {item.shipping_info.street_address
                ? "Shipping Sent"
                : "Awaiting Shipping Info"}
            </span>
            <span className="shipping-payment-details">
              {item.payment_confirmation ? "Payment Sent" : "Awaiting Payment"}
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
              { item.current_bid }
            </div>
          </div>
          <div className="item-card-right">
            {user && (
              <>
                {item.shipping_info.street_address && sold === "true" && (
                  <button
                    className="view-details"
                    onClick={() => handleShowShippingModal()}
                  >
                    View Shipping Info
                  </button>
                )}
                {purchased === "true" && (
                  <button
                    className="view-details"
                    onClick={() => handleShowShippingModal()}
                  >
                    {item.payment_confirmation
                      ? "Update Shipping or Payment Info"
                      : "Add Shipping and Payment Info"}
                  </button>
                )}
                <button className="view-details" onClick={() => handleLink()}>
                  View Details
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
