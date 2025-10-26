import React from "react";
import "./StarRating.css";

const StarRating = ({ name, value, onChange, required }) => {
  const handleRatingChange = (rating) => {

    const event = {
      target: {
        name,
        value: rating,
      },
    };
    onChange(event);
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1; 
        return (
          <label key={ratingValue}>
            <input
              type="radio"
              name={name}
              value={ratingValue}
              checked={Number(value) === ratingValue}
              onChange={() => handleRatingChange(ratingValue)}
              required={required}
            />
            <span className="star">&#9733;</span>
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
