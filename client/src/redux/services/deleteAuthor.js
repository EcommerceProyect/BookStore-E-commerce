import axios from 'axios';
import { deleteAuthorList } from '../slices/authors';
import { APIDOMAIN } from '../../vars';

export const deleteAuthor = (id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('actualT');
      if (token) {
        const response = await axios.delete(
          `${APIDOMAIN}/authorized/${id}?route=authorDelete&token=${token}`,
        );
        dispatch(deleteAuthorList(id));
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
