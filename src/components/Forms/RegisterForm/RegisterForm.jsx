import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../../contexts/UserContext.jsx";
import { register } from "../../../services/authService.js";
import "../form.css";

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
    profile_image: "",
  });

  const {
    email,
    password,
    password_confirmation,
    first_name,
    last_name,
    username,
    profile_image,
  } = formData;

  const profileImages = [
    { src: "/user-icon-1.png", alt: "profile icon" },
    { src: "/user-icon-2.png", alt: "profile icon" },
    { src: "/user-icon-3.png", alt: "profile icon" },
    { src: "/user-icon-4.png", alt: "profile icon" },
    { src: "/user-icon-5.png", alt: "profile icon" },
    { src: "/user-icon-6.png", alt: "profile icon" },
    { src: "/user-icon-7.png", alt: "profile icon" },
    { src: "/user-icon-8.png", alt: "profile icon" },
    { src: "/user-icon-9.png", alt: "profile icon" },
    { src: "/user-icon-10.png", alt: "profile icon" },
    { src: "/user-icon-11.png", alt: "profile icon" },
    { src: "/user-icon-12.png", alt: "profile icon" },
    { src: "/user-icon-13.png", alt: "profile icon" },
    { src: "/user-icon-14.png", alt: "profile icon" },
    { src: "/user-icon-15.png", alt: "profile icon" },
    { src: "/user-icon-16.png", alt: "profile icon" },
  ];

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
      setMessage(err.request.response);
    }
  };

  const isFormInvalid = () => {
    return !(
      email &&
      username &&
      password &&
      first_name &&
      last_name &&
      profile_image
    );
  };

  return (
    <div className="login-register-container">
      <div className="form-wrapper">
        <div className="form-container">
          <button className="form-close-btn" type="button" onClick={onClose}>
            ×
          </button>
          <h1 className="form-title register-form">Register</h1>
          {message && <p className="error-message">{message}</p>}

          <form onSubmit={handleSubmit}>
            <div className="form-columns">
              <div className="form-group register-login">
                <input
                  type="email"
                  id="email"
                  value={email}
                  name="email"
                  onChange={handleChange}
                  className="short-input"
                  placeholder="Email"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="form-group register-login">
                <input
                  type="text"
                  id="username"
                  value={username}
                  name="username"
                  onChange={handleChange}
                  placeholder="Username"
                  required
                />
                <label htmlFor="username">Username</label>
              </div>

              <div className="form-group register-login">
                <input
                  type="password"
                  id="password"
                  value={password}
                  name="password"
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
                <label htmlFor="password">Password</label>
              </div>

              <div className="form-group register-login">
                <input
                  type="text"
                  id="first_name"
                  value={first_name}
                  name="first_name"
                  onChange={handleChange}
                  className="short-input"
                  placeholder="First Name"
                  required
                />
                <label htmlFor="first_name">First Name</label>
              </div>

              <div className="form-group register-login">
                <input
                  type="text"
                  id="last_name"
                  value={last_name}
                  name="last_name"
                  onChange={handleChange}
                  placeholder="Last Name"
                  required
                />
                <label htmlFor="last_name">Last Name</label>
              </div>

              <div className="form-group register-login">
                <input
                  type="password"
                  id="password_confirmation"
                  value={password_confirmation}
                  name="password_confirmation"
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  required
                />
                <label htmlFor="password_confirmation">Confirm Password</label>
              </div>
            </div>
            <div className="form-group register-login profile-image-picker">
              <label htmlFor="profile-image">Select Profile Image</label>
              <div className="image-grid">
                {profileImages.map((image, index) => (
                  <div
                    key={index}
                    className={`image-option ${
                      formData.profile_image === image.src ? "selected" : ""
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, profile_image: image.src })
                    }
                  >
                    <img src={image.src} alt={`Profile icon ${index + 1}`} />
                  </div>
                ))}
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
    </div>
  );
};

export default RegisterForm;
