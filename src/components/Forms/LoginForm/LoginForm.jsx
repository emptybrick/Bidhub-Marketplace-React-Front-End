import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";
import { login } from "../../../services/authService";
import "../form.css";

const LoginForm = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const { handleLogin } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    totp_token: "",
  });
  const [requires2FA, setRequires2FA] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await login(formData);

      // Check if 2FA is required
      if (response.requires_2fa) {
        setRequires2FA(true);
        return;
      }

      // Normal login flow
      handleLogin(response.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  const handleClose = () => {
    if (setIsLogin) {
      navigate("/");
    } else {
      navigate("/");
    }
  };

  return (
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

        {requires2FA && (
          <div className="form-group register-login">
            <input
              type="text"
              name="totp_token"
              placeholder="6-digit code"
              value={formData.totp_token}
              onChange={handleChange}
              maxLength={6}
              required
            />
            <label htmlFor="totp_token">2FA Code from Authenticator App</label>
          </div>
        )}

        <div className="form-buttons">
          <button type="submit">
            {requires2FA ? "Verify & Login" : "Login"}
          </button>
          <button type="button" onClick={handleClose}>
            Cancel
          </button>
        </div>

        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          Don't have an account?{" "}
          <span
            onClick={() => setIsLogin(false)}
            style={{
              cursor: "pointer",
              color: "#007bff",
              textDecoration: "underline",
            }}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
