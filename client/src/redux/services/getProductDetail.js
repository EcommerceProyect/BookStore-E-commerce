import axios from 'axios';
import {
  setProductDetail,
  setProductDetailLoading,
  setProductDetailError,
} from '../slices/products';

const apiUrl = 'https://bookstore-e-commerce.onrender.com/ebook/products';

export const getProductDetails = (id) => async (dispatch) => {
  dispatch(setProductDetailLoading());
  try {
    const response = await axios.get(`${apiUrl}`);
    const allProducts = response.data;
    const bookDetail = allProducts.find((product) => product.id === id);

    if (bookDetail) {
      dispatch(setProductDetail(bookDetail));
    } else {
      dispatch(setProductDetailError('Product not found'));
    }
  } catch (error) {
    dispatch(setProductDetailError(error.message));
  }
};
