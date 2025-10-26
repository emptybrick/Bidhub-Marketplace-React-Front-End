import React, { useState } from "react";
import "./StarRating.css";

const StarRating = ({ name, value, onChange, required, fivePointRating }) => {
  const [hoveredRating, setHoveredRating] = useState(null);

  const handleRatingChange = (rating) => {
    const event = {
      target: {
        name,
        value: rating,
      },
    };
    console.log("handleRatingChange:", { name, value: rating });
    onChange(event);
  };

  return (
    <div className="star-rating">
      {[...fivePointRating].reverse().map((ratingValue) => {
        const inputId = `${name}-${ratingValue}`;
        const isFilled = Number(value) >= ratingValue; // For selection
        const isHovered = hoveredRating && Number(hoveredRating) >= ratingValue; // For hover
        return (
          <label
            key={ratingValue}
            htmlFor={inputId}
            onMouseEnter={() => setHoveredRating(ratingValue)}
            onMouseLeave={() => setHoveredRating(null)}
          >
            <input
              type="radio"
              id={inputId}
              name={name}
              value={ratingValue}
              checked={Number(value) === ratingValue}
              onChange={() => handleRatingChange(ratingValue)}
              required={required}
            />
            <span className={`star ${isFilled || isHovered ? "filled" : ""}`}>
              &#9733;
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
