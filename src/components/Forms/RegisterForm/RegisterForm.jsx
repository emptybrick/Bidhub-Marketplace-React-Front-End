import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../../contexts/UserContext.jsx";
import "./registerform.css";
import { register } from "../../../services/authService.js";

const RegisterForm = ({ onClose }) => {
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
      navigate("/bidhub/home");
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
      last_name
    );
  };

  return (
    <div className="register-wrapper">
      <div className="register">
        <button className="form-close-btn" type="button" onClick={onClose}>
          ×
        </button>
        <h1>Register</h1>
        {message && <p className="error-message">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-columns">
            <div className="form-group">
              <input
                type="email"
                id="email"
                value={email}
                name="email"
                onChange={handleChange}
                required
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="form-group">
              <input
                type="text"
                id="username"
                value={username}
                name="username"
                onChange={handleChange}
                required
              />
              <label htmlFor="username">Username</label>
            </div>

            <div className="form-group">
              <input
                type="password"
                id="password"
                value={password}
                name="password"
                onChange={handleChange}
                required
              />
              <label htmlFor="password">Password</label>
            </div>

            <div className="form-group">
              <input
                type="text"
                id="first_name"
                value={first_name}
                name="first_name"
                onChange={handleChange}
                required
              />
              <label htmlFor="first_name">First Name</label>
            </div>

            <div className="form-group">
              <input
                type="text"
                id="last_name"
                value={last_name}
                name="last_name"
                onChange={handleChange}
                required
              />
              <label htmlFor="last_name">Last Name</label>
            </div>

            <div className="form-group">
              <input
                type="password"
                id="password_confirmation"
                value={password_confirmation}
                name="password_confirmation"
                onChange={handleChange}
                required
              />
              <label htmlFor="password_confirmation">Confirm Password</label>
            </div>
          </div>
          <div className="form-buttons">
            <button type="submit" disabled={isFormInvalid()}>
              Register
            </button>
            <button
              type="button"
              onClick={() => {
                if (onClose) {
                  onClose();
                } else {
                  navigate("/bidhub/home");
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

export default RegisterForm;
