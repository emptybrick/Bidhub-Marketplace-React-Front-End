import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../../contexts/UserContext.jsx";
import { login } from "../../../services/authService.js";
import "../form.css";

const LoginForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(formData);
      setUser(user);
      navigate("/bidhub/home");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-register-container">
      <div className="form-wrapper">
        <form className="form-container login-form" onSubmit={handleSubmit}>
          <h1 className="form-title">Login</h1>
          <button className="form-close-btn" type="button" onClick={onClose}>
            ×
          </button>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group register-login">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-group register-login">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password</label>
          </div>

          <div className="form-buttons">
            <button type="submit">Login</button>
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

export default LoginForm;
