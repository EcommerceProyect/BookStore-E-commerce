import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  userCart: null,
};

export const cartUsersSlice = createSlice({
  name: 'userCartTest',
  initialState,
  reducers: {
    setUserCart: (state, action) => {
      state.userCart = action.payload;
    },
  },
});

export const { setUserCart } = cartUsersSlice.actions;

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
