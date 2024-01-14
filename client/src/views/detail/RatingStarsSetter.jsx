import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Rating } from 'react-simple-star-rating';
import {
  postRatingStars,
  putRatingStars,
} from '../../redux/services/postRatingStars';

import { Toaster, toast } from 'sonner';

function RatingStarsSetter(props) {
  const dispatch = useDispatch();
  const [ratingValue, setRatingValue] = useState(null);
  const { productId, userId, orderId } = props;

  //actualizar el valor de la calificación
  const onPointerMove = (value) => setRatingValue(value);
  const handleRating = () => {
    toast.info(`Su calificación fue de: ${ratingValue}`, {
      duration: 1500,
      icon: '📖',
    });
    if (ratingValue) {
      dispatch(postRatingStars({ productId, userId, ratingValue, orderId }));
    }

    console.log(
      productId,
      userId,
      ratingValue,
      orderId,
      'Soy el producsasadaadaAAAAAA',
    );
    //Hago update del rating si es que el posteo falla
    dispatch(putRatingStars(ratingValue, productId, userId));
  };

  return (
    <div className="grid border p-4 m-4 rounded-md w-full justify-items-center">
      <h2>¿Te gustó este libro?</h2>
      <Rating
        readonly={false}
        onClick={handleRating}
        initialValue={ratingValue}
        SVGstyle={{ display: 'inline-block' }}
        onPointerMove={onPointerMove}
        size={25}
      />
      <Toaster richColors />
    </div>
  );
}
export default RatingStarsSetter;
