import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createItem } from "../../../services/itemService";
import { categories } from "../../../common/utils";

const ItemForm = () => {
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

  //   const [selectedCategory, setSelectedCategory] = useState("MISCELLANEOUS");

  //   const handleCategoryChange = (event) => {
  //     setSelectedCategory(event.target.value);
  //   };

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
        end_time: end_time ? end_time.toISOString() : null, // Convert to ISO string
      };
      const newItem = await createItem(formattedFormData);
      navigate(`bidhub/marketplace/${newItem.id}`);
    } catch (err) {
      setMessage(err.message);
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
    <main>
      <h1>Create Item</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="item_name">Item Name:</label>
          <input
            type="text"
            id="item_name"
            value={item_name}
            name="item_name"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
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
        <div>
          <label htmlFor="condition">Condition:</label>
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
        <div>
          <label htmlFor="manufacture_year">Manufacture Year:</label>
          <input
            type="text"
            id="manufacture_year"
            value={manufacture_year}
            name="manufacture_year"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="country_of_origin">Country of Origin:</label>
          <input
            type="text"
            id="country_of_origin"
            value={country_of_origin}
            name="country_of_origin"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="height">Height (cm):</label>
          <input
            type="text"
            id="height"
            value={height}
            name="height"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="width">Width (cm):</label>
          <input
            type="text"
            id="width"
            value={width}
            name="width"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="length">Length (cm):</label>
          <input
            type="text"
            id="length"
            value={length}
            name="length"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="weight">Weight (kg):</label>
          <input
            type="text"
            id="weight"
            value={weight}
            name="weight"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            name="description"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="initial_bid">Starting Bid:</label>
          <input
            type="text"
            id="initial_bid"
            value={initial_bid}
            name="initial_bid"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="end_time">Auction End Time:</label>
          <DatePicker
            selected={end_time}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="Pp"
            placeholderText="Select Date and Time"
            required
          />
        </div>
        <div>
          <button disabled={isFormInvalid()}>Create</button>
          <button onClick={() => navigate("/")}>Cancel</button>
        </div>
      </form>
    </main>
  );
};

export default ItemForm;
