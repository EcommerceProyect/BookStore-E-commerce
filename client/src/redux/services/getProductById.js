import axios from 'axios';
import { setProductDetail } from '../slices/products';

const apiUrl = 'https://bookstore-e-commerce.onrender.com/ebook/products';

export const getProductsById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`);
    dispatch(setProductDetail(response.data));
  } catch (error) {
    console.error(error);
  }
};
