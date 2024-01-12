import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Rating } from 'react-simple-star-rating';
import { postRatingStars } from '../../redux/services/postRatingStars';

function RatingStarsSetter(readonly) {
  const dispatch = useDispatch();
  const [ratingValue, setRatingValue] = useState(0);

  //actualizar el valor de la calificación
  const handleRating = ({ productId, userId, rate, orderId }) => {
    dispatch(postRatingStars({ productId, userId, rate, orderId }));
  };

  // restablecer la calificación
  //const handleReset = () => {
  //  setRatingValue(0);
  //};

  return (
    <div className="grid border p-4 m-4 rounded-md w-full justify-items-center">
      <h2>¿Te gustó este libro?</h2>
      <Rating
        readonly={false}
        onClick={handleRating}
        initialValue={ratingValue}
        SVGstyle={{ display: 'inline-block' }}
        size={25}
      />
    </div>
  );
}
export default RatingStarsSetter;
