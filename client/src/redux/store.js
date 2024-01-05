import { configureStore } from '@reduxjs/toolkit';
import products from './slices/products';
import user from './slices/user';
import genreReducer from './slices/genres';
import authorReducer from './slices/authors';
import editorialReducer from './slices/editorial';

export default configureStore({
  reducer: {
    products,
    user,
    genres: genreReducer,
    authors: authorReducer,
    editorial: editorialReducer,
  },
});
