// frontend/src/pages/OrdersPage.jsx (List + Pay)
// should show bids user current has active in active auctions
// re-useable componenets: item-card

import { useEffect, useState } from "react";
import { useAuth } from "../state/AuthContext.jsx";
import api from "../lib/api.js";

const BidsPage = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
    // need to limit access to userId = logged in user
    
  async function load() {
    const { data } = await api.get(`/orders/`);
    setOrders(data.results || data);
  }

  useEffect(() => {
    load();
  }, []);

  async function pay(id) {
    await api.post(`/orders/${id}/pay/`);
    await load();
  }

  return (
    <div className="container">
      <h2>Orders</h2>
      {orders.map((o) => (
        <div className="card" key={o.id}>
          <p>
            <strong>ID:</strong> {o.id} <strong>Status:</strong> {o.status}
          </p>
          <p>
            <strong>Total:</strong> ${o.total_amount}
          </p>
          {o.status !== "PAID" && (
            <button onClick={() => pay(o.id)}>Pay</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default BidsPage