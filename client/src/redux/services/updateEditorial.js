import axios from 'axios';
import { updateEditorialList } from '../slices/editorial';
import { APIDOMAIN } from '../../vars';

export const updateEditorial = (name, id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('actualT');
      if (token) {
        const response = await axios.put(
          `${APIDOMAIN}/authorized/${id}?route=editorial&token=${token}`,
          name,
        );
        dispatch(updateEditorialList(name, id));
        return response;
      } else {
        throw new Error('No se tiene el token de acceso');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
};
