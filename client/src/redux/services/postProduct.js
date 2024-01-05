import axios from 'axios'
import { addToProductList } from '../slices/products'

export const postProduct = (product) => {
  return async (dispatch) => {
    
    try {
      const token =localStorage.getItem("actualT");
      if(token){
        const response = await axios.post(
          `http://localhost:3001/authorized?route=products&token=${token}`,
          product,
        )
        dispatch(addToProductList(product))
        return response
      }else{
        throw new Error("No se tiene el token de acceso")
      }

    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
