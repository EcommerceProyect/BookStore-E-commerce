import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  userCart: null,
  cart: [
    'e88d9dfa-0bc9-4863-99ff-05e80fdd4757',
    'e3a15bd6-00ef-48d0-a435-8babcb52d6db',
  ],
};

export const cartUsersSlice = createSlice({
  name: 'userCartTest',
  initialState,
  reducers: {
    setUserCart: (state, action) => {
      state.userCart = action.payload;
    },
    setDelete: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const { setUserCart, setDelete } = cartUsersSlice.actions;

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
