import { useEffect, useState } from "react";
import ItemCard from "../../Component/ItemCard/ItemCard.jsx";
import { getFilteredItems } from "../../../services/itemService.js";
import "./itemlist.css";
import { categories } from "../../../common/utils.js";
import Hero from "../../Component/Hero/Hero.jsx";
import Message from "../../Component/Message/Message.jsx";

const ItemList = ({
  owner = null,
  heroText = "BidHub Marketplace",
  userbids = "false",
  favorites = "false",
  purchased = "false",
  messageText,
  hideFilters = false, // if dashboard render this will hide filter ui as needed
}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [conditionFilter, setConditionFilter] = useState("all");
  const [bidSort, setBidSort] = useState("none");
  const [endTimeSort, setEndTimeSort] = useState("none");
  const [createdSort, setCreatedSort] = useState("none");

  const fetchItems = async () => {
    try {
      const data = await getFilteredItems(
        hideFilters && !isFiltered() ? "all" : categoryFilter, // ignore filters in dashboard only if no filters applied
        hideFilters && !isFiltered() ? "all" : conditionFilter,
        hideFilters && !isFiltered() ? "none" : endTimeSort,
        hideFilters && !isFiltered() ? "none" : createdSort,
        hideFilters && !isFiltered() ? "none" : bidSort,
        owner,
        userbids,
        favorites,
        purchased
      );
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [
    categoryFilter,
    conditionFilter,
    bidSort,
    endTimeSort,
    createdSort,
    favorites,
    hideFilters,
  ]);

  useEffect(() => {
    if (hideFilters) {
      setCategoryFilter("all");
      setConditionFilter("all");
      setBidSort("none");
      setEndTimeSort("none");
      setCreatedSort("none");
    }
  }, [hideFilters]);

  const handleFavoriteToggle = () => {
    if (favorites === "true") {
      fetchItems();
    }
  };

  const handleBidSortChange = (evt) => {
    setBidSort(evt.target.value);
  };

  const handleTimeSortChange = (evt) => {
    setEndTimeSort(evt.target.value);
  };

  const handleCreatedSortChange = (evt) => {
    setCreatedSort(evt.target.value);
  };

  const isFiltered = () =>
    categoryFilter !== "all" ||
    conditionFilter !== "all" ||
    bidSort !== "none" ||
    endTimeSort !== "none" ||
    createdSort !== "none";

  const showFilters = !hideFilters || isFiltered() || items.length > 0;

  if (loading) return <p>Loading…</p>;

  return (
    <div className="market-container">
      <div className="item-list">
        <Hero heroText={heroText} />
        {showFilters && (
          <>
            <div className="sort-container">
              <div className="filter-sort">
                <label htmlFor="sort-by-bid">Bid Amount</label>
                <select
                  id="sort-by-bid"
                  value={bidSort}
                  name="sort-by-bid"
                  onChange={handleBidSortChange}
                  required
                >
                  <option value="none">None</option>
                  <option value="desc">Highest</option>
                  <option value="asc">Lowest</option>
                </select>
              </div>
              <div className="filter-sort">
                <label htmlFor="sort-by-time">Time Remaining</label>
                <select
                  id="sort-by-time"
                  value={endTimeSort}
                  name="sort-by-time"
                  onChange={handleTimeSortChange}
                  required
                >
                  <option value="none">None</option>
                  <option value="desc">Ending Latest</option>
                  <option value="asc">Ending Soonest</option>
                </select>
              </div>
              <div className="filter-sort">
                <label htmlFor="sort-by-created">Date Created</label>
                <select
                  id="sort-by-created"
                  value={createdSort}
                  name="sort-by-created"
                  onChange={handleCreatedSortChange}
                  required
                >
                  <option value="none">None</option>
                  <option value="desc">Latest</option>
                  <option value="asc">Oldest</option>
                </select>
              </div>
            </div>
          </>
        )}

        <div className="section">
          <div className="section">
            {showFilters && (
              <>
                <div className="filter-container">
                  <div className="sub-header">
                    <h2>Condition</h2>
                  </div>
                  <ul>
                    <li
                      onClick={() => setConditionFilter("all")}
                      className={
                        conditionFilter === "all" ? "item-li active" : "item-li"
                      }
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) =>
                        e.key === "Enter" && setConditionFilter("all")
                      }
                    >
                      Any
                    </li>
                    <li
                      onClick={() => setConditionFilter("NEW")}
                      className={
                        conditionFilter === "NEW" ? "item-li active" : "item-li"
                      }
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) =>
                        e.key === "Enter" && setConditionFilter("NEW")
                      }
                    >
                      New
                    </li>
                    <li
                      onClick={() => setConditionFilter("USED")}
                      className={
                        conditionFilter === "USED"
                          ? "item-li active"
                          : "item-li "
                      }
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) =>
                        e.key === "Enter" && setConditionFilter("USED")
                      }
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
                      className={
                        categoryFilter === "all" ? "item-li active" : "item-li"
                      }
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) =>
                        e.key === "Enter" && setCategoryFilter("all")
                      }
                    >
                      All Categories
                    </li>
                    {categories.map((cat, idx) => (
                      <li
                        key={idx}
                        onClick={() => setCategoryFilter(cat.value)}
                        className={
                          categoryFilter === cat.value
                            ? "item-li active"
                            : "item-li"
                        }
                        role="button"
                        tabIndex={0}
                      >
                        {cat.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
            {items.length > 0 ? (
              <div className="item-grid">
                <div className="item-card-container">
                  {items.map((item, idx) => (
                    <ItemCard
                      item={item}
                      key={idx}
                      onFavoriteToggle={handleFavoriteToggle}
                    />
                  ))}
                  {items.length < 4 &&
                    Array.from({ length: 4 - items.length }, (_, idx) => (
                      <ItemCard
                        key={`placeholder-${idx}`}
                        isPlaceholder={true}
                      />
                    ))}
                </div>
              </div>
            ) : (
              <div className="no-items-message">
                {isFiltered() ? (
                  "No items were found that matched selected filters."
                ) : (
                  <Message text={messageText} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemList;
