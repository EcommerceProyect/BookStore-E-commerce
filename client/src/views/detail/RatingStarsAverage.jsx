import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating';

function RatingStarsAverage(readonly) {
  const [ratingValue, setRatingValue] = useState(3);

  //actualizar el valor de la calificación
  const handleRating = (rate) => {
    setRatingValue(rate);
  };

  // restablecer la calificación
  const handleReset = () => {
    setRatingValue(0);
  };

 return(
      <Rating
        readonly={true}
        //{promedio de calificaciones}
        initialValue={ratingValue}
        SVGstyle={{ display: 'inline-block' }}
        size={25}
      />
    );
}
export default RatingStarsAverage;
