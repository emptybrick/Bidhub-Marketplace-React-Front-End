import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { Link } from "react-router-dom";
import ItemCard from "../../Component/ItemCard/ItemCard.jsx";
import {
  getItemsByUser,
  getWatchedItems,
  getBidItems,
  getRecentItems,
} from "../../../services/itemService.js";
import "./dashboard.css";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [sellingItems, setSellingItems] = useState([]);
  const [biddedItems, setBiddedItems] = useState([]);
  const [watchedItems, setWatchedItems] = useState([]);
  const [recentItems, setRecentItems] = useState([]);
  const [activeSection, setActiveSection] = useState("selling");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Fetch all data concurrently for better performance
        const [selling, bidded, watched, recent] = await Promise.all([
          getItemsByUser(user.id),
          getBidItems(user.id),
          getWatchedItems(user.id),
          getRecentItems(),
        ]);

        setSellingItems(selling);
        setBiddedItems(bidded);
        setWatchedItems(watched);
        setRecentItems(recent);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchDashboardData();
    }
  }, [user]);

  const renderItemCards = (items) => {
    if (items.length === 0) {
      return <p className="no-items">No items to display</p>;
    }

    return (
      <div className="item-card-container">
        {items.map((item) => (
          <Link to={`/bidhub/marketplace/${item.id}`} key={item.id}>
            <ItemCard item={item} />
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div className="dashboard-container container">
      <div className="sub-header">
        <div className="title">
          Welcome, {user?.username}
          <span>Your personalized BidHub dashboard</span>
        </div>
      </div>

      <div className="dashboard-nav">
        <button
          className={activeSection === "selling" ? "active" : ""}
          onClick={() => setActiveSection("selling")}
        >
          Your Items For Sale ({sellingItems.length})
        </button>
        <button
          className={activeSection === "bidded" ? "active" : ""}
          onClick={() => setActiveSection("bidded")}
        >
          Items You've Bid On ({biddedItems.length})
        </button>
        <button
          className={activeSection === "watched" ? "active" : ""}
          onClick={() => setActiveSection("watched")}
        >
          Watched Items ({watchedItems.length})
        </button>
        <button
          className={activeSection === "recent" ? "active" : ""}
          onClick={() => setActiveSection("recent")}
        >
          Recent Marketplace Listings
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading your items...</div>
      ) : (
        <div className="dashboard-content">
          {activeSection === "selling" && (
            <div className="section-container">
              <div className="section-header">
                <h2>Your Items For Sale</h2>
                <Link to="/bidhub/item/new" className="action-button">
                  + List New Item
                </Link>
              </div>
              {renderItemCards(sellingItems)}
            </div>
          )}

          {activeSection === "bidded" && (
            <div className="section-container">
              <div className="section-header">
                <h2>Items You've Bid On</h2>
              </div>
              {renderItemCards(biddedItems)}
            </div>
          )}

          {activeSection === "watched" && (
            <div className="section-container">
              <div className="section-header">
                <h2>Watched Items</h2>
              </div>
              {renderItemCards(watchedItems)}
            </div>
          )}

          {activeSection === "recent" && (
            <div className="section-container">
              <div className="section-header">
                <h2>Recent Marketplace Listings</h2>
                <Link to="/bidhub/marketplace" className="action-button">
                  View All Marketplace Items
                </Link>
              </div>
              {renderItemCards(recentItems)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
