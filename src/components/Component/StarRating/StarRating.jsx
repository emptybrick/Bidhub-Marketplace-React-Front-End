import { useState } from "react";
import "./StarRating.css"

const StarRating = ({ name, value, onChange, required, fivePointRating }) => {
  const [hoveredRating, setHoveredRating] = useState(null);
  const numericValue = value !== "" ? Number(value) : null;

  const handleRatingChange = (rating) => {
    onChange({
      target: {
        name,
        value: rating,
      },
    });
  };

  return (
    <div className="star-rating">
      {[...fivePointRating].reverse().map((ratingValue) => {
        const inputId = `${name}-${ratingValue}`;
        const isFilled = numericValue >= ratingValue;
        const isHovered = hoveredRating >= ratingValue;

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
              checked={numericValue === ratingValue}
              onChange={() => handleRatingChange(ratingValue)}
              required={required}
            />
            <span className={`star ${isFilled || isHovered ? "filled" : ""}`}>
              ★
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default StarRating