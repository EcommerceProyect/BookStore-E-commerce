import { configureStore } from '@reduxjs/toolkit';
import products from './slices/products';
// import user from './slices/user';
import genreReducer from './slices/genres';
import authorReducer from './slices/authors';
import editorialReducer from './slices/editorial';
import userData from './slices/userData';
import users from './slices/userList';
import cart from './slices/cartUsersTest';
import ratingStars from './slices/ratingStarsAverage';
import userReducer, {
  setUserData,
  clearUserData,
  userAdminStart,
  userAdminSuccess,
  userAdminFailure,
} from './slices/userData';
import userActiveReducer, {
  userActiveStart,
  userActiveSuccess,
  userActiveFailure,
} from './slices/userData';
import userOrdersAdmin from './slices/userOrdersAdmin';

export default configureStore({
  reducer: {
    products,
    userOrdersAdmin,
    genres: genreReducer,
    authors: authorReducer,
    editorial: editorialReducer,
    cart,
    userData,
    users,
    ratingStars,
    user: userReducer,
    userActive: userActiveReducer,
  },
});
