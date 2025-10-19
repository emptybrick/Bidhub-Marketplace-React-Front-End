// frontend/src/components/NotificationsBadge.jsx
import { useEffect, useState } from "react";
import api from "../../services/axiosConfig.js";
import { useLocation } from "react-router-dom";

export default function NotificationsBadge() {
  const [unreadCount, setUnreadCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const fetchUnreadNotifications = async () => {
      try {
        const response = await api.get("/api/notifications/unread/count/");
        setUnreadCount(response.data.count);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchUnreadNotifications();
    // Set up polling to check for new notifications periodically
    const interval = setInterval(fetchUnreadNotifications, 60000); // every minute

    return () => clearInterval(interval);
  }, [location]); // Refetch when location changes

  if (unreadCount === 0) return null;

  return <span className="notification-badge">{unreadCount}</span>;
}
