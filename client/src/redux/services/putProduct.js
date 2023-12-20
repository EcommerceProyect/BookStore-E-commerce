import axios from 'axios';
import { modifyProductList } from '../slices/products';

export const putProduct = (product, id) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        'https://bookstore-e-commerce.onrender.com/ebook/products',
        product,
        id,
      );
      dispatch(modifyProductList(product, id));
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
};
