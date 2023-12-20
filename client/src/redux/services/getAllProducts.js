import axios from 'axios';
import {
  setProductList,
  setProductListLoading,
  setProductListError,
} from '../slices/products';

const apiUrl = 'https://bookstore-e-commerce.onrender.com/ebook/products';

export const getTotalProducts = async (selectedGenre = '') => {
  try {
    const url = selectedGenre
      ? `${apiUrl}/filter?genre=${selectedGenre}`
      : apiUrl;

    const response = await axios.get(url);
    const totalProducts = response.data.length;
    console.log('Productos totales: ' + totalProducts);
    return totalProducts;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProducts = (page, selectedGenres = [Aventura, Acción]) => async (dispatch) => {
  dispatch(setProductListLoading());
  try {
    let url = `${apiUrl}`;
    
    if (selectedGenres.length > 0) {
      url += `/filter?genre=${selectedGenres.join('&&genre=')}`;
    }

    if (page >= 0) {
      url += `${selectedGenres.length > 0 ? '&&' : '?'}page=${page}`;
    }
    
    console.log(selectedGenres);
    console.log('Constructed URL:', url);

    const response = await axios.get(url);
    dispatch(setProductList(response.data));
  } catch (error) {
    dispatch(setProductListError(error.message));
  }
};