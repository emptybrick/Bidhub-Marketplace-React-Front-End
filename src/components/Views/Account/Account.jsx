import { useState, useContext } from "react";
import { UserContext } from "../../../contexts/UserContext.jsx";
import { updateUser } from "../../../services/userService.js";
import userProfileIcon from "../../../assets/user_profile_icon.png";
import "./account.css";

const Account = ({ onClose }) => {
  const { user, setUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    street_address: user?.street_address || "",
    city: user?.city || "",
    state: user?.state || "",
    postal_code: user?.postal_code || "",
    country: user?.country || "",
    phone_number: user?.phone_number || "",
  });

  const handleEditToggle = () => {
    if (isEditing) {
      setFormData({
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        street_address: user?.street_address || "",
        city: user?.city || "",
        state: user?.state || "",
        postal_code: user?.postal_code || "",
        country: user?.country || "",
        phone_number: user?.phone_number || "",
      });
    }
    setIsEditing(!isEditing);
    setMessage("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUser(user.id, formData);
      setUser({ ...user, ...updatedUser });
      setMessage("Profile updated successfully!");
      setMessageType("success");
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
      <h1></h1>
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
          <img src={userProfileIcon} alt="Profile" />
        </div>
        <div className="profile-details">
          <div>
            <strong>Username:</strong> {user.username}
          </div>
          <div>
            <strong>Email:</strong> {user.email}
          </div>
          <div>
            <strong>Password:</strong> ••••••••
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
            <div className="form-group">
              <input
                type="text"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                required
              />
              <label htmlFor="phone_number">Phone</label>
            </div>
          </div>
          <h2>Address</h2>
          <div className="form-columns">
            <div className="form-group">
              <input
                type="text"
                id="street_address"
                name="street_address"
                value={formData.street_address}
                onChange={handleChange}
                required
              />
              <label htmlFor="street_address">Street</label>
            </div>
            <div className="form-group">
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
              <label htmlFor="city">City</label>
            </div>
            <div className="form-group">
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
              <label htmlFor="state">State</label>
            </div>
            <div className="form-group">
              <input
                type="text"
                id="postal_code"
                name="postal_code"
                value={formData.postal_code}
                onChange={handleChange}
                required
              />
              <label htmlFor="postal_code">Postal Code</label>
            </div>
            <div className="form-group">
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
              <label htmlFor="country">Country</label>
            </div>
          </div>
          <div className="form-buttons">
            <button type="submit">Save Changes</button>
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
            <div className="form-group">
              <input type="text" value={user.phone_number} disabled />
              <label>Phone</label>
            </div>
          </div>
          <h2>Address</h2>
          <div className="form-columns">
            <div className="form-group">
              <input type="text" value={user.street_address} disabled />
              <label>Street</label>
            </div>
            <div className="form-group">
              <input type="text" value={user.city} disabled />
              <label>City</label>
            </div>
            <div className="form-group">
              <input type="text" value={user.state} disabled />
              <label>State</label>
            </div>
            <div className="form-group">
              <input type="text" value={user.postal_code} disabled />
              <label>Postal Code</label>
            </div>
            <div className="form-group">
              <input type="text" value={user.country} disabled />
              <label>Country</label>
            </div>
          </div>
          {!isEditing ? (
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
          ) : null}
        </div>
      )}
      <div className="profile-wallet">
        <div>
          <strong>Wallet Balance:</strong>{" "}
          <span style={{ color: "#1cc88a", fontWeight: 700 }}>
            ${user.wallet ? parseFloat(user.wallet).toFixed(2) : "0.00"}
          </span>
        </div>
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
    </div>
  );
};

export default Account;
