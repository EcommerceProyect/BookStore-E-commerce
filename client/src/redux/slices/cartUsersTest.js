import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { decrementCartQuantityt, incrementCartQuantity } from './products';

const initialState = {
  userCart: null,
  cart: [
    'e88d9dfa-0bc9-4863-99ff-05e80fdd4757',
    'e3a15bd6-00ef-48d0-a435-8babcb52d6db',
  ],
  cartProducts: [],
};

export const cartUsersSlice = createSlice({
  name: 'userCartTest',
  initialState,
  reducers: {
    setUserCart: (state, action) => {
      state.userCart = action.payload;
    },
    addProductToCart: (state, action) => {
      console.log("ADD PRODUCT TO CART", action.payload);
      state.cartProducts.push(action.payload);
    }
    setDelete: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const { setUserCart, addProductToCart, setDelete } = cartUsersSlice.actions;

export default cartUsersSlice.reducer;

export const createCart = (userId) => async (dispatch) => {
  try {
    const response = await axios.post(
      'http://localhost:3002/ebook/createCart',
      { userId },
    );
    dispatch(setUserCart(response.data.cart.id));
    console.log(response.data.message);
  } catch (error) {
    console.error(error);
  }
};

export const addProductToCartApi = (userId, productId, quantity) => async (dispatch) => {
  console.log("ADD TO CART API", userId);
  try{
    const response = await axios.put(
      'http://localhost:3002/ebook/addToCart',
      { userId, productId, quantity },
    );
    dispatch(addProductToCart({ userId: userId, productId: productId, quantity: quantity }));
    console.log("ADD TO CART API RESPONSE",response);
  }catch(error){
    console.error(error);
  }
}

export const incrementProductCartQuantity = (userId, productId, quantity) => async (dispatch) => {
  console.log("INCREMENT PRODUCT CART QUANTITY", userId, productId, quantity);
  try {
    const response = await axios.put(
      'http://localhost:3002/ebook/addToCart',
      { userId, productId, quantity },
    )
    dispatch(incrementCartQuantity({ id: productId }));
  } catch (error) {
    console.error(error);
  }
}

export const decrementProductCartQuantity = (userId, productId, quantity) => async (dispatch) => {
  console.log("DECREMENT PRODUCT CART QUANTITY", userId, productId, quantity);
  try {
    const response = await axios.put(
      'http://localhost:3002/ebook/addToCart',
      { userId, productId, quantity },
    )
    dispatch(decrementCartQuantityt({ id: productId }));
  } catch (error) {
    console.error(error);
  }
}




export const deleteProduct = (userId, productId) => async (dispatch) => {
  try {
    let { data } = await axios.delete(
      `http://localhost:3002/ebook/deleteProductCart/${userId}/${productId}`,
      dispatch(setDelete(data.message)),
      console.log(data.message),
    );
  } catch (error) {
    console.error(error.message);
  }
};
