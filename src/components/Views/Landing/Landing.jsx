import { Link } from "react-router";
import "./landing.css";
const Landing = () => {
  return (
    <div className="home">
      <div className="home-content">
        <h1 className="home-title">Welcome to Bidhub</h1>
        <p className="home-subtitle">
          Your premier marketplace for auctions and direct sales. Find unique
          items, place bids, and connect with buyers and sellers worldwide.
        </p>
        <Link to="/bidhub/marketplace" className="home-button">
          Browse Marketplace
        </Link>
      </div>
    </div>
    
  );
};

export default Landing;
