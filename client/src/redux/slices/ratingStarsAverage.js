import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  ratingAverage: [],
  newRating: [],
  userBuyedProduct: false,
};

export const ratingStarsSlice = createSlice({
  name: 'ratingStars',
  initialState,
  reducers: {
    setRatingAverage: (state, action) => {
      state.ratingAverage = action.payload;
    },
    setNewRating: (state, action) => {
      state.newRating = action.payload;
    },
    setUserBuyedProduct: (state, action) => {
      state.userBuyedProduct = action.payload;
    },
  },
});

export const { setRatingAverage, setNewRating, setUserBuyedProduct } = ratingStarsSlice.actions;

export default ratingStarsSlice.reducer;

export const getUserBuyedProduct = async (userId, id) => {
  try {
    const token = localStorage.getItem('actualT');
    if (token) {
      const response = await axios.get(
        `http://localhost:3002/ebook/userBuyedProduct?userId=${userId}&productId=${id}`,
      );
      console.log('response', response.data);
      return response.data;
    } else {
      throw new Error('No se tiene el token de acceso');
    }
  } catch (error) {
    console.log(error);
  }
};

export const isPurchased = (userId, id) => {
  return async (dispatch) => {
    try {
      const { success } = await getUserBuyedProduct(userId, id);
      dispatch(setUserBuyedProduct({ success }));
    } catch (error) {
      console.log(error.message);
    }
  };
};