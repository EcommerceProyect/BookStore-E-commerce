import axios from 'axios';
import { setAuthorListLoading, setAuthorList, setAuthorListError } from '../slices/authors';
import {
  API_BOOKS
} from '../../vars';

const apiUrl = `${API_BOOKS}/ebook/authors?page=0`;

export const fetchAuthors = () => async (dispatch) => {
  dispatch(setAuthorListLoading()); 
  
  try {
    const response = await axios.get(apiUrl);
    const authors = response.data.map((author) => author.name);
    dispatch(setAuthorList(authors)); 
    
  } catch (error) {
    dispatch(setAuthorListError(error.message));  
  }
};