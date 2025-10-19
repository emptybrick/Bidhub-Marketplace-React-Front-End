import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext.jsx";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    first_name: "",
    last_name: "",
    // profile_image: "",
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

  const {
    email,
    password,
    password_confirmation,
    first_name,
    last_name,
    // profile_image,
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
    <main>
      <h1>Register</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
          <h1>Address</h1>
        </div>
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        {/* <div>
          <label htmlFor="profile_image">Profile Image URL:</label>
          <input
            type="text"
            id="profile_image"
            value={profile_image}
            name="profile_image"
            onChange={handleChange}
          />
        </div> */}
        <div>
          <button disabled={isFormInvalid()}>Register</button>
          <button onClick={() => navigate("/")}>Cancel</button>
        </div>
      </form>
    </main>
  );
};

export default RegisterPage;
