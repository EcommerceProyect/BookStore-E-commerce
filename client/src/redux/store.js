import { configureStore } from '@reduxjs/toolkit'
import products from './slices/products'
import user from './slices/user'

export default configureStore({
  reducer: {
    products,
    user,
  },
})
