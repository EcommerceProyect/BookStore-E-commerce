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
        userId: userId,
        OrderId: orderId,
        rating: ratingValue,
      };

      const response = await axios.post(`${API_BOOKS}/ebook/reviews`, data);

      console.log(response);
      dispatch(setNewRating());
      return response;
    } catch (error) {
      console.error(error);
    }
  };
};

export const putRatingStars = (rating, productId, userId) => {
  return async (dispatch) => {
    try {
      const data = {
        rating: rating,
      };

      const reviewId = (
        await axios.get(
          `${API_BOOKS}/ebook/reviews/${productId}?userId=${userId}`,
        )
      ).data.reviews?.id;

      console.log(reviewId, 'SOY EL REVIEW ID');
      const response = await axios.put(
        `${API_BOOKS}/ebook/reviews/${reviewId}`,
        data,
      );
      dispatch(setNewRating());
      return response;
    } catch (error) {
      console.log(error.message);
    }
  };
};
