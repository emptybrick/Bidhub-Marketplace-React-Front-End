import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { Link } from "react-router-dom";
import "./dashboard.css";
import ItemList from "../ItemList/ItemList.jsx";
import ItemForm from "../../Forms/ItemForm/ItemForm.jsx";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [activeSection, setActiveSection] = useState("selling");

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
          Your Items For Sale
        </button>
        <button
          className={activeSection === "bidded" ? "active" : ""}
          onClick={() => setActiveSection("bidded")}
        >
          Items You've Bid On
        </button>
        <button
          className={activeSection === "watched" ? "active" : ""}
          onClick={() => setActiveSection("watched")}
        >
          Watched Items
        </button>
        <button
          className={activeSection === "recent" ? "active" : ""}
          onClick={() => setActiveSection("recent")}
        >
          User Account Profile
        </button>
      </div>

      <div className="dashboard-content">
        {activeSection === "selling" && (
          <div className="section-container">
            <div className="section-header">
              <h2>Your Items For Sale</h2>
              <Link to="/bidhub/item/new" className="action-button">
                + List New Item
              </Link>
            </div>
            <ItemList owner={user.id} heroText={null} />
          </div>
        )}

        {activeSection === "bidded" && (
          <div className="section-container">
            <div className="section-header">
              <h2>Items You've Bid On</h2>
            </div>
            <ItemList userbids={"true"} heroText={null} />
          </div>
        )}

        {activeSection === "watched" && (
          <div className="section-container">
            <div className="section-header">
              <h2>Watched Items</h2>
            </div>
          </div>
        )}

        {activeSection === "recent" && (
          <div className="section-container">
            <div className="section-header">
              <h2>User Account Profile</h2>
              <Link to="/bidhub/marketplace" className="action-button">
                View All Marketplace Items
              </Link>
            </div>
          </div>
        )}
      </div>
        <ItemForm />
    </div>
  );
};

export default Dashboard;
