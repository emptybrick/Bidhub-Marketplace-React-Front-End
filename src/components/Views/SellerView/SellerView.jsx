import { useState, useEffect, useContext } from "react";
import { deleteReview, getReviews } from "../../../services/reviewService.js";
import Hero from "../../Component/Hero/Hero.jsx";
import "./sellerview.css";
import { Link, useParams } from "react-router-dom";
import { getSellerProfile } from "../../../services/userService.js";
import { UserContext } from "../../../contexts/UserContext.jsx";
import ReviewForm from "../../Forms/ReviewForm/ReviewForm.jsx";

const SellerView = () => {
  const [reviews, setReviews] = useState([]);
  const [ratingSort, setRatingSort] = useState("none");
  const [dateSort, setDateSort] = useState("newest");
  const [seller, setSeller] = useState(null);
  const [hasReviewed, setHasReviewed] = useState(false);
  const { sellerId } = useParams();
  const { user } = useContext(UserContext);
  const [ showItem, setShowItem ] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  const fetchReviews = async () => {
    try {
      const reviewsData = await getReviews(sellerId, dateSort, ratingSort);
      setReviews(reviewsData.results || reviewsData);
      const sellerData = await getSellerProfile(sellerId);
      setSeller(sellerData);
      const userReviewCheck = reviewsData.results.filter(
        (review) => review.author.id === user.id
      );
      setHasReviewed(userReviewCheck.length >= 1);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [ratingSort, dateSort, sellerId, user.id]);

  const handleRatingSortChange = (evt) => {
    setRatingSort(evt.target.value);
  };

  const handleDateSortChange = (evt) => {
    setDateSort(evt.target.value);
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(sellerId, reviewId);
      fetchReviews();
    } catch (err) {
      console.log(err);
    }
  };

  const renderStarRating = (rating) => {
    if (rating == null || isNaN(rating)) {
      return <span>No rating available</span>;
    }
    const normalizedRating = Math.min(Math.max(Number(rating), 1), 5);
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
          <span key={i} className="star partial">
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
              src={seller.profile_image}
              alt="Seller Profile"
            />
          </div>
          <div className="top-right-section">
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
                      {new Date(seller.date_joined).toLocaleDateString()}
                    </span>
                  </li>
                  <li>
                    Total Items Sold:{" "}
                    <span className="span-bold">{seller.items_sold || 0}</span>
                  </li>
                  <li>User Rating: {renderStarRating(seller.user_rating)}</li>
                </ul>
              </div>
              <Link
                to={`/bidhub/seller/${sellerId}/marketplace`}
                className="marketplace-link"
                state={{ seller: seller }}
              >
                View {seller.username}'s Marketplace
              </Link>
            </div>
          </div>
        </div>
        <div className="details-bottom">
          <div className="reviews-subtitle">Reviews</div>
          <div className="sort-container reviews">
            <div className="review-form">
              {showItem && user.id != sellerId && (
                <div className="modal">
                  <ReviewForm
                    onClose={() => setShowItem(false)}
                    sellerId={sellerId}
                    refreshReviews={fetchReviews}
                  />
                </div>
              )}
            </div>
            <div className="filters-container">
              <div className="filter-sort">
                <label htmlFor="sort-by-date">Date</label>
                <select
                  id="sort-by-date"
                  value={dateSort}
                  name="sort-by-date"
                  onChange={handleDateSortChange}
                  required
                >
                  <option value="none">None</option>
                  <option value="desc">Latest</option>
                  <option value="asc">Oldest</option>
                </select>
              </div>
              <div className="filter-sort">
                <label htmlFor="sort-by-rating">Rating</label>
                <select
                  id="sort-by-rating"
                  value={ratingSort}
                  name="sort-by-rating"
                  onChange={handleRatingSortChange}
                  required
                >
                  <option value="none">None</option>
                  <option value="desc">Highest</option>
                  <option value="asc">Lowest</option>
                </select>
              </div>
            </div>
          </div>
          <div className="create-review-button">
            {!hasReviewed && user.id != sellerId && (
              <button
                className="create-review"
                onClick={() => setShowItem(true)}
              >
                New Review
              </button>
            )}
          </div>
          {reviews.length > 0 ? (
            <ul className="reviews-list">
              {reviews.map((review) => (
                <li key={review.id} className="review-item">
                  <div className="review-ratings">
                    <div className="star-rating">
                      Overall Rating: {renderStarRating(review.rating)}
                    </div>
                    <div className="top-section-review">
                      <p className="review-text">{review.review}</p>
                      <div className="ten-point-ratings">
                        <ul>
                          <li>
                            Customer Service:{" "}
                            {renderStarRating(review.service_rating)}
                          </li>
                          <li>
                            Product Quality:{" "}
                            {renderStarRating(review.product_rating)}
                          </li>
                          <li>
                            Shipping Packaging:{" "}
                            {renderStarRating(review.packaging_rating)}
                          </li>
                          <li>
                            Shipping Speed & Costs:{" "}
                            {renderStarRating(review.shipping_rating)}
                          </li>
                          <li>
                            Overall Experience:{" "}
                            {renderStarRating(review.overall_rating)}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="reviewer">
                    <div className="review-buttons">
                      {review.author.id === user.id && (
                        <>
                          <button onClick={() => setEditingReview(review)}>
                            Edit
                          </button>
                          <button onClick={() => handleDeleteReview(review.id)}>
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                    <div className="review-form">
                      {editingReview && (
                        <div className="modal">
                          <ReviewForm
                            onClose={() => setEditingReview(null)}
                            sellerId={sellerId}
                            reviewData={editingReview}
                            refreshReviews={fetchReviews}
                          />
                        </div>
                      )}
                    </div>
                    <div className="reviewer-info">
                      <span className="span-bold">
                        By {review.author.username}
                      </span>
                      <span>
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
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
