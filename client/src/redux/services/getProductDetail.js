import axios from 'axios';
import {
  setProductDetail,
  setProductDetailLoading,
  setProductDetailError,
} from '../slices/products';



export const getProductDetails = (id) => async (dispatch) => {
  const apiUrl = `https://bookstore-e-commerce.onrender.com/ebook/products/${id}`;
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
