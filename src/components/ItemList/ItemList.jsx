// frontend/src/pages/ItemListPage.jsx
// emptybrick was here
// re-useable components: item-card

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/axiosConfig.js";
import ItemCard from "../ItemCard/ItemCard.jsx";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get("/api/items/");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="item-list-container">
      <h1>Marketplace Items</h1>
      {loading ? (
        <p>Loading items...</p>
      ) : items.length === 0 ? (
        <p>No items available.</p>
      ) : (
        <div className="items-grid">
          {items.map((item) => (
            <Link to={`/marketplace/${item.id}`} key={item.id}>
              <ItemCard item={item} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemList;
