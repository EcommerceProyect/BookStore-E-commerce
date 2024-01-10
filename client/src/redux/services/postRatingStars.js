import axios from 'axios';
import { useState, useEffect} from 'react';
import { setNewRating } from '../slices/ratingStarsAverage';



export const postRatingStars = (rate) => {

  return async (dispatch) => {
    try {
      const response = await axios.post();
      dispatch(setNewRating);
      return response;
    } catch (error) {
      console.error(error);
    }
  };
};
