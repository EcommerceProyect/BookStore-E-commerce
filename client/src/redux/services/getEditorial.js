import axios from 'axios';
import { setEditorialListLoading, setEditorialList, setEditorialListError } from '../slices/editorial';
import {
  API_BOOKS
} from '../../vars';

const apiUrl = `${API_BOOKS}/ebook/editorials?page=0`;

export const fetchEditorial = () => async (dispatch) => {
  dispatch(setEditorialListLoading()); 
  
  try {
    const response = await axios.get(apiUrl);
    const editorial = response.data.map((editorial) => editorial.name);
    dispatch(setEditorialList(editorial)); 
    
  } catch (error) {
    dispatch(setEditorialListError(error.message));  
  }
};
