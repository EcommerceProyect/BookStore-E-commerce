import { createSlice } from '@reduxjs/toolkit';
import { get } from 'lodash';

const initialState = {
  userData: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action) {
      console.log('payload userSlice', action.payload);
      if(action.payload !== null) {
        const infoCarrito = JSON.parse(localStorage.getItem('cart'));
        //  const dataAddCart = infoCarrito.map
        
      }
      state.userData = action.payload;
    },
    clearUserData(state) {
      state.userData = null;
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
