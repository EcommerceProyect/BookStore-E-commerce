import axios from 'axios'
import {
  setProductList,
  setProductListLoading,
  setProductListError,
} from '../slices/products'

const apiUrl = 'https://bookstore-e-commerce.onrender.com/ebook/products'

export const getProducts = (page) => async (dispatch) => {
  dispatch(setProductListLoading())
  try {
    const response = await axios.get(`${apiUrl}`)
    dispatch(setProductList(response.data))
  } catch (error) {
    dispatch(setProductListError(error.message))
  }
}
