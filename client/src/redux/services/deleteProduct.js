import axios from 'axios';
import { deleteProductStart, deleteProductSuccess, deleteProductFailure } from '../slices/products'
import {
  API_BOOKS,
  APIDOMAIN
} from '../../vars';

export const deleteProduct= (productId) => {
    return async (dispatch) => {
      try {
        const token = localStorage.getItem("actualT");
        if (token) {
          dispatch(deleteProductStart());
          const response = await axios.delete(
            `${APIDOMAIN}/authorized/${productId}?route=products&token=${token}`
          );
          console.log(response)
          dispatch(deleteProductSuccess(productId));

          return response;
        } else {
          throw new Error("No se tiene el token de acceso");
        }
      } catch (error) {
        console.error(error);
        dispatch(deleteProductFailure(error.message)); 
        throw error;
      }
    };
  };