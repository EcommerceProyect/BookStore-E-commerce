import axios from 'axios';
import { setProductDetail } from '../slices/products';
import {
  API_BOOKS
} from '../../vars';

const apiUrl = `${API_BOOKS}/ebook/products`;


export const getProductsById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`);
    dispatch(setProductDetail(response.data));
  } catch (error) {
    console.error(error);
  }
};
