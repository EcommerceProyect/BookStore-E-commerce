import axios from 'axios';
import { updateUserData } from '../slices/userData';
import { PUBLICAPIDOMAIN } from '../../vars';

export const updateUser = (userData) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('actualT');
      if (token) {
        console.log(userData.id);
        console.log(userData);
        const response = await axios.put(
          `${PUBLICAPIDOMAIN}/ebook/user/${userData.id}`,
          userData,
        );
        dispatch(updateUserData(userData));
        return response;
      } else {
        throw new Error('No se pudo actualizar la información del usuario');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
};
