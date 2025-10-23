import { useState, useEffect } from "react";
import { getReviews } from "../../../services/reviewService.js";
import Hero from "../../Component/Hero/Hero.jsx";
import "./sellerview.css";
import { Link, useLocation } from "react-router-dom";

const SellerView = () => {
  const [reviews, setReviews] = useState([]);
  const [sortOrder, setSortOrder] = useState("-rating"); // Default to highest first
  const location = useLocation();
  const seller = location.state?.seller;
  const sellerId = seller.id

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getReviews(seller.id, { ordering: sortOrder });
        setReviews(response.results || response);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    if (seller?.id) {
      fetchReviews();
    }
  }, [seller, sortOrder]);

  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
  };

  // Function to render star rating (0.01 to 5.00 as 5 stars)
  const renderStarRating = (rating) => {
    if (rating == null || isNaN(rating)) {
      return <span>No rating available</span>;
    }
    const normalizedRating = Math.min(Math.max(Number(rating), 0), 5); // Ensure rating is a number and between 0 and 5
    const fullStars = Math.floor(normalizedRating);
    const partialStar = normalizedRating - fullStars;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} className="star filled">
            ★
          </span>
        );
      } else if (i === fullStars && partialStar > 0) {
        stars.push(
          <span
            key={i}
            className="star partial"
            style={{ width: `${partialStar * 100}%` }}
          >
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="star">
            ☆
          </span>
        );
      }
    }
    return (
      <span>
        {stars} ({normalizedRating.toFixed(2)})
      </span>
    );
  };

  // Function to render 1-10 bubble ratings
  const renderBubbleRating = (rating) => {
    if (rating == null || isNaN(rating)) {
      return <span>No rating available</span>;
    }
    const bubbles = [];
    for (let i = 1; i <= 10; i++) {
      bubbles.push(
        <span
          key={i}
          className={`bubble ${i <= rating ? "filled" : ""}`}
          title={`${i}/10`}
        >
          ●
        </span>
      );
    }
    return <div className="bubble-rating">{bubbles}</div>;
  };

  if (!seller) {
    return <p>No seller data available.</p>;
  }

  return (
    <div className="seller-view-container">
      <Hero heroText={`${seller.username}'s Page`} />
      <div className="seller-view-section">
        <div className="details-top">
          <div className="seller-image">
            <img
              className="seller-profile-image"
              src="https://i.pinimg.com/originals/ac/7e/6e/ac7e6e502e370c83f333e574b1216922.jpg"
              alt="Seller Profile"
            />
          </div>
          <div className="top-right-section">
            <Link
              to={`/bidhub/seller/${sellerId}/marketplace`}
              className="marketplace-link"
              state={{ seller: seller }}
            >
              View {seller.username}'s Marketplace
            </Link>
            <div className="seller-info-section">
              <div className="seller-detail-subtitle">Seller Details</div>
              <div className="seller-info">
                <ul className="seller-info-left">
                  <li>
                    Username:{" "}
                    <span className="span-bold">{seller.username}</span>
                  </li>
                  <li>
                    Joined:{" "}
                    <span className="span-bold">
                      {new Date(seller.created_at).toLocaleDateString()}
                    </span>
                  </li>
                  <li>
                    Total Items Sold:{" "}
                    <span className="span-bold">{seller.items_sold || 0}</span>
                  </li>
                  <li>User Rating: {renderStarRating(seller.user_rating)}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="details-bottom">
          <div className="reviews-subtitle">Reviews</div>
          <div className="sort-controls">
            <button
              className={sortOrder === "-rating" ? "active" : ""}
              onClick={() => handleSortChange("-rating")}
            >
              Highest Rating First
            </button>
            <button
              className={sortOrder === "rating" ? "active" : ""}
              onClick={() => handleSortChange("rating")}
            >
              Lowest Rating First
            </button>
          </div>
          {reviews.length > 0 ? (
            <ul className="reviews-list">
              {reviews.map((review) => (
                <li key={review.id} className="review-item">
                  <div className="review-ratings">
                    <div className="star-rating">
                      Rating: {renderStarRating(review.rating)}
                    </div>
                    <div className="ten-point-ratings">
                      <ul>
                        <li>
                          Customer Service:{" "}
                          {renderBubbleRating(review.service_rating)}
                        </li>
                        <li>
                          Product Quality:{" "}
                          {renderBubbleRating(review.product_rating)}
                        </li>
                        <li>
                          Shipping Packaging:{" "}
                          {renderBubbleRating(review.packaging_rating)}
                        </li>
                        <li>
                          Shipping Speed & Costs:{" "}
                          {renderBubbleRating(review.shipping_rating)}
                        </li>
                        <li>
                          Overall Experience:{" "}
                          {renderBubbleRating(review.overall_rating)}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <p className="review-text">{review.text}</p>
                  <div className="reviewer">
                    By{" "}
                    <span className="span-bold">{review.author.username}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-reviews">No reviews yet for this seller.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerView;
