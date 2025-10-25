import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../../contexts/UserContext.jsx";
import { getUser, updateUser } from "../../../services/userService.js";
import "./account.css";

const Account = ({ onClose }) => {
  const { user, setUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    profile_image: user?.profile_image || "", 
  });

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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
        // Update formData with fetched user data
        setFormData({
          first_name: userData?.first_name || "",
          last_name: userData?.last_name || "",
          profile_image: userData?.profile_image || "",
        });
      } catch (error) {
        console.error("Error fetching User:", error);
      }
    };
    fetchUser();
  }, [setUser]);

  const handleEditToggle = () => {
    if (isEditing) {
      // Reset formData to current user data when canceling
      setFormData({
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        profile_image: user?.profile_image || "",
      });
    }
    setIsEditing(!isEditing);
    setMessage("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageSelect = (imageSrc) => {
    setFormData({ ...formData, profile_image: imageSrc });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUser(formData);
      setMessage("Profile updated successfully!");
      setMessageType("success");
      setUser(updatedUser);
      setIsEditing(false);
    } catch (err) {
      setMessage(err.message || "Failed to update profile");
      setMessageType("error");
    }
  };

  if (!user) {
    return (
      <div className="account-section">
        <h1>User Profile</h1>
        <div>Please log in to view your account.</div>
      </div>
    );
  }

  return (
    <div className="account-section">
      <h1>User Profile</h1>
      {message && (
        <div
          className={`error-message ${
            messageType === "success" ? "success-message" : ""
          }`}
        >
          {message}
        </div>
      )}
      <div className="profile-section">
        <div className="profile-avatar">
          <img src={user.profile_image} alt="Profile Icon" />
        </div>
        <div className="profile-details">
          <div>
            <strong>Username:</strong> {user.username}
          </div>
          <div>
            <strong>Email:</strong> {user.email}
          </div>
        </div>
      </div>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="form-columns">
            <div className="form-group">
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
              <label htmlFor="first_name">First Name</label>
            </div>
            <div className="form-group">
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
              <label htmlFor="last_name">Last Name</label>
            </div>
            <div className="form-group profile-image-picker">
              <label htmlFor="profile-image">Select Profile Image</label>
              <div className="image-grid">
                {profileImages.map((image, index) => (
                  <div
                    key={index}
                    className={`image-option ${
                      formData.profile_image === image.src ? "selected" : ""
                    }`}
                    onClick={() => handleImageSelect(image.src)}
                  >
                    <img src={image.src} alt={`Profile icon ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="form-buttons">
            <button type="submit" className="save-changes-btn">
              Save Changes
            </button>
            <button type="button" onClick={handleEditToggle}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="form-columns">
            <div className="form-group">
              <input type="text" value={user.first_name} disabled />
              <label>First Name</label>
            </div>
            <div className="form-group">
              <input type="text" value={user.last_name} disabled />
              <label>Last Name</label>
            </div>
          </div>
        </div>
      )}
      <div className="profile-wallet">
        <div>
          <strong>User Rating:</strong>{" "}
          <span style={{ color: "#4e73df", fontWeight: 600 }}>
            {user.user_rating ? user.user_rating : "Not rated"}
            {user.user_rating && <span style={{ marginLeft: 5 }}>★</span>}
          </span>
        </div>
        <div>
          <strong>Favorite Items:</strong>{" "}
          <span style={{ color: "#4e73df", fontWeight: 600 }}>
            {user.favorites ? user.favorites.length : 0}
          </span>
        </div>
      </div>

      {!isEditing ? (
        <div className="bottom-actions">
          <div className="form-buttons">
            <button
              type="button"
              className="edit-profile-btn"
              onClick={handleEditToggle}
            >
              Edit Profile
            </button>
            {onClose && (
              <button type="button" onClick={onClose}>
                Cancel
              </button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Account;
