import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authors: [],
  loading: false,
  error: null,
  selectedAuthor: null,
  allAuthors: [],
};

export const authorSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    setAuthorListLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setAuthorList: (state, action) => {
      state.loading = false;
      state.authors = action.payload;
      state.allAuthors = action.payload;
    },
    setAuthorListError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSelectedAuthor: (state, action) => {
      state.selectedAuthor = action.payload;
    },
  },
});

export const {
  setAuthorListLoading,
  setAuthorList,
  setAuthorListError,
  setSelectedAuthor,
} = authorSlice.actions;

export default authorSlice.reducer;
