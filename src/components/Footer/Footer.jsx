import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-logo">
            <Link to="/">BidHub</Link>
          </div>
          <p>
            Your premier marketplace for auctions and direct sales. 
            Find unique items, place bids, and connect with buyers and sellers worldwide.
          </p>
          <div className="social-icons">
            <a href="#" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        <div className="footer-section footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/marketplace/about">About Us</Link>
            </li>
            <li>
              <Link to="/marketplace">Marketplace</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
             <li>
              <Link to="http://localhost:8000/admin/login/?next=/admin/">Admin</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section footer-links">
          <h3>Categories</h3>
          <ul>
            <li>
              <Link to="/marketplace?category=electronics">Electronics</Link>
            </li>
            <li>
              <Link to="/marketplace?category=fashion">Fashion</Link>
            </li>
            <li>
              <Link to="/marketplace?category=home">Home & Garden</Link>
            </li>
            <li>
              <Link to="/marketplace?category=collectibles">Collectibles</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>
            <i className="fas fa-map-marker-alt"></i> 123 Auction Street, Marketplace,
            Country
          </p>
          <p>
            <i className="fas fa-phone"></i> +1 234 567 8900
          </p>
          <p>
            <i className="fas fa-envelope"></i> info@bidhub.com
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} BidHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
