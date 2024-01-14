import axios from 'axios';
import {
  APIDOMAIN
} from '../../vars';
import { userAdminStart, userAdminSuccess, userAdminFailure } from '../slices/userData';
export const userAdmin = (userId) => {
  return async (dispatch) => {
    try {
        const token = localStorage.getItem("actualT");
    
  
        if (token) {
            dispatch(userAdminStart())
            const response = await axios.put(
              `${APIDOMAIN}/authorized/${userId}?route=admin&token=${token}`
            );
          dispatch(userAdminSuccess(userId));
          console.log("Usuario asignado como administrador");
          return response;
        } else {
          throw new Error("No se tiene el token de acceso");
        }
      } catch (error) {
        console.error(error);
        dispatch(userAdminFailure(error));
  
        throw error;
      }
    };
  };