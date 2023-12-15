import axios from 'axios'
import { addToProductList } from '../slices/products'

export const postProduct = (product) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        'https://bookstore-e-commerce.onrender.com/ebook/products',
        product,
      )
      dispatch(addToProductList(product))
    } catch (error) {
      console.error(error)
    }
  }
}
