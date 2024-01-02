import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  genres: [],
  loading: false,
  error: null,
  selectedGenre: null,
  allGenres: [],
};

export const genreSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {
    setGenreListLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setGenreList: (state, action) => {
      state.loading = false;
      state.genres = action.payload;
      state.allGenres = action.payload;
    },
    setGenreListError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSelectedGenre: (state, action) => {
      state.selectedGenre = action.payload;
    },
  },
});

export const {
  setGenreListLoading,
  setGenreList,
  setGenreListError,
  setSelectedGenre,
} = genreSlice.actions;

export default genreSlice.reducer;
