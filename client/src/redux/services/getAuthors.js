import axios from 'axios';
import {
  setAuthorListLoading,
  setAuthorList,
  setAuthorListError,
  setTotalItems,
} from '../slices/authors';
import { API_BOOKS } from '../../vars';

const apiUrl = `${API_BOOKS}/ebook/authors?`;

export const fetchAuthors = (page) => async (dispatch) => {
  dispatch(setAuthorListLoading());

  try {
    if (!page) {
      page = 0;
    }
    console.log(page);
    const { data } = await axios.get(`${apiUrl}page=${page}`);
    dispatch(setTotalItems(data.numberOfResults));
    dispatch(setAuthorList(data.data));
  } catch (error) {
    dispatch(setAuthorListError(error.message));
  }
};
