import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
  },
  reducers: {
    setProductList: (state, action) => {
      state.list = action.payload
    },
  },
})

export const { setProductList } = productSlice.actions

export default productSlice.reducer
