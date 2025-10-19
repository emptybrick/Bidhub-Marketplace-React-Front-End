// frontend/src/pages/ItemListPage.jsx
// emptybrick was here
// re-useable components: item-card

import { useEffect, useState } from "react";
<<<<<<< HEAD:src/pages/ItemListPage/ItemListPage.jsx
import { Link } from "react-router-dom";
import api from "../../lib/api.js";
import ItemCard from "../../components/ItemCard/ItemCard.jsx";
=======
import { Link } from "react-router";
// import api from "../lib/api.js";
import ItemCard from '../../Components/ItemCard/ItemCard.jsx'
>>>>>>> 7eddabd556862b7a8eaf4731fb7fe97ab66d63d7:src/components/Views/ItemList/ItemList.jsx

const ItemList = () => {
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

<<<<<<< HEAD:src/pages/ItemListPage/ItemListPage.jsx
export default ItemListPage;
=======
export default ItemList
>>>>>>> 7eddabd556862b7a8eaf4731fb7fe97ab66d63d7:src/components/Views/ItemList/ItemList.jsx

// class item-card is unique to product listing page to show details, image, current bid of each item (need to build css for item-card)
// class product-listing-container is unique to product listing page to contain all the product item cards, will be right of categories and under header
