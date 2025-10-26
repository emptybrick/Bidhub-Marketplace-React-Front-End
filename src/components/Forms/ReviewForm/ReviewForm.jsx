import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { createReview, updateReview } from "../../../services/reviewService";
import "../form.css";
import StarRating from "../../Component/StarRating/StarRating";


const ReviewForm = ({
  sellerId,
  reviewData = null,
  onClose,
  refreshReviews,
}) => {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    seller_id: sellerId,
    author: user.id,
    review: reviewData?.review || "",
    service_rating: reviewData?.service_rating || "",
    product_rating: reviewData?.product_rating || "",
    packaging_rating: reviewData?.packaging_rating || "",
    shipping_rating: reviewData?.shipping_rating || "",
    overall_rating: reviewData?.overall_rating || "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // Define errorMessage state

  const tenPointRating = [1, 2, 3, 4, 5];

  const handleChange = (evt) => {
    console.log(evt)
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await createReview(sellerId, formData);
      refreshReviews();
      onClose();
    } catch (err) {
      console.error("Error creating review:", err);
      setErrorMessage(
        err.request.response || "Error creating review. Please try again."
      );
    }
  };

  const handleUpdate = async (evt) => {
    evt.preventDefault();
    try {
      console.log(formData);
      await updateReview(sellerId, reviewData.id, formData);
      refreshReviews();
      onClose();
    } catch (err) {
      console.error("Error updating review:", err);
      setErrorMessage(
        err.message || "Error updating review. Please try again."
      );
    }
  };

  const isFormInvalid = () => {
    return !(
      formData.review &&
      formData.service_rating &&
      formData.product_rating &&
      formData.packaging_rating &&
      formData.shipping_rating &&
      formData.overall_rating
    );
  };

 return (
   <div className="form-wrapper">
     <div className="form-container">
       <button className="form-close-btn" type="button" onClick={onClose}>
         ×
       </button>
       <div className="form-title">Review Form</div>
       <form onSubmit={handleSubmit}>
         {errorMessage && <div className="error-message">{errorMessage}</div>}
         <div className="form-inputs">
           <div className="form-group review-input">
             <label htmlFor="review">Review</label>{" "}
             {/* Added text for accessibility */}
             <textarea
               name="review"
               id="review"
               value={formData.review}
               onChange={handleChange}
               placeholder="Describe your experience here..."
               required
             />
           </div>
           <div className="rating-inputs">
             <div className="form-group rating-input">
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
             <div className="form-group rating-input">
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
             <div className="form-group rating-input">
               <label htmlFor="packaging_rating">Shipping Packaging: </label>
               <select
                 name="packaging_rating"
                 id="packaging_rating"
                 value={formData.packaging_rating}
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
             <div className="form-group rating-input">
               <label htmlFor="shipping_rating">Shipping Speed & Costs: </label>
               <StarRating
                 name="shipping_rating"
                 value={formData.shipping_rating}
                 onChange={handleChange}
                 required
               />
             </div>
             <div className="form-group rating-input">
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
         </div>
         <div className="form-buttons">
           {reviewData ? (
             <button type="button" onClick={handleUpdate}>
               Update
             </button>
           ) : (
             <button type="submit" disabled={isFormInvalid()}>
               Create
             </button>
           )}
           <button type="button" onClick={onClose}>
             Cancel
           </button>
         </div>
       </form>
     </div>
   </div>
 );
};

export default ReviewForm;
