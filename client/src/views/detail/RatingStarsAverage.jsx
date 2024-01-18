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
        setRatingValue(starsAverage);
      } catch (error) {
        console.log(error.message);
      }
    };
    showAverage();
  }, [productId]);

  return (
    <div>
      <Rating
        readonly={true}
        //{promedio de calificaciones}
        initialValue={ratingValue.data.averageRating}
        SVGstyle={{ display: 'inline-block' }}
        size={25}
      />
      <p className='dark:text-gray-100/30'>Valoración: {Number(ratingValue.data.averageRating)}</p>
    </div>
  );
}
export default RatingStarsAverage;
