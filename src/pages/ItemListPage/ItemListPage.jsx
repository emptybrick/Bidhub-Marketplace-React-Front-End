// frontend/src/pages/ItemListPage.jsx
// emptybrick was here
// re-useable components: item-card

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../lib/api.js";
import ItemCard from "../../components/ItemCard/ItemCard.jsx";

const ItemListPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/items/`);
      setItems(data.results || data);
      setLoading(false);
    })();
  }, []);

  if (loading) return <p>Loading…</p>;
  return (
    <div className="product-listing-container">
      <h2>Product Listing</h2>
      {items.map((item) => (
        <ItemCard item={item} />
      ))}
    </div>
  );
};

export default ItemListPage;

// class item-card is unique to product listing page to show details, image, current bid of each item (need to build css for item-card)
// class product-listing-container is unique to product listing page to contain all the product item cards, will be right of categories and under header
