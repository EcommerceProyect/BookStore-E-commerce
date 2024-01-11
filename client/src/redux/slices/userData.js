import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  userData: null,
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
  },
});

export const { setUserData, clearUserData, updateUserData } = userSlice.actions;
export default userSlice.reducer;
