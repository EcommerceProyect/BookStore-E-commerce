import axios from 'axios';
import { updateGenreList } from '../slices/genres';
import { APIDOMAIN } from '../../vars';

export const updateGenre = (name, id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('actualT');
      if (token) {
        const response = await axios.put(
          `${APIDOMAIN}/authorized/${id}?route=genre&token=${token}`,
          name,
        );
        dispatch(updateGenreList(name, id));
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
