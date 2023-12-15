import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    productList: [],
  },
  reducers: {
    setProductList: (state, action) => {
      state.productList = action.payload
    },
    addToProductList: (state, action) => {
      state.productList = [state.productList, action.payload]
    },
  },
})

export const { setProductList, addToProductList } = productSlice.actions

export default productSlice.reducer
