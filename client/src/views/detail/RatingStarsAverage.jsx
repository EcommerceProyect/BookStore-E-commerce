import React, { useEffect, useState } from 'react';

import { Rating } from 'react-simple-star-rating';
import { getRatingStarsAverage } from '../../redux/services/getRatingAverage';

function RatingStarsAverage(productId) {
  const [ratingValue, setRatingValue] = useState({
    data: { averageRating: 0 },
  });

  useEffect(() => {
    const showAverage = async () => {
      try {
        const starsAverage = await getRatingStarsAverage(productId);
        console.log('el promedio es', starsAverage.data.averageRating);
        console.log('hola', ratingValue.data.averageRating);
        setRatingValue(starsAverage);
      } catch (error) {
        console.log(error.message);
      }
    };
    showAverage();
  }, [productId]);

  //actualizar el valor de la calificación
  const handleRating = (rate) => {
    setRatingValue(rate);
  };

  // restablecer la calificación
  const handleReset = () => {
    setRatingValue(0);
  };

  return (
    <Rating
      readonly={true}
      //{promedio de calificaciones}
      initialValue={ratingValue.data.averageRating}
      SVGstyle={{ display: 'inline-block' }}
      size={25}
    />
  );
}
export default RatingStarsAverage;
