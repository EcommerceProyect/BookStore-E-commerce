import axios from 'axios'
import { addToProductList, setProductDetailError, setProductListError, setProductListLoading } from '../slices/products'
import {
  APIDOMAIN
} from '../../vars';
export const postProduct = (product) => {
  return async (dispatch) => {
    
    try {
      const token =localStorage.getItem("actualT");
      if(token){
        const response = await axios.post(
          `${APIDOMAIN}/authorized?route=products&token=${token}`,
          product
        )
        dispatch(addToProductList(product))
        return response
      }else{
        dispatch(setProductListError("El libro no pudo ser creado correctamente"))
        throw new Error("No se tiene el token de acceso")
      }

    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
