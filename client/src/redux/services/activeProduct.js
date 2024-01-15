import axios from 'axios';
import { activeProductStart, activeProductSuccess, activeProductFailure } from '../slices/products'
import {
  API_BOOKS,
  APIDOMAIN
} from '../../vars';

export const activeProduct= (productId) => {
    return async (dispatch) => {
      try {
        const token = localStorage.getItem("actualT");
        if (token) {
          dispatch(activeProductStart());
          const response = await axios.patch(
            `${APIDOMAIN}/authorized/${productId}?route=products&token=${token}`
          );
          dispatch(activeProductSuccess(productId));

          return response;
        } else {
          throw new Error("No se tiene el token de acceso");
        }
      } catch (error) {
        console.error(error);
        dispatch(activeProductFailure(error.message)); 
        throw error;
      }
    };
  };