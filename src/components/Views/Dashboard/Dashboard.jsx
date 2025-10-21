import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { Link } from "react-router-dom";
import "./dashboard.css";
import ItemList from "../ItemList/ItemList.jsx";
import ItemForm from "../../Forms/ItemForm/ItemForm.jsx";
import Account from "../Account/Account.jsx";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [ activeSection, setActiveSection ] = useState("selling");
  const [ showItem, setShowItem ] = useState(false);

  return (
    <div className="section">
      <div className="dashboard-container container">
        <div className="sub-header-dash">
          <div className="title">
            Welcome, { user?.username }
            <span>Your personalized BidHub dashboard</span>
          </div>
        </div>

        <div className="dashboard-nav">
          <button
            className={ activeSection === "selling" ? "active" : "" }
            onClick={ () => setActiveSection("selling") }
          >
            Your Items For Sale
          </button>
          <button
            className={ activeSection === "bidded" ? "active" : "" }
            onClick={ () => setActiveSection("bidded") }
          >
            Items You've Bid On
          </button>
          <button
            className={ activeSection === "watched" ? "active" : "" }
            onClick={ () => setActiveSection("watched") }
          >
            Watched Items
          </button>
          <button
            className={ activeSection === "recent" ? "active" : "" }
            onClick={ () => setActiveSection("recent") }
          >
            User Account Profile
          </button>
        </div>

        <div className="dashboard-content">
          { activeSection === "selling" && (
            <div className="section-container">
              <div className="section-header">
                <h2>Your Items For Sale</h2>
                <button
                  className="action-button"
                  onClick={ () => setShowItem(true) }
                >
                  + List New Item
                </button>
              </div>
              <ItemList owner={ user.id } heroText={ null } />
              { showItem && (
                <div className="modal">
                  <div className="modal-content">
                    <button
                      className="close-button"
                      onClick={ () => setShowItem(false) }
                    >
                      ✕
                    </button>
                    <ItemForm onClose={ () => setShowItem(false) } />
                  </div>
                </div>
              ) }
            </div>
          ) }

          { activeSection === "bidded" && (
            <div className="section-container">
              <div className="section-header">
                <h2>Items You've Bid On</h2>
              </div>
              <ItemList userbids={ "true" } heroText={ null } />
            </div>
          ) }

          { activeSection === "watched" && (
            <div className="section-container">
              <div className="section-header">
                <h2>Watched Items</h2>
              </div>
              <ItemList favorites={ "true" } heroText={ null } />
            </div>
          ) }

          { activeSection === "recent" && (
            <div className="section-container">
              <div className="section-header">
                <h2>User Account Profile</h2>
              </div>
              <Account onClose={ () => setActiveSection("selling") } />
            </div>
          ) }
        </div>
      </div>
    </div>
  );
}
      

export default Dashboard;
