import axios from 'axios';
import {
  setGenreListLoading,
  setGenreList,
  setGenreListError,
  setTotalItems,
} from '../slices/genres';
import { API_BOOKS } from '../../vars';

const apiUrl = `${API_BOOKS}/ebook/genres?`;

export const fetchGenres = (page) => async (dispatch) => {
  dispatch(setGenreListLoading());

  try {
    if (!page) {
      page = 0;
    }
    const { data } = await axios.get(`${apiUrl}page=${page}`);
    dispatch(setTotalItems(data.numberOfResults));
    dispatch(setGenreList(data.data));
  } catch (error) {
    dispatch(setGenreListError(error.message));
  }
};
