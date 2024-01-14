import axios from 'axios';
import { API_BOOKS } from '../../vars';
export const getReviewsByUserId = async (idUser) => {
  try {
    const responseReviews = await axios.get(`${API_BOOKS}/ebook/reviewsByUser/${idUser}?page=0`);

    const reviews = await Promise.all(responseReviews.data.reviews.map(async (review) => {
      const { ProductId, rating } = review;

      const responseBook = await axios.get(`${API_BOOKS}/ebook/products/${ProductId}`);

      const { id, title, image } = responseBook.data;

      return {id:id, title:title, image:image, rating:rating };
    }));

    return reviews;
  } catch (error) {
    console.log(error);
  }
}