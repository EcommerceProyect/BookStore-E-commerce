import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating';

function RatingStarsSetter(readonly) {
  const [ratingValue, setRatingValue] = useState();

  //actualizar el valor de la calificación
  const handleRating = (rate) => {
    setRatingValue(rate);
  };

  // restablecer la calificación
  const handleReset = () => {
    setRatingValue(0);
  };

 return(
      <div className="grid border p-4 m-4 rounded-md w-full justify-items-center">
        <h2>¿Te gustó este libro?</h2>
        <Rating
          readonly={false}
          //onClick={action de post}
          initialValue={ratingValue}
          SVGstyle={{ display: 'inline-block' }}
          size={25}
        />
      </div>
    );
  
}
export default RatingStarsSetter;
