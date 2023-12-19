import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  loading: false,
  error: null,
  detailProduct: null,
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
  setProductDetailLoading,
  setProductDetail,
  setProductDetailError,
  setOrderOption,
} = productSlice.actions;

export default productSlice.reducer;
