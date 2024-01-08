import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  decrementCartQuantityt,
  incrementCartQuantity,
  removeFromCart,
} from './products';

const initialState = {
  userCart: null,
  cartProducts: [],
};

import {
  API_BOOKS
} from '../../vars';

export const cartUsersSlice = createSlice({
  name: 'userCartTest',
  initialState,
  reducers: {
    setUserCart: (state, action) => {
      state.userCart = action.payload;
    },
    addProductToCart: (state, action) => {
      console.log('ADD PRODUCT TO CART', action.payload);
      state.cartProducts.push(action.payload);
    },
    setDelete: (state, action) => {
      state.cartProducts = state.cartProducts.filter(
        (product) => product.productId !== action.payload,
      );
    },
  },
});

export const { setUserCart, addProductToCart, setDelete } =
  cartUsersSlice.actions;

export default cartUsersSlice.reducer;

export const createCart = (userId) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${API_BOOKS}/ebook/createCart`,
      { userId },
    );
    dispatch(setUserCart(response.data.cart.id));
    console.log(response.data.message);
  } catch (error) {
    console.error(error);
  }
};

export const addProductToCartApi =
  (userId, productId, quantity) => async (dispatch) => {
    console.log('ADD TO CART API', userId);
    try {
      const response = await axios.put(
        `${API_BOOKS}/ebook/addToCart`,
        { userId, productId, quantity },
      );
      dispatch(
        addProductToCart({
          userId: userId,
          productId: productId,
          quantity: quantity,
        }),
      );
      console.log('ADD TO CART API RESPONSE', response);
    } catch (error) {
      console.error(error);
    }
  };

export const incrementProductCartQuantity =
  (userId, productId, quantity) => async (dispatch) => {
    console.log('INCREMENT PRODUCT CART QUANTITY', userId, productId, quantity);
    try {
      const response = await axios.put(
        `${API_BOOKS}/ebook/addToCart`,
        { userId, productId, quantity },
      );
      dispatch(incrementCartQuantity({ id: productId }));
    } catch (error) {
      console.error(error);
    }
  };

export const decrementProductCartQuantity =
  (userId, productId, quantity) => async (dispatch) => {
    console.log('DECREMENT PRODUCT CART QUANTITY', userId, productId, quantity);
    try {
      const response = await axios.put(
        `${API_BOOKS}/ebook/addToCart`,
        { userId, productId, quantity },
      );
      dispatch(decrementCartQuantityt({ id: productId }));
    } catch (error) {
      console.error(error);
    }
  };

export const deleteProduct = (userId, productId) => async (dispatch) => {
  try {
    let response = await axios.delete(
      `${API_BOOKS}/ebook/deleteProductCart/${userId}/${productId}`,
    );
    dispatch(removeFromCart({ id: productId }));
    dispatch(setDelete(productId));
    console.log(response.data.message);
  } catch (error) {
    console.error(error.message);
  }
};
