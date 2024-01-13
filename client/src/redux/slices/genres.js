import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  genres: [],
  loading: false,
  error: null,
  selectedGenre: null,
  allGenres: [],
  currentPage: 0,
  totalItems: null,
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
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalItems: (state, action) => {
      state.totalItems = action.payload;
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
  setCurrentPage,
  setTotalItems,
} = genreSlice.actions;

export default genreSlice.reducer;
