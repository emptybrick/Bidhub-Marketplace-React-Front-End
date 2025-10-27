import { useState, useEffect, useContext } from "react";
import {
  setup2FA,
  confirm2FA,
  disable2FA,
} from "../../services/twoFactorService";
import { UserContext } from "../../contexts/UserContext";
import "./TwoFactorSettings.css";

const TwoFactorSettings = () => {
  const { user, refreshUser } = useContext(UserContext);
  const [qrCode, setQrCode] = useState(null);
  const [secret, setSecret] = useState(null);
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showSetup, setShowSetup] = useState(false);

  const handleSetup = async () => {
    try {
      const data = await setup2FA();
      setQrCode(data.qr_code);
      setSecret(data.secret);
      setShowSetup(true);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to setup 2FA");
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    try {
      await confirm2FA(token);
      setSuccess("2FA enabled successfully!");
      setShowSetup(false);
      setQrCode(null);
      setToken("");
      await refreshUser();
    } catch (err) {
      setError(err.response?.data?.error || "Invalid token");
    }
  };

  const handleDisable = async (e) => {
    e.preventDefault();
    try {
      await disable2FA(password);
      setSuccess("2FA disabled successfully");
      setPassword("");
      await refreshUser();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to disable 2FA");
    }
  };

  return (
    <div className="two-factor-settings">
      <h2>Two-Factor Authentication</h2>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      {!user?.two_factor_enabled ? (
        <div>
          <p>Protect your account with an extra layer of security.</p>
          <button onClick={handleSetup} className="btn-primary">
            Enable 2FA
          </button>

          {showSetup && qrCode && (
            <div className="setup-container">
              <h3>Scan QR Code</h3>
              <img src={qrCode} alt="QR Code" />
              <p>
                Or enter this secret manually: <code>{secret}</code>
              </p>

              <form onSubmit={handleConfirm}>
                <input
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  maxLength={6}
                  required
                />
                <button type="submit">Confirm & Enable</button>
              </form>
            </div>
          )}
        </div>
      ) : (
        <div>
          <p>✓ Two-factor authentication is enabled</p>
          <form onSubmit={handleDisable}>
            <input
              type="password"
              placeholder="Enter password to disable"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn-danger">
              Disable 2FA
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TwoFactorSettings;
