import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext.jsx";
import { getItemById } from "../../../services/itemService.js";
import { createBid } from "../../../services/bidService.js";
import Hero from "../../Component/Hero/Hero.jsx";
import "./itemdetail.css";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { getUsername } from "../../../services/userService.js";
import BidHistoryModal from "../../Component/Modal/BidHistoryModal.jsx";

const ItemDetail = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const [seller, setSeller] = useState(null);
  const [message, setMessage] = useState("");
  const [showItem, setShowItem] = useState(false);
  const [messageType, setMessageType] = useState("");

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "hzxyensd5";
  const cld = new Cloudinary({ cloud: { cloudName } });

  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const itemData = await getItemById(itemId);
        setItem(itemData);
        const sellerData = await getUsername(itemData.owner.id);
        setSeller(sellerData);
        if (itemData && Array.isArray(itemData.images)) {
          setImages(itemData.images);
          if (itemData.images.length === 0) {
            setCurrentIndex(0);
          } else if (currentIndex > itemData.images.length - 1) {
            setCurrentIndex(itemData.images.length - 1);
          }
        } else {
          setImages([]);
          setCurrentIndex(0);
        }
      } catch (error) {
        console.error("Error fetching item:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemId]);

  const prevImage = () => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  };

  const nextImage = () => {
    setCurrentIndex((i) => Math.min(images.length - 1, i + 1));
  };

  const handleSubmitBid = async (e) => {
    e.preventDefault();
    const bidOffered = Number(
      e.target.elements["bid-offer-amount"].value
    ).toFixed(2);
    try {
      await createBid(itemId, bidOffered);
      const response = await getItemById(itemId);
      setItem(response);
      setMessage("Bid accepted, you are the highest bidder!");
      setMessageType("success");
    } catch (error) {
      setMessage(error.request.response || "Failed to place bid");
      setMessageType("error");
      console.log("Error Placing Bid:", error);
    }
  };

  if (loading) return <p>Loading item details...</p>;
  if (!item) return <p>Item not found.</p>;
  if (!user)
    return <p>Please register an account and log in to view item details.</p>;

  return (
    <div className="item-detail-container">
      <Hero heroText={item.item_name} seller={seller} />
      <div className="item-detail-section">
        <div className="details-top two-column-equal">
          {/* LEFT column: main image (50%) and thumbnails */}
          <div className="left-50">
            <div className="image-left-details">
              <div className="image-controls">
                <button
                  type="button"
                  className="carousel-btn left"
                  onClick={prevImage}
                  disabled={images.length <= 1}
                  aria-label="Previous image"
                >
                  ‹
                </button>
              </div>

              <div className="item-detail-image">
                {images.length === 0 ? (
                  <div className="gallery-placeholder">No images uploaded</div>
                ) : (
                  <AdvancedImage
                    key={images[currentIndex]}
                    cldImg={cld
                      .image(images[currentIndex])
                      .resize(fill().width(420).height(420))
                      .quality("auto")
                      .format("auto")}
                    plugins={[responsive(), placeholder()]}
                  />
                )}
              </div>

              <div className="image-controls">
                <button
                  type="button"
                  className="carousel-btn right"
                  onClick={nextImage}
                  disabled={images.length <= 1}
                  aria-label="Next image"
                >
                  ›
                </button>
              </div>
            </div>

            <div className="item-detail-image-gallery">
              {images.length === 0 ? (
                <div className="gallery-placeholder">No images</div>
              ) : (
                images.map((pid, idx) => (
                  <button
                    key={pid}
                    type="button"
                    className={`item-detail-thumb-btn ${
                      idx === currentIndex ? "active" : ""
                    }`}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Show image ${idx + 1}`}
                  >
                    <AdvancedImage
                      cldImg={cld
                        .image(pid)
                        .resize(fill().width(200).height(260))
                        .quality("auto:low")
                        .format("auto")}
                      plugins={[placeholder()]}
                      loading={idx === currentIndex ? "eager" : "lazy"}
                    />
                  </button>
                ))
              )}
            </div>
          </div>

          {/* RIGHT column: stacked sections (each takes a third of right column vertical space) */}
          <div className="right-50">
            {/* Top: Current Bid */}
            <div className="right-section current-bid-section">
              <div className="bid-info-section">
                <div className="bid-info-left">
                  <h2 className="item-detail-subtitle">Bid Information</h2>
                  <div className="current-bid">
                    Current Bid:{" "}
                    <span className="span-bold">
                      {item.current_bid ? `$${item.current_bid}` : "No Bids"}
                    </span>
                  </div>
                  <div className="initial-bid">
                    Initial Bid:{" "}
                    <span className="span-bold">${item.initial_bid}</span>
                  </div>
                  <div className="bid-end">
                    Time left:{" "}
                    <span className="span-bold">
                      {Math.ceil(
                        (new Date(item.end_time) - new Date()) /
                          (1000 * 60 * 60 * 24)
                      )}
                      day(s) left
                    </span>
                  </div>
                </div>
                <div className="bid-info-right">
                  {" "}
                  <h2 className="item-detail-subtitle">Bid Offer ($)</h2>
                  <div className="bid-form-wrap">
                    <form onSubmit={handleSubmitBid} className="bid-form">
                      <label htmlFor="bid-offer-amount"></label>
                      <div className="bid-label">
                        <input
                          className="bid-input"
                          type="number"
                          id="bid-offer-amount"
                          min={
                            item.current_bid
                              ? item.current_bid
                              : item.initial_bid
                          }
                          onChange={(e) => {
                            e.target.value = Number(e.target.value).toFixed(2);
                          }}
                          required
                        />
                        <button type="submit" className="bid-offer-button">
                          Submit Bid
                        </button>
                      </div>
                    </form>
                    <button
                      className="bid-history-button"
                      onClick={() => setShowItem(true)}
                    >
                      View Bid History
                    </button>
                  </div>
                  {showItem && (
                    <div className="modal">
                      <div className="modal-content">
                        <BidHistoryModal
                          onClose={() => setShowItem(false)}
                          bidHistory={item.bid_history_json}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {message && (
                <div
                  className={`error-message item-details ${
                    messageType === "success" ? "success-message" : ""
                  }`}
                >
                  {message}
                </div>
              )}
            </div>

            {/* Middle: Item Details */}
            <div className="right-section item-details-section">
              <div className="item-info-section">
                <h2 className="item-detail-subtitle">Item Details</h2>
                <div className="item-info-details-section">
                  <ul className="item-info-left details">
                    <li>
                      Category:{" "}
                      <span className="span-bold">{item.category}</span>
                    </li>
                    <li>
                      Condition:{" "}
                      <span className="span-bold">{item.condition}</span>
                    </li>
                    {item.manufacture_year && (
                      <li>
                        Manufacture Year:{" "}
                        <span className="span-bold">
                          {item.manufacture_year}
                        </span>
                      </li>
                    )}
                    {item.country_of_origin && (
                      <li>
                        Country of Origin:{" "}
                        <span className="span-bold">
                          {item.country_of_origin}
                        </span>
                      </li>
                    )}
                  </ul>
                  <ul className="item-info-right details">
                    <li>
                      Height:{" "}
                      <span className="span-bold">{item.height} cm</span>
                    </li>
                    <li>
                      Width: <span className="span-bold">{item.width} cm</span>
                    </li>
                    <li>
                      Length:{" "}
                      <span className="span-bold">{item.length} cm</span>
                    </li>
                    <li>
                      Weight:{" "}
                      <span className="span-bold">{item.weight} kg</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom: Item Description */}
            <div className="right-section item-description-section">
              <h2 className="item-description-subtitle">Item Description</h2>
              <div className="item-description">{item.description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
