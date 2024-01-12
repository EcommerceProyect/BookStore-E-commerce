import axios from 'axios';
import { useState, useEffect } from 'react';
import { setNewRating } from '../slices/ratingStarsAverage';

export const postRatingStars = ({ productId, userId, orderId }) => {
  return async (dispatch) => {
    try {
      const data = { productId, userId, orderId };
      const rate = 3;
      const response = await axios.post(`http://localhost:3002/ebook/reviews`, {
        data,
        rate,
      });
      dispatch(setNewRating());
      return response;
    } catch (error) {
      console.error(error);
    }
  };
};
