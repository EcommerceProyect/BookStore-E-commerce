import axios from 'axios';
import { setAuthorListLoading, setAuthorList, setAuthorListError } from '../slices/authors';
import {
  API_BOOKS
} from '../../vars';

const apiUrl = `${API_BOOKS}/ebook/authors`;

export const fetchAuthors = () => async (dispatch) => {
  dispatch(setAuthorListLoading()); 
  
  try {
    const {data} = await axios.get(apiUrl);
    const authors = data.map((author) => author.name);
    dispatch(setAuthorList(authors)); 
    
  } catch (error) {
    dispatch(setAuthorListError(error.message));  
  }
};