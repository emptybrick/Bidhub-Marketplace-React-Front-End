import { useEffect, useState } from "react";
import ItemCard from "../../Component/ItemCard/ItemCard.jsx";
import { getFilteredItems, getItems } from "../../../services/itemService.js";
import "./itemlist.css";
import { categories } from "../../../common/utils.js";

const ItemList = ({ owner = null }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("all"); // Default to 'all'
  const [conditionFilter, setConditionFilter] = useState("all");

  useEffect(() => {
    (async () => {
      let data;
      data = await getFilteredItems(categoryFilter, conditionFilter, owner);
      setItems(data);
      setLoading(false);
    })();
  }, [categoryFilter, conditionFilter]);

  if (loading) return <p>Loading…</p>;
  return (
    <div className="container">
      <div className="hero">
        <h1>BidHub Marketplace</h1>
      </div>
      <div className="section">
        <div className="filter-container">
          <div className="sub-header">
            <h2>Condition</h2>
          </div>
          <ul>
            <li
              onClick={() => setConditionFilter("all")}
              className={conditionFilter === "all" ? "active" : ""}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setConditionFilter("all")}
            >
              Any
            </li>
            <li
              onClick={() => setConditionFilter("NEW")}
              className={conditionFilter === "NEW" ? "active" : ""} 
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setConditionFilter("NEW")}
            >
              New
            </li>
            <li
              onClick={() => setConditionFilter("USED")} 
              className={conditionFilter === "USED" ? "active" : ""} 
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setConditionFilter("USED")}
            >
              Used
            </li>
          </ul>
          <div className="sub-header">
            <h2>Categories</h2>
          </div>
          <ul>
            <li
              onClick={() => setCategoryFilter("all")} 
              className={categoryFilter === "all" ? "active" : ""} 
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setCategoryFilter("all")}
            >
              All Categories
            </li>
            {categories.map((cat, idx) => (
              <li
                key={idx}
                onClick={() => setCategoryFilter(cat.value)}
                className={categoryFilter === cat.value ? "active" : ""}
                role="button"
                tabIndex={0}
              >
                {cat.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="container">
          <div className="item-card-container">
            {items.map((item, idx) => (
              <ItemCard item={item} key={idx} />
            ))}
          </div>
        </div>
        {/* <ItemForm /> */}
      </div>
    </div>
  );
};

export default ItemList;