import axios from 'axios';
import { modifyProductList } from '../slices/products';
import {
  API_BOOKS
} from '../../vars';

export const putProduct = (product, id) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${API_BOOKS}/ebook/products`,
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
