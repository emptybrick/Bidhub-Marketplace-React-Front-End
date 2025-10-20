import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../../contexts/UserContext.jsx";
import "./loginform.css";

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
      // Replace with your actual login logic
      // const response = await login(formData);
      // setUser(response.user);
      navigate("/bidhub/auth/login/");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-wrapper">
      <button className="form-close-btn" onClick={onClose}>
        ×
      </button>
      <form className="login" onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
