import axios from 'axios';
import { API_BOOKS } from '../../vars';
import { getCartFromLocalStorage, setCart } from '../slices/products';
import { addProductToCartApi } from '../slices/cartUsersTest';

export const getCartFromApi = (userId) => async (dispatch) => {
  const token = localStorage.getItem('actualT');
  const cartFromLocalStorage = getCartFromLocalStorage();
  if (token !== null) {
    try {
      //consultar al backend para traer el carrito,

      if (cartFromLocalStorage.length > 0) {
        cartFromLocalStorage.forEach((product) => {
          dispatch(
            addProductToCartApi(userId || '', product.id, product.quantity),
          );
        });
      }
      const response = await axios.get(
        `${API_BOOKS}/ebook/getProductsActiveCart/${userId}`,
      );
      const cartFromBackend = response.data;
      dispatch(setCart(cartFromBackend));
    } catch (error) {
      console.error(error);
    }
  }
};
