import { useState, useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import "./dashboard.css";
import ItemList from "../ItemList/ItemList.jsx";
import ItemForm from "../../Forms/ItemForm/ItemForm.jsx";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [activeSection, setActiveSection] = useState("selling");
  const [showItem, setShowItem] = useState(false);
  return (
    <div className="section">
      <div className="dashboard-container container">
        <div className="sub-header-dash">
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
            className={activeSection === "purchased" ? "active" : ""}
            onClick={() => setActiveSection("purchased")}
          >
            Purchased Items
          </button>
          <button
            className={activeSection === "sold-items" ? "active" : ""}
            onClick={() => setActiveSection("sold-items")}
          >
            Items Sold
          </button>
          <button
            className={activeSection === "auction-ended" ? "active" : ""}
            onClick={() => setActiveSection("auction-ended")}
          >
            Auction Ended
          </button>
        </div>

        <div className="dashboard-content">
          {activeSection === "selling" && (
            <div className="section-container">
              <div className="section-header-sales">
                <h2>Your Items For Sale</h2>
                <button
                  className="action-button"
                  onClick={() => setShowItem(true)}
                >
                  + List New Auction Item
                </button>
              </div>
              <ItemList
                owner={user.id}
                heroText={null}
                messageText={
                  "You have no active auctions.  Consider adding an item to the marketplace to start an auction!"
                }
                hideFilters={true}
              />
              {showItem && (
                  <div className="modal-content">
                    <button
                      className="close-button"
                      onClick={() => setShowItem(false)}
                    >
                      ✕
                    </button>
                    <ItemForm onClose={() => setShowItem(false)} />
                  </div>
              )}
            </div>
          )}

          {activeSection === "bidded" && (
            <div className="section-container">
              <div className="section-header">
                <h2>Items You've Bid On</h2>
              </div>
              <ItemList
                userbids={"true"}
                heroText={null}
                messageText={
                  "You have no bids on current auctions.  Look for an item to bid on in the Marketplace!"
                }
                hideFilters={true}
              />
            </div>
          )}

          {activeSection === "watched" && (
            <div className="section-container">
              <div className="section-header">
                <h2>Watched Items</h2>
              </div>
              <ItemList
                favorites={"true"}
                heroText={null}
                messageText={
                  "You currently have no watched items.  Find interesting items in the Marketplace and click the favorite icons!"
                }
                hideFilters={true}
              />
            </div>
          )}

          {activeSection === "purchased" && (
            <div className="section-container">
              <div className="section-header">
                <h2>Purchased Items</h2>
              </div>
              <ItemList
                purchased={"true"}
                heroText={null}
                messageText={
                  "You currently have no past purchases.  Go to the Marketplace now and start bidding to win!"
                }
                hideFilters={true}
              />
            </div>
          )}

          {activeSection === "sold-items" && (
            <div className="section-container">
              <div className="section-header">
                <h2>Items Sold</h2>
              </div>
              <ItemList
                sold={"true"}
                heroText={null}
                messageText={
                  "You have not sold any items.  Post some items for sale now!"
                }
                hideFilters={true}
              />
            </div>
          )}

          {activeSection === "auction-ended" && (
            <div className="section-container">
              <div className="section-header">
                <h2>Auction Ended with no Bids</h2>
              </div>
              <ItemList
                auctionFailed={"true"}
                heroText={null}
                messageText={
                  "You have no auctions that have ended without bids."
                }
                hideFilters={ true }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
