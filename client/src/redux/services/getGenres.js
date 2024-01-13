import axios from 'axios';
import { setGenreListLoading, setGenreList, setGenreListError } from '../slices/genres';
import {
  API_BOOKS
} from '../../vars';

const apiUrl = `${API_BOOKS}/ebook/genres?page=0`;

export const fetchGenres = () => async (dispatch) => {
  dispatch(setGenreListLoading()); 
  
  try {
    const {data} = await axios.get(apiUrl);
    const genres = data.data.map((genre) => genre.name);
    dispatch(setGenreList(genres)); 
    
  } catch (error) {
    dispatch(setGenreListError(error.message));  
  }
};
