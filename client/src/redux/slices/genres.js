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
    updateGenreList: (state, action) => {
      const genreIndex = state.genres.findIndex(
        (genre) => genre.id === action.payload.id,
      );
      if (genreIndex !== -1) {
        state.genres[genreIndex].name = action.payload.name;
      }

      const allGenreIndex = state.allGenres.findIndex(
        (genre) => genre.id === action.payload.id,
      );
      if (allGenreIndex !== -1) {
        state.allGenres[allGenreIndex].name = action.payload.name;
      }
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
  updateGenreList,
} = genreSlice.actions;

export default genreSlice.reducer;
