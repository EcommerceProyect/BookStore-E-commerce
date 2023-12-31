import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  editorial: [],
  loading: false,
  error: null,
  selectedEditorial: null,
  allEditorial: [],
};

export const editorialSlice = createSlice({
  name: 'editorial',
  initialState,
  reducers: {
    setEditorialListLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setEditorialList: (state, action) => {
      state.loading = false;
      state.editorial = action.payload;
      state.allEditorial = action.payload;
    },
    setEditorialListError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSelectedEditorial: (state, action) => {
      state.selectedEditorial = action.payload;
    },
  },
});

export const {
  setEditorialListLoading,
  setEditorialList,
  setEditorialListError,
  setSelectedEditorial,
} = editorialSlice.actions;

export default editorialSlice.reducer;
