import axios from 'axios'
import {
  setProductList,
  setProductListLoading,
  setProductListError,
} from '../slices/products'

const apiUrl = 'https://bookstore-e-commerce.onrender.com/ebook/products'

export const getTotalProducts = async () => {
  try {
    const response = await axios.get(apiUrl);
    const totalProducts = response.data.length;
    return totalProducts;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const getProducts = (page) => async (dispatch) => {
  dispatch(setProductListLoading())

  try {
    const response = await axios.get(`${apiUrl}?page=${page}`)
    dispatch(setProductList(response.data))
  } catch (error) {
    dispatch(setProductListError(error.message))
  }
}
