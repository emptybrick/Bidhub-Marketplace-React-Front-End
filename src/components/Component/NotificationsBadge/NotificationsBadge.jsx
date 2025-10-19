// frontend/src/components/NotificationsBadge.jsx
import { useEffect, useState } from "react";
import api from "../lib/api.js";
import { useLocation } from "react-router-dom";

export default function NotificationsBadge(){
  const [count, setCount] = useState(0);
  const loc = useLocation();

  async function load(){
    try{
      const { data } = await api.get(`/notifications/?is_read=false`);
      const list = data.results || data;
      setCount(list.filter(n=>!n.is_read).length);
    }catch{ setCount(0); }
  }

  useEffect(()=>{ load(); },[loc.pathname]);

  return (
    <span className="badge" title="Unread notifications">{count}</span>
  );
}