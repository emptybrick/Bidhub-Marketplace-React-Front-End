// should show successful purchases/auctions won to generate seller reviews and keep a history
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext.jsx";
import api from "../../../services/axiosConfig.js";

const Purchases = () => {
  const { user } = useContext(UserContext);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchases = async () => {
      if (!user) return;

      try {
        const response = await api.get("/api/purchases/");
        setPurchases(response.data);
      } catch (error) {
        console.error("Error fetching purchases:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [user]);

  if (loading) return <p>Loading purchases...</p>;

  return (
    <div className="purchases-container">
      <h1>Your Purchases</h1>
      {purchases.length === 0 ? (
        <p>You haven't made any purchases yet.</p>
      ) : (
        <ul className="purchases-list">
          {purchases.map((purchase) => (
            <li key={purchase.id} className="purchase-item">
              <h3>{purchase.item.title}</h3>
              <p>
                <strong>Price:</strong> ${purchase.amount}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(purchase.created_at).toLocaleDateString()}
              </p>
              <p>
                <strong>Seller:</strong> {purchase.seller.username}
              </p>
              {/* Add option to leave reviews */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Purchases;
