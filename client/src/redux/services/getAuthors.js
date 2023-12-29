import axios from 'axios';
import { setAuthorListLoading, setAuthorList, setAuthorListError } from '../slices/authors';

const apiUrl = 'https://bookstore-e-commerce.onrender.com/ebook/authors?page=0';

export const fetchAuthors = () => async (dispatch) => {
  dispatch(setAuthorListLoading()); 
  
  try {
    const response = await axios.get(apiUrl);
    const authors = response.data.map((author) => author.name);
    dispatch(setAuthorList(authors)); 
    console.log("Authors obtenidos de la API:", response.data);
  } catch (error) {
    dispatch(setAuthorListError(error.message));  
  }
};