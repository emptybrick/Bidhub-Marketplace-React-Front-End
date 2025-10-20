import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../../contexts/UserContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createItem } from "../../../services/itemService";
import { categories } from "../../../common/utils";
import "./itemform.css";

const ItemForm = ({ onClose }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
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
    <div className="item-form-wrapper">
      <div className="item-form">
        <h1>Create Auction Item</h1>
        {message && <div className="error-message">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Left column */}
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
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="country_of_origin">Country</label>
                <input
                  type="text"
                  id="country_of_origin"
                  value={country_of_origin}
                  name="country_of_origin"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="dimensions-container">
                <label>Dimensions (cm)</label>
                <div className="dimensions-row">
                  <div className="form-field dimension">
                    <input
                      type="number"
                      id="height"
                      value={height}
                      name="height"
                      placeholder="Height"
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
                      placeholder="Width"
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
                      placeholder="Length"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="form-column">
              <div className="form-field">
                <label htmlFor="weight">Weight (kg)</label>
                <input
                  type="number"
                  id="weight"
                  value={weight}
                  name="weight"
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
          </div>

          <div className="form-buttons">
            <button type="submit" disabled={isFormInvalid()}>
              Create
            </button>
            <button
              type="button"
              onClick={() => {
                if (onClose) {
                  onClose(); // Use the same close function as the X button
                } else {
                  navigate("/bidhub/dashboard"); // If opened directly, go to dashboard
                }
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemForm;
