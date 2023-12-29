import axios from 'axios';
import { setGenreListLoading, setGenreList, setGenreListError } from '../slices/genres';

const apiUrl = 'https://bookstore-e-commerce.onrender.com/ebook/genres?page=0';

export const fetchGenres = () => async (dispatch) => {
  dispatch(setGenreListLoading()); 
  
  try {
    const response = await axios.get(apiUrl);
    const genres = response.data.map((genre) => genre.name);
    dispatch(setGenreList(genres)); 
    console.log("Géneros obtenidos de la API:", response.data);
  } catch (error) {
    dispatch(setGenreListError(error.message));  
  }
};
