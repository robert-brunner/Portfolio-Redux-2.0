import React from 'react';
import './StarRating.css';

const StarRating = () => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {        
        return (
          <span key={index} className="star">&#9733;</span>
        );
      })}
    </div>
  );
}

export default StarRating;
