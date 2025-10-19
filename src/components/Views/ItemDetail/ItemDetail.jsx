// frontend/src/pages/ItemDetailPage.jsx (Bid placement)
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../../../services/axiosConfig.js";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext.jsx";

const ItemDetail = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const [bidAmount, setBidAmount] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await api.get(`/api/items/${itemId}/`);
        setItem(response.data);
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
      await api.post(`/api/items/${itemId}/bids/`, {
        amount: bidAmount,
      });
      alert("Bid placed successfully!");
      // Refresh item data to show updated bids
      const response = await api.get(`/api/items/${itemId}/`);
      setItem(response.data);
      setBidAmount("");
    } catch (error) {
      alert(
        "Error placing bid: " + error.response?.data?.message || "Unknown error"
      );
    }
  };

  if (loading) return <p>Loading item details...</p>;
  if (!item) return <p>Item not found</p>;

  return (
    <div className="item-detail-container">
      <h1>{item.title}</h1>
      <div className="item-image">
        {item.image && <img src={item.image} alt={item.title} />}
      </div>
      <div className="item-info">
        <p>
          <strong>Price:</strong> ${item.price}
        </p>
        <p>
          <strong>Description:</strong> {item.description}
        </p>
        <p>
          <strong>Seller:</strong> {item.seller?.username}
        </p>
      </div>

      {item.auction && (
        <div className="bid-section">
          <h2>Current Bids</h2>
          {item.bids?.length > 0 ? (
            <ul>
              {item.bids.map((bid) => (
                <li key={bid.id}>
                  ${bid.amount} by {bid.bidder.username}
                </li>
              ))}
            </ul>
          ) : (
            <p>No bids yet</p>
          )}

          {user && user.id !== item.seller?.id && (
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
          )}
        </div>
      )}
    </div>
  );
};

export default ItemDetail;
