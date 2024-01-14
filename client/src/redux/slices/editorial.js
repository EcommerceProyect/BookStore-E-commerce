import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  editorial: [],
  loading: false,
  error: null,
  selectedEditorial: null,
  allEditorial: [],
  currentPage: 0,
  totalItems: null,
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
    updateEditorialList: (state, action) => {
      const editorialIndex = state.editorial.findIndex(
        (editorial) => editorial.id === action.payload.id,
      );
      if (editorialIndex !== -1) {
        state.editorial[editorialIndex].name = action.payload.name;
      }
      const allEditorialIndex = state.allEditorial.findIndex(
        (editorial) => editorial.id === action.payload.id,
      );
      if (allEditorialIndex !== -1) {
        state.allEditorial[allEditorialIndex].name = action.payload.name;
      }
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalItems: (state, action) => {
      state.totalItems = action.payload;
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
  updateEditorialList,
  setCurrentPage,
  setTotalItems,
} = editorialSlice.actions;

export default editorialSlice.reducer;
