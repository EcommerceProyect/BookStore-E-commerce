import axios from 'axios';
import {
  setEditorialListLoading,
  setEditorialList,
  setEditorialListError,
  setTotalItems,
} from '../slices/editorial';
import { API_BOOKS } from '../../vars';

const apiUrl = `${API_BOOKS}/ebook/editorials?`;

export const fetchEditorial = (page) => async (dispatch) => {
  dispatch(setEditorialListLoading());

  try {
    if (!page) {
      page = 0;
    }
    const { data } = await axios.get(`${apiUrl}page=${page}`);
    dispatch(setTotalItems(data.numberOfResults));
    dispatch(setEditorialList(data.data));
  } catch (error) {
    dispatch(setEditorialListError(error.message));
  }
};
