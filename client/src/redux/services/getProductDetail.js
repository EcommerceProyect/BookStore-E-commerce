import axios from 'axios';
import {
  setProductDetail,
  setProductDetailLoading,
  setProductDetailError,
} from '../slices/products';
import {
  API_BOOKS
} from '../../vars';


export const getProductDetails = (id) => async (dispatch) => {
  const apiUrl = `${API_BOOKS}/ebook/products/${id}`;
  dispatch(setProductDetailLoading());
  try {
    const response = await axios.get(`${apiUrl}`);
    const bookDetail = response.data;
    

    if (bookDetail) {
      dispatch(setProductDetail(bookDetail));
    } else {
      dispatch(setProductDetailError('Product not found'));
    }
  } catch (error) {
    dispatch(setProductDetailError(error.message));
  }
};
