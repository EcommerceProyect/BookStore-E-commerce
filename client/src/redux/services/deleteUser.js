import axios from 'axios';
import { deleteUserStart, deleteUserSuccess, deleteUserFailure } from '../slices/userList'
import {
  APIDOMAIN
} from '../../vars';

export const deleteUser = (userId) => {
    return async (dispatch) => {
      try {
        const token = localStorage.getItem("actualT");
        if (token) {
          dispatch(deleteUserStart());
          const response = await axios.delete(
            `${APIDOMAIN}/authorized/${userId}?route=users&token=${token}`
          );
          dispatch(deleteUserSuccess(userId));

          return response;
        } else {
          throw new Error("No se tiene el token de acceso");
        }
      } catch (error) {
        console.error(error);
        dispatch(deleteUserFailure(error.message)); 
        throw error;
      }
    };
  };