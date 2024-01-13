import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: null,
  orders: {},
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
    setOrders(state, action) {
      state.orders = action.payload;
    },
  },
});

export const { setUserData, clearUserData, updateUserData, setOrders } =
  userSlice.actions;
export default userSlice.reducer;
