import axios from 'axios';
import { setRatingAverage } from '../slices/ratingStarsAverage';
import { API_BOOKS } from '../../vars';

export const getRatingStarsAverage = async ({ productId }) => {
  try {
    const response = await axios.get(
      `http://localhost:3002/ebook/reviews/average/${productId}`,
    );
    return response;
  } catch (error) {
    console.log(error.message);
  }
};
