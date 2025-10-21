// frontend/src/pages/ItemDetailPage.jsx (Bid placement)
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext.jsx";
import { getItemById } from "../../../services/itemService.js";
import { createBid } from "../../../services/bidService.js";
import Hero from "../../Component/Hero/Hero.jsx";
import "./itemdetail.css";

const ItemDetail = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const [bidAmount, setBidAmount] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await getItemById(itemId);
        setItem(response);
      } catch (error) {
        console.error("Error fetching item:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemId]);

  const handleSubmitBid = async (e) => {
    e.preventDefault();
    try {
      await createBid(itemId, bidAmount);
      alert("Bid placed successfully!");
      // Refresh item data to show updated bids
      const response = await getItemById(itemId);
      setItem(response);
      setBidAmount("");
    } catch (error) {
      alert(
        "Error placing bid: " + error.response?.data?.message || "Unknown error"
      );
    }
  };

  if (loading) return <p>Loading item details...</p>;
  if (!item) return <p>Item not found.</p>;
  if (!user)
    return <p>Please register an account and log in to view item details.</p>;

  return (
    <div className="item-detail-container">
      <Hero heroText={item.item_name} seller={item.owner.username} />
      <div className="item-detail-section">
        <div className="details-top">
          <div className="item-image">ITEM IMAGE</div>
          <div className="top-right-section">
            <div className="bid-info">
              <div className="current-bid">
                Current Bid: <span className="span-bold">${item.current_bid}</span>
              </div>
              <div className="initial-bid">
                Initial Bid: <span className="span-bold">${item.initial_bid}</span>
              </div>

              <div className="bid-end">
                Time left:{" "}
                <span className="span-bold">
                  {Math.ceil(
                    (new Date(item.end_time) - new Date()) /
                      (1000 * 60 * 60 * 24)
                  )}{" "}
                  days left
                </span>
              </div>
              <div className="bid-offer">
                <div className="form">INPUT: offer</div>
                <button>BID</button>
              </div>
              <div className="bid-history">
                <button className="bid-history-button">VIEW BID HISTORY</button>
              </div>
            </div>
            <div className="item-info-section">
              <div className="item-detail-subtitle">Item Details</div>
              <div className="item-info">
                <ul className="item-info-left">
                  <li>
                    Category: <span className="span-bold">
                    {item.category}</span>
                  </li>
                  <li>
                    Condition: <span className="span-bold">
                    {item.condition}</span>
                  </li>
                  {item.manufacture_year ? (
                    <li>
                      Manufacture Year: <span className="span-bold">
                      {item.manufacture_year}</span>
                    </li>
                  ) : (
                    ""
                  )}
                  {item.country_of_origin ? (
                    <li>
                      Country of Origin: <span className="span-bold">
                      {item.country_of_origin}</span>
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
                <ul className="item-info-right">
                  <li>
                    Height: <span className="span-bold">{item.height} cm</span>
                  </li>
                  <li>
                    Width: <span className="span-bold">
                    {item.width} cm</span>
                  </li>
                  <li>
                    Length: <span className="span-bold">
                    {item.length} cm</span>
                  </li>
                  <li>
                    Weight: <span className="span-bold">
                    {item.weight} kg</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="details-bottom">
          <div className="item-description-subtitle">Item Description</div>
          <div className="item-description">{item.description}</div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;

/* {item.bid_history?.length > 0 ? (
            <ul>
              {item.bids.map((bid) => (
                <li key={bid.id}>
                  ${bid.amount} by {bid.bidder.username}
                </li>
              ))}
            </ul>
          ) : (
            <p>No bids yet</p>
          )} */

/* {user && user.id !== item.seller?.id && (
            <form onSubmit={handleSubmitBid}>
              <h3>Place a Bid</h3>
              <input
                type="number"
                step="0.01"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder="Bid amount"
                min={item.price}
                required
              />
              <button type="submit">Place Bid</button>
            </form>
          )} */
