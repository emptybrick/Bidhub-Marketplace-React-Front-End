import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../../contexts/UserContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createItem } from "../../../services/itemService";
import { categories } from "../../../common/utils";
import "./itemform.css";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";

import UploadWidget from "../../Component/UploadWidget/UploadWidget";

const ItemForm = ({ onClose }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  // Cloudinary config (use Vite env or fallback)
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "hzxyensd5";
  const uploadPreset =
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "aoh4fpwm";
  const cld = new Cloudinary({ cloud: { cloudName } });

  // uploaded images state - store cloudinary public_ids
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleUploadSuccess = (publicId) => {
    if (!publicId) return;
    setImages((prev) => {
      const next = [...prev, publicId];
      // set to newly uploaded image so user sees it immediately
      setCurrentIndex(next.length - 1);
      return next;
    });
  };

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

  // widget config passed to UploadWidget
  const uwConfig = {
    cloudName,
    uploadPreset,
    multiple: true,
  };

  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    item_name: "",
    category: "MISCELLANEOUS",
    condition: "NEW",
    manufacture_year: "",
    country_of_origin: "",
    height: "",
    width: "",
    length: "",
    weight: "",
    description: "",
    initial_bid: "",
    end_time: null,
  });

  const {
    item_name,
    category,
    condition,
    manufacture_year,
    country_of_origin,
    height,
    width,
    length,
    weight,
    description,
    initial_bid,
    end_time,
  } = formData;

  const handleChange = (evt) => {
    setMessage("");
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, end_time: date });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const formattedFormData = {
        ...formData,
        end_time: end_time ? end_time.toISOString() : null,
        owner: user.id,
      };

      const newItem = await createItem(formattedFormData);

      if (onClose) {
        onClose();
      }

      navigate(`/bidhub/marketplace/${newItem.id}`);
    } catch (err) {
      console.error("Error creating item:", err);
      setMessage(err.message || "Error creating item. Please try again.");
    }
  };

  const isFormInvalid = () => {
    return !(
      item_name &&
      category &&
      condition &&
      height &&
      width &&
      length &&
      weight &&
      description &&
      initial_bid &&
      end_time
    );
  };

  return (
    <div className="modal">
      <div className="item-form-wrapper">
        <div className="item-form">
          <button className="form-close-btn" type="button" onClick={onClose}>
            ×
          </button>

          <h1>Create Auction Item</h1>

          {message && <div className="error-message">{message}</div>}

          <form onSubmit={handleSubmit}>
            {/* single-image display with carousel arrows on the left,
                upload + thumbnails on the right */}
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
                    <div className="gallery-placeholder">
                      No images uploaded
                    </div>
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
                <UploadWidget
                  uwConfig={uwConfig}
                  setPublicId={handleUploadSuccess}
                />
                <div className="upload-guidance">
                  <small>
                    Min 640×640px. Recommended 1600×1600px. Display ratio 3:4.
                  </small>
                </div>

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

            <div className="form-area">
              <div className="form-grid two-column">
                {/* LEFT column */}
                <div className="form-column">
                  <div className="form-field">
                    <label htmlFor="item_name">Item Name</label>
                    <input
                      type="text"
                      id="item_name"
                      value={item_name}
                      name="item_name"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="category">Category</label>
                    <select
                      id="category"
                      name="category"
                      value={category}
                      onChange={handleChange}
                    >
                      {categories.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-field">
                    <label htmlFor="condition">Condition</label>
                    <select
                      id="condition"
                      value={condition}
                      name="condition"
                      onChange={handleChange}
                      required
                    >
                      <option value="NEW">New</option>
                      <option value="USED">Used</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label htmlFor="manufacture_year">Year Made</label>
                    <input
                      type="text"
                      id="manufacture_year"
                      value={manufacture_year}
                      name="manufacture_year"
                      placeholder="Enter manufacture year. e.g. 2024"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* moved: Country of origin */}
                  <div className="form-field">
                    <label htmlFor="country_of_origin">Country</label>
                    <input
                      type="text"
                      id="country_of_origin"
                      value={country_of_origin}
                      name="country_of_origin"
                      placeholder="Enter country of origin"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* moved: Description */}
                  <div className="form-field description-field">
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      value={description}
                      name="description"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-column">
                  {/* MIDDLE column */}
                  <div className="form-field">
                    {/* dimensions and remaining fields stay here */}
                  </div>
                  <div className="dimensions-container moved">
                    <div className="form-field">
                      <label htmlFor="Dimensions">Dimensions (cm)</label>
                    </div>
                    <div className="dimensions-row">
                      <div className="form-field dimension">
                        <input
                          type="number"
                          id="height"
                          value={height}
                          name="height"
                          placeholder="height"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-field dimension">
                        <input
                          type="number"
                          id="width"
                          value={width}
                          name="width"
                          placeholder="width"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-field dimension">
                        <input
                          type="number"
                          id="length"
                          value={length}
                          name="length"
                          placeholder="length"
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="weight">Weight (kg)</label>
                    <input
                      type="number"
                      id="weight"
                      value={weight}
                      name="weight"
                      placeholder="Enter weight"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="initial_bid">Starting Bid ($)</label>
                    <input
                      type="number"
                      id="initial_bid"
                      value={initial_bid}
                      name="initial_bid"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="end_time">End Date & Time</label>
                    <DatePicker
                      selected={end_time}
                      onChange={handleDateChange}
                      showTimeSelect
                      dateFormat="MM/dd/yy h:mm aa"
                      placeholderText="Select date and time"
                      required
                      className="date-picker-input"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* end form-area */}

            <div className="form-buttons">
              <button type="submit" disabled={isFormInvalid()}>
                Create
              </button>
              <button
                type="button"
                onClick={() => {
                  if (onClose) {
                    onClose();
                  } else {
                    navigate("/bidhub/dashboard");
                  }
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ItemForm;
