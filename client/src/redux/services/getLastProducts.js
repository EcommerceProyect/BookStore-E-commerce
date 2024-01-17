import axios from 'axios';
import { setCarouselProducts, setTotalItems } from '../slices/products';
import { API_BOOKS } from '../../vars';

const apiUrl = `${API_BOOKS}/ebook/products`;
export const getLastProducts = (page, amount) => async (dispatch, getState) => {
  try {
    console.log('hola!!!!!!! estamos en la parte de carousel jejjj');
    let url = apiUrl + `?page=${page}`;
    console.log(url)

    let response = await axios.get(url);
    console.log(response.data); // data esta llegando vacía
    const lastProducts = response.data.data.slice(-amount);

    if ((lastProducts.length < amount) & (page > 0)) {
      url = apiUrl + `?page=${page - 1}`;
      response = await axios.get(url);
      lastProducts.push(
        ...response.data.data.slice(lastProducts.length - amount),
      );
    }
    dispatch(
      setTotalItems(response.data.count || response.data.numberOfResults),
    );
    dispatch(setCarouselProducts(lastProducts));
  } catch (error) {
    console.log(error);
  }
};
