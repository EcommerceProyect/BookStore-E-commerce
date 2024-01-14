// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: null,
  users: [],
  loading: false,
  error: null,
  userActiveLoading: false,
  userActiveSuccess: false,
  userActiveError: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action) {
      state.userData = action.payload;
    },
    updateUserData(state, action) {
      state.userData.phone = action.payload.phone;
      state.userData.name = action.payload.name;
      state.userData.last_name = action.payload.last_name;
    },
    clearUserData(state) {
      state.userData = null;
    },
    userAdminStart(state) {
      state.loading = true;
      state.error = null;
    },
    userAdminSuccess(state, action) {
      state.loading = false;
      state.users = action.payload;
    },
    userAdminFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    userActiveStart(state) {
      state.userActiveLoading = true;
      state.userActiveSuccess = false;
      state.userActiveError = null;
    },
    userActiveSuccess(state) {
      state.userActiveLoading = false;
      state.userActiveSuccess = true;
      state.userActiveError = null;
    },
    userActiveFailure(state, action) {
      state.userActiveLoading = false;
      state.userActiveSuccess = false;
      state.userActiveError = action.payload;
    },
  },
});

export const {
  setUserData,
  clearUserData, updateUserData,
  userAdminStart,
  userAdminSuccess,
  userAdminFailure,
  userActiveStart,
  userActiveSuccess,
  userActiveFailure,
} = userSlice.actions;

export default userSlice.reducer;
