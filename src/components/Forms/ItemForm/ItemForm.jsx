import { useState, useContext, useEffect, useMemo, useCallback } from "react";
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
// import { image } from "@cloudinary/url-gen/qualifiers/source";

const ItemForm = ({ onClose, item, handleDeleteItem }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  // Cloudinary config (use Vite env or fallback)
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dxvxebkhe";
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "web_unsigned";
  const uploadFolder = import.meta.env.VITE_CLOUDINARY_FOLDER || "bidhub/items";
  const cld = useMemo(() => new Cloudinary({ cloud: { cloudName } }), [cloudName]);

  // uploaded images state - store cloudinary public_ids
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleUploadSuccess = useCallback((publicId) => {
    if (!publicId) return;
    setImages((prev) => {
      const next = [...prev, publicId];
      // set to newly uploaded image so user sees it immediately
      setCurrentIndex(next.length - 1);
      return next;
    });
  }, []);

  useEffect(() => {
    // keep index in range when images change (depend only on images)
    setCurrentIndex((i) => {
      if (images.length === 0) return 0;
      return Math.min(i, images.length - 1);
    });
  }, [images]);

  const prevImage = () => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  };
  const nextImage = () => {
    setCurrentIndex((i) => Math.min(images.length - 1, i + 1));
  };

  // widget config passed to UploadWidget
  // memoize uwConfig so its reference doesn't change every render
  const uwConfig = useMemo(
    () => ({
      cloudName,
      uploadPreset,
      multiple: true,
      folder: uploadFolder,
      maxImageFileSize: 10_000_000, // 10MB
    }),
    [cloudName, uploadPreset, uploadFolder]
  );

  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    item_name: item?.item_name || "",
    category: item?.category || "MISCELLANEOUS",
    condition: item?.condition || "NEW",
    manufacture_year: item?.manufacture_year || "",
    country_of_origin: item?.country_of_origin || "",
    height: item?.height || "",
    width: item?.width || "",
    length: item?.length || "",
    weight: item?.weight || "",
    description: item?.description || "",
    initial_bid: item?.initial_bid || "",
    end_time: null,
    images: [],
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
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // use functional update to avoid clobbering state
  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, end_time: date }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
       const formattedFormData = {
         ...formData,
         end_time: formData.end_time ? formData.end_time.toISOString() : null,
         owner: user.id,
         images: images,
       };

      const newItem = await createItem(formattedFormData);
      if (item) {
         handleDeleteItem(item.id)
       }
      if (onClose) {
        onClose();
      }

      navigate(`/bidhub/marketplace/${newItem.id}`);
    } catch (err) {
      console.error("Error creating item:", err);
      setMessage(err.message|| "Error creating item. Please try again.");
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
      end_time &&
      images.length > 0
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
            {/* Top 50%: single-image display with carousel arrows on the left,
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
              <div className="form-grid three-column">
                {/* COLUMN 1 */}
                <div className="form-column">
                  <div className="form-field">
                    <label htmlFor="item_name">Item Name</label>
                    <input
                      type="text"
                      id="item_name"
                      value={item_name}
                      name="item_name"
                      onChange={handleChange}
                      maxLength={24}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="manufacture_year">Year Made</label>
                    <input
                      type="text"
                      id="manufacture_year"
                      value={manufacture_year}
                      name="manufacture_year"
                      placeholder="e.g. 2024"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="country_of_origin">Country</label>
                    <input
                      type="text"
                      id="country_of_origin"
                      value={country_of_origin}
                      name="country_of_origin"
                      placeholder="Country of origin"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* COLUMN 2 */}
                <div className="form-column">
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
                  </div>{" "}
                  <div className="dimensions-container">
                    <div className="form-field">
                      <label>Dimensions (cm)</label>
                    </div>
                    <div className="dimensions-row">
                      <div className="form-field dimension">
                        <input
                          type="number"
                          id="height"
                          value={height}
                          name="height"
                          placeholder="H"
                          onChange={handleChange}
                          min={0.01}
                          step={0.01}
                          required
                        />
                      </div>
                      <div className="form-field dimension">
                        <input
                          type="number"
                          id="width"
                          value={width}
                          name="width"
                          placeholder="W"
                          min={0.01}
                          step={0.01}
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
                          placeholder="L"
                          min={0.01}
                          step={0.01}
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
                      min={0.001}
                      step={0.001}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                {/* COLUMN 3 */}
                <div className="form-column">
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
              <div className="description-field">
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
