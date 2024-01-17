import axios from 'axios';
import { deleteEditorialList } from '../slices/editorial';
import { APIDOMAIN } from '../../vars';

export const deleteEditorial = (id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('actualT');
      if (token) {
        const response = await axios.delete(
          `${APIDOMAIN}/authorized/${id}?route=editorialDelete&token=${token}`,
        );
        dispatch(deleteEditorialList(id));
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
