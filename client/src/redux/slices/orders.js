import { createSlice } from '@reduxjs/toolkit';

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    loading: false,
    error: null,
    totalSales: 0,
  },
  reducers: {
    getOrdersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getOrderesSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
      state.totalSales = action.totalSales;
    },
    getOrdersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getOrdersStart, getOrderesSuccess, getOrdersFailure } = ordersSlice.actions;

export default ordersSlice.reducer;
