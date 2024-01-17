import axios from 'axios';
import { deleteGenreList } from '../slices/genres';
import { APIDOMAIN } from '../../vars';

export const deleteGenre = (id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('actualT');
      if (token) {
        const response = await axios.delete(
          `${APIDOMAIN}/authorized/${id}?route=genreDelete&token=${token}`,
        );
        dispatch(deleteGenreList(id));
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
