import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../../contexts/UserContext.jsx";
import "./registerform.css";
import { register } from "../../../services/authService.js";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    first_name: "",
    last_name: "",
    username: "",
    street_address: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    phone_number: "",
    wallet: "",
    user_rating: "",
  });

  // Destructure formData
  const {
    email,
    password,
    password_confirmation,
    first_name,
    last_name,
    username,
    street_address,
    city,
    state,
    postal_code,
    country,
    phone_number,
    wallet,
    user_rating,
  } = formData;

  const handleChange = (evt) => {
    setMessage("");
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const newUser = await register(formData);
      setUser(newUser);
      navigate("/");
    } catch (err) {
      setMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return !(
      email &&
      username &&
      password &&
      password === password_confirmation &&
      first_name &&
      last_name &&
      street_address &&
      city &&
      state &&
      postal_code &&
      country &&
      phone_number
    );
  };

  return (
    <div className="register-form-container">
      <h1>Register</h1>
      {message && <p className="error-message">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-columns">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              name="email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              name="username"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              name="password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="first_name">First Name:</label>
            <input
              type="text"
              id="first_name"
              value={first_name}
              name="first_name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="last_name">Last Name:</label>
            <input
              type="text"
              id="last_name"
              value={last_name}
              name="last_name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password_confirmation">Confirm Password:</label>
            <input
              type="password"
              id="password_confirmation"
              value={password_confirmation}
              name="password_confirmation"
              onChange={handleChange}
              required
            />
          </div>

          <h2 style={{ gridColumn: "1 / -1", marginBottom: "0.5rem" }}>
            Address
          </h2>

          <div className="form-group">
            <label htmlFor="street_address">Street Address:</label>
            <input
              type="text"
              id="street_address"
              value={street_address}
              name="street_address"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              value={city}
              name="city"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="state">State:</label>
            <input
              type="text"
              id="state"
              value={state}
              name="state"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="postal_code">Postal Code:</label>
            <input
              type="text"
              id="postal_code"
              value={postal_code}
              name="postal_code"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              id="country"
              value={country}
              name="country"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone_number">Phone Number:</label>
            <input
              type="text"
              id="phone_number"
              value={phone_number}
              name="phone_number"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-buttons">
          <button type="submit" disabled={isFormInvalid()}>
            Register
          </button>
          <button type="button" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
