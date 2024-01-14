import axios from 'axios';
import {
  APIDOMAIN
} from '../../vars';
import { userActiveStart, userActiveSuccess, userActiveFailure } from '../slices/userData';

export const activeUser = (userId) => {
  return async (dispatch) => {
    try {
        const token = localStorage.getItem("actualT");
    
  
        if (token) {
            dispatch(userActiveStart())
            const response = await axios.put(
              `${APIDOMAIN}/authorized/${userId}?route=activeuser&token=${token}`
            );
          dispatch(userActiveSuccess(userId));
          return response;
        } else {
          throw new Error("No se tiene el token de acceso");
        }
      } catch (error) {
        console.error(error);
        dispatch(userActiveFailure(error));
  
        throw error;
      }
    };
  };