// FavoriteButton.jsx
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { getFavorites, toggleFavorite } from "../../../services/authService";

function FavoriteButton({ itemId }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load initial state
  useEffect(() => {
    if (itemId) {
      fetchIsFavorited();
    }
  }, [itemId]);

  const fetchIsFavorited = async () => {
    try {
      const response = await getFavorites();
    let favoritesArray = [];
    if (response.favorites) {
      favoritesArray = Array.isArray(response.favorites)
        ? response.favorites.map(String)
        : [];
    }

    const isInFavorites = favoritesArray.includes(String(itemId));
    setIsFavorited(isInFavorites);
    } catch (error) {
      console.error("Failed to load favorites:", error);
    }
  };

  const handleToggle = async () => {
    setLoading(true);
    try {
      const response = await toggleFavorite(itemId);
      setIsFavorited(response.is_favorited);
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      style={{
        background: "none",
        border: "none",
        cursor: loading ? "not-allowed" : "pointer",
        padding: "4px",
      }}
    >
      <FontAwesomeIcon
        icon={isFavorited ? faHeartSolid : faHeartRegular}
        style={{ color: "#edd326" }}
        size="2x"
        spin={loading}
      />
    </button>
  );
}

export default FavoriteButton;
