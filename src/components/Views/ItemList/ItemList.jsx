// frontend/src/pages/ItemListPage.jsx
// emptybrick was here
// re-useable components: item-card

import { useEffect, useState } from "react";
import { Link } from "react-router";
import ItemCard from "../../Component/ItemCard/ItemCard.jsx";
import { getItems } from "../../../services/itemService.js";
import "./itemlist.css";
import ItemForm from '../../Forms/ItemForm/ItemForm.jsx'

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getItems();
      setItems(data);
      setLoading(false);
    })();
  }, []);

  if (loading) return <p>Loading…</p>;
  return (
    <div className="section">
    <div className="container">
      <div className="sub-header">
        <h2>Product Listing</h2>
      </div>
      <div className="item-card-container">
        {items.map((item, idx) => (
            <ItemCard item={item} key={idx}/>
        ))}
      </div>
      </div>
      <ItemForm />
    </div>
  );
};

export default ItemList;

// class item-card is unique to product listing page to show details, image, current bid of each item (need to build css for item-card)
// class product-listing-container is unique to product listing page to contain all the product item cards, will be right of categories and under header
