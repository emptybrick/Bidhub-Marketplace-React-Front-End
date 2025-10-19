// frontend/src/pages/ItemDetailPage.jsx (Bid placement)
import { useEffect, useState } from "react";
<<<<<<< HEAD:src/pages/ItemDetailPage/ItemDetailPage.jsx
import { useParams } from "react-router-dom";
import api from "../../lib/api.js";
import { useAuth } from "../../state/AuthContext.jsx";
=======
import { useParams } from "react-router";
// import api from "../lib/api.js";
import { UserContext } from "../../../contexts/UserContext.jsx";
>>>>>>> 7eddabd556862b7a8eaf4731fb7fe97ab66d63d7:src/components/Views/ItemDetail/ItemDetail.jsx

const ItemDetail = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [item, setItem] = useState(null);
  const [bids, setBids] = useState([]);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  async function load() {
    const { data: itemData } = await api.get(`/items/${id}/`);
    setItem(itemData);
    const { data: bidList } = await api.get(`/bids/?item=${id}`);
    setBids(bidList.results || bidList);
  }

  useEffect(() => {
    load();
  }, [id]);

  async function placeBid() {
    setError("");
    try {
      await api.post(`/bids/`, { item: Number(id), amount: Number(amount) });
      setAmount("");
      await load();
    } catch (e) {
      setError(e.response?.data?.amount || "Failed to bid");
    }
  }

  if (!item) return <p>Loading…</p>;
  return (
    <div className="container">
      <h2>{item.title}</h2>
      {item.category && <span className="badge">{item.category.name}</span>}
      <p>{item.description}</p>
      <p>Reserve: {item.reserve_price ?? "-"}</p>

      <div className="card">
        <h3>Place a Bid</h3>
        {user ? (
          <>
            <input
              type="number"
              step="0.01"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={placeBid}>Bid</button>
            {error && <p style={{ color: "crimson" }}>{String(error)}</p>}
          </>
        ) : (
          <p>Please sign in to bid.</p>
        )}
      </div>

      <div className="card">
        <h3>Recent Bids</h3>
        <ul>
          {bids.map((b) => (
            <li key={b.id}>
              ${b.amount} by {b.bidder} at{" "}
              {new Date(b.created_at).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

<<<<<<< HEAD:src/pages/ItemDetailPage/ItemDetailPage.jsx
export default ItemDetailPage;
=======
export default ItemDetail;
>>>>>>> 7eddabd556862b7a8eaf4731fb7fe97ab66d63d7:src/components/Views/ItemDetail/ItemDetail.jsx
