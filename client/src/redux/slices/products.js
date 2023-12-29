import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  loading: false,
  error: null,
  detailProduct: null,
  totalItems: null,
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
    setTotalItems: (state, action) => {
      state.totalItems = action.payload;
    },
    addToProductList: (state, action) => {
      state.productList = [state.productList, action.payload];
    },
    setProductDetailLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setProductDetail: (state, action) => {
      state.loading = false;
      state.detailProduct = action.payload;
    },
    setProductDetailError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setProductListLoading,
  setProductList,
  setProductListError,
  setTotalItems,
  addToProductList,
  setProductDetailLoading,
  setProductDetail,
  setProductDetailError,
} = productSlice.actions;

export default productSlice.reducer;
