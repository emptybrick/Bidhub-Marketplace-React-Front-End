// frontend/src/pages/OrdersPage.jsx (List + Pay)
// should show bids user current has active in active auctions
// re-useable componenets: item-card

import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/UserContext.jsx";
// import api from "../lib/api.js";

const BidsPage = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Add state for filters
  const [filters, setFilters] = useState({
    start_date: "",
    end_date: "",
    sort: "created_at",
    direction: "desc",
    recent: "",
  });

  async function loadBids() {
    setLoading(true);
    try {
      // Use the filter parameters in the API request
      const { data } = await api.get("/bids/", {
        params: filters,
      });

      setBids(data.results || data);
    } catch (error) {
      console.error("Error loading bids:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBids();
  }, []); // Load initially without filters

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Apply filters when form is submitted
  const applyFilters = (e) => {
    e.preventDefault();
    loadBids();
  };

  // Handle recent filter buttons
  const setRecentFilter = (period) => {
    setFilters((prev) => ({
      ...prev,
      recent: period,
      // Clear date range when using recent filter
      start_date: "",
      end_date: "",
    }));

    // Apply immediately when selecting a quick filter
    loadBids();
  };

  return (
    <div className="container">
      <h2>My Bids</h2>

      {/* Filter Form */}
      <div className="filter-section">
        <h4>Filter Bids</h4>
        <div className="quick-filters">
          <button type="button" onClick={() => setRecentFilter("24h")}>
            Last 24 Hours
          </button>
          <button type="button" onClick={() => setRecentFilter("7d")}>
            Last 7 Days
          </button>
          <button type="button" onClick={() => setRecentFilter("30d")}>
            Last 30 Days
          </button>
        </div>

        <form onSubmit={applyFilters}>
          <div className="form-group">
            <label>Start Date:</label>
            <input
              type="date"
              name="start_date"
              value={filters.start_date}
              onChange={handleFilterChange}
            />
          </div>

          <div className="form-group">
            <label>End Date:</label>
            <input
              type="date"
              name="end_date"
              value={filters.end_date}
              onChange={handleFilterChange}
            />
          </div>

          <div className="form-group">
            <label>Sort By:</label>
            <select
              name="sort"
              value={filters.sort}
              onChange={handleFilterChange}
            >
              <option value="created_at">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>

          <div className="form-group">
            <label>Direction:</label>
            <select
              name="direction"
              value={filters.direction}
              onChange={handleFilterChange}
            >
              <option value="desc">Highest/Newest First</option>
              <option value="asc">Lowest/Oldest First</option>
            </select>
          </div>

          <button type="submit">Apply Filters</button>
        </form>
      </div>

      {/* Bids List */}
      {loading ? (
        <p>Loading bids...</p>
      ) : bids.length > 0 ? (
        <div className="bids-list">
          {bids.map((bid) => (
            <div className="card" key={bid.id}>
              <h4>Bid on {bid.item.title}</h4>
              <p>
                <strong>Bid Amount:</strong> ${bid.amount}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(bid.created_at).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {bid.item.auction_end &&
                new Date(bid.item.auction_end) < new Date()
                  ? bid.is_winning
                    ? "You won!"
                    : "Auction ended"
                  : "Auction active"}
              </p>
              <a href={`/items/${bid.item.id}`}>View Item</a>
            </div>
          ))}
        </div>
      ) : (
        <p>No bids found. Start bidding on items!</p>
      )}
    </div>
  );
};

export default BidsPage;
