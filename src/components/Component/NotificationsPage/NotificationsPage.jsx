// frontend/src/pages/NotificationsPage.jsx
import { useEffect, useState } from "react";
import api from "../lib/api.js";

export default function NotificationsPage(){
  const [items, setItems] = useState([]);

  async function load(){
    const { data } = await api.get(`/notifications/`);
    setItems(data.results || data);
  }

  useEffect(()=>{ load(); },[]);

  async function markAllRead(){
    await api.post(`/notifications/mark-all-read/`);
    await load();
  }

  return (
    <div className="container">
      <h2>Notifications</h2>
      <button onClick={markAllRead}>Mark all read</button>
      <ul>
        {items.map(n => (
          <li key={n.id}>{n.is_read ? "✓" : "•"} {n.message} — {new Date(n.created_at).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
}