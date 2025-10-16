import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../lib/api";

const SellerPage = () => {
  const [reviews, setReviews] = useState([]);
  const [sortOrder, setSortOrder] = useState("-rating"); // Default to highest first
  const { sellerId } = useParams(); // Get seller ID from URL

  useEffect(() => {
    // Fetch reviews when component mounts or sort order changes
    const fetchReviews = async () => {
      try {
        const { data } = await api.get(
          `/seller-reviews/${sellerId}/?sort=${sortOrder}`
        );
        setReviews(data.results || data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [sellerId, sortOrder]);

  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
  };

  return (
    <div className="seller-page">
      <h1>Seller Profile</h1>

      {/* Seller info would go here */}

      <div className="reviews-section">
        <h2>Reviews</h2>

        <div className="sort-controls">
          <button onClick={() => handleSortChange("-rating")}>
            Highest Rating First
          </button>
          <button onClick={() => handleSortChange("rating")}>
            Lowest Rating First
          </button>
        </div>

        {reviews.length > 0 ? (
          <ul className="reviews-list">
            {reviews.map((review) => (
              <li key={review.id} className="review-item">
                <div className="rating">{review.rating} ★</div>
                <p>{review.text}</p>
                <div className="reviewer">By {review.author.username}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet for this seller</p>
        )}
      </div>
    </div>
  );
};

export default SellerPage;
