import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import navigate
import { UserContext } from "../../../contexts/UserContext";
import { createReview } from "../../../services/reviewService";

const ReviewForm = ({ sellerId, reviewData = null, onClose }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate(); // Define navigate
  const [formData, setFormData] = useState({
    seller_id: sellerId,
    author: user.id,
    review: reviewData?.review || "",
    service_rating: reviewData?.service_rating || "",
    product_rating: reviewData?.product_rating || "",
    package_rating: reviewData?.package_rating || "",
    shipping_rating: reviewData?.shipping_rating || "",
    overall_rating: reviewData?.overall_rating || "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // Define errorMessage state

  const tenPointRating = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await createReview(sellerId, formData);
      navigate(`/bidhub/seller/${sellerId}`);
    } catch (err) {
      console.error("Error creating review:", err);
      setErrorMessage(
        err.message || "Error creating review. Please try again."
      );
    }
  };

  const isFormInvalid = () => {
    return !(
      formData.review &&
      formData.service_rating &&
      formData.product_rating &&
      formData.package_rating &&
      formData.shipping_rating &&
      formData.overall_rating
    );
  };

  return (
    <div className="review-form">
      <form onSubmit={handleSubmit}>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="form-inputs">
          <div className="review-input">
            <label htmlFor="review">Review: </label>
            <textarea
              name="review"
              id="review"
              value={formData.review}
              onChange={handleChange}
              required
            />
          </div>
          <div className="rating-inputs">
            <label htmlFor="service_rating">Customer Service: </label>
            <select
              name="service_rating"
              id="service_rating"
              value={formData.service_rating}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select a rating
              </option>
              {tenPointRating.map((rating) => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </select>
          </div>
          <div className="rating-inputs">
            <label htmlFor="product_rating">Product Quality: </label>
            <select
              name="product_rating"
              id="product_rating"
              value={formData.product_rating}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select a rating
              </option>
              {tenPointRating.map((rating) => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </select>
          </div>
          <div className="rating-inputs">
            <label htmlFor="package_rating">Shipping Packaging: </label>
            <select
              name="package_rating"
              id="package_rating"
              value={formData.package_rating}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select a rating
              </option>
              {tenPointRating.map((rating) => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </select>
          </div>
          <div className="rating-inputs">
            <label htmlFor="shipping_rating">Shipping Speed & Costs: </label>
            <select
              name="shipping_rating"
              id="shipping_rating"
              value={formData.shipping_rating}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select a rating
              </option>
              {tenPointRating.map((rating) => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </select>
          </div>
          <div className="rating-inputs">
            <label htmlFor="overall_rating">Overall Experience: </label>
            <select
              name="overall_rating"
              id="overall_rating"
              value={formData.overall_rating}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select a rating
              </option>
              {tenPointRating.map((rating) => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-buttons">
          <button type="submit" disabled={isFormInvalid()}>
            Create
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
