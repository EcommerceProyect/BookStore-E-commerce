import axios from 'axios';
import { updateUserData } from '../slices/userData';
import { APIDOMAIN } from '../../vars';

export const updateUser = (userData) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('actualT');
      if (token) {
        console.log(userData.id);
        console.log(userData);
        const response = await axios.put(
          `${APIDOMAIN}/authorized/?route=users&token=${token}`,
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
