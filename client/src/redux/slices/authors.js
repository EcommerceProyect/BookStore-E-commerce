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
    updateAuthorList: (state, action) => {
      const authorIndex = state.authors.findIndex(
        (author) => author.id === action.payload.id,
      );
      if (authorIndex !== -1) {
        state.authors[authorIndex].name = action.payload.name;
      }
      const allAuthorIndex = state.allAuthors.findIndex(
        (author) => author.id === action.payload.id,
      );
      if (allAuthorIndex !== -1) {
        state.allAuthors[allAuthorIndex].name = action.payload.name;
      }
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
  updateAuthorList,
} = authorSlice.actions;

export default authorSlice.reducer;
