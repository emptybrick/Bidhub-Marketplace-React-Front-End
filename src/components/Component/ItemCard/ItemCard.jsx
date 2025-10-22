import { useNavigate } from "react-router-dom";
import "../../Views/ItemList/itemlist.css";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";


const ItemCard = ({ item, isPlaceholder = false, onFavoriteToggle }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "hzxyensd5";
  const cld = new Cloudinary({ cloud: { cloudName } });

    const [images, setImages] = useState([]);
  const [ currentIndex, setCurrentIndex ] = useState(0);
  
    useEffect(() => {
      // keep index in range when images change
      if (images.length === 0) {
        setCurrentIndex(0);
      } else if (currentIndex > images.length - 1) {
        setCurrentIndex(images.length - 1);
      }
    }, [images, currentIndex]);

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

  if (isPlaceholder) {
    return <div className="item-card placeholder" />;
  }
  return (
    <div className="item-card">
      <div className="heading">
        <span>{item.item_name}</span>
        <span>
          {user ? (
            <FavoriteButton
              itemId={item.id}
              onFavoriteToggle={onFavoriteToggle}
            />
          ) : (
            ""
          )}
        </span>
      </div>
      <div className="box">
        <div className="item-card-image">
          <div className="image-display">
            <div className="image-left">
              <button
                type="button"
                className="carousel-btn left"
                onClick={prevImage}
                disabled={images.length <= 1}
                aria-label="Previous image"
              >
                ‹
              </button>

              <div className="image-card">
                {images.length === 0 ? (
                  <div className="gallery-placeholder">No images uploaded</div>
                ) : (
                  <AdvancedImage
                    cldImg={cld
                      .image(images[currentIndex])
                      .resize(fill().width(1200).height(1600))}
                    plugins={[responsive(), placeholder()]}
                  />
                )}
              </div>

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
            <div className="image-right">
              <div className="image-gallery">
                {images.length === 0 ? (
                  <div className="gallery-placeholder">No images</div>
                ) : (
                  images.map((pid, idx) => (
                    <button
                      key={pid}
                      type="button"
                      className={`thumb-btn ${
                        idx === currentIndex ? "active" : ""
                      }`}
                      onClick={() => setCurrentIndex(idx)}
                      aria-label={`Show image ${idx + 1}`}
                    >
                      <img
                        src={cld
                          .image(pid)
                          .resize(fill().width(300).height(400))
                          .toURL()}
                        alt={`upload-${idx}`}
                      />
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="item-card-bottom">
          <div className="item-card-left">
            <div className="info">{item.description}</div>
            <div>Current Bid: ${item.current_bid}</div>
          </div>
          <div className="item-card-right">
            {user ? (
              <button className="view-details" onClick={() => handleLink()}>
                View Details
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
