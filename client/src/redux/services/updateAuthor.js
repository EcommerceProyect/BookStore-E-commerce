import axios from 'axios';
import { updateAuthorList } from '../slices/authors';
import { APIDOMAIN } from '../../vars';

export const updateAuthor = (name, id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('actualT');
      if (token) {
        const response = await axios.put(
          `${APIDOMAIN}/authorized/${id}?route=author&token=${token}`,
          name,
        );
        dispatch(updateAuthorList(name, id));
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
