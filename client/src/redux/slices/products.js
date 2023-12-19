import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  loading: false,
  error: null,
  orderOption: null,
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductListLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setProductList: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    setProductListError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addToProductList: (state, action) => {
      state.productList = [state.productList, action.payload];
    },
    setOrderOption: (state, action) => {
      state.orderOption = action.payload;
    },
  },
});

export const {
  setProductListLoading,
  setProductList,
  setProductListError,
  addToProductList,
  setOrderOption,
} = productSlice.actions;

export default productSlice.reducer;
