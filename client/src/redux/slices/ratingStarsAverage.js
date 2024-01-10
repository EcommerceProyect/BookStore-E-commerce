import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  ratingAverage: [],
  newRating: [],
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
  },
});

export const { setRatingAverage, setNewRating } = ratingStarsSlice.actions;

export default ratingStarsSlice.reducer;
