import axios from 'axios';
import { useState, useEffect } from 'react';
import { setNewRating } from '../slices/ratingStarsAverage';
import { API_BOOKS } from '../../vars';

export const postRatingStars = ({
  productId,
  userId,
  orderId,
  ratingValue,
}) => {
  return async (dispatch) => {
    try {
      console.log('soy el post', productId, userId, orderId, ratingValue);
      const data = {
        ProductId: productId,
        userId,
        OrderId: orderId,
        rating: ratingValue,
      };

      const response = await axios.post(`${API_BOOKS}/ebook/reviews`, data);
      dispatch(setNewRating());
      return response;
    } catch (error) {
      console.error(error);
    }
  };
};
