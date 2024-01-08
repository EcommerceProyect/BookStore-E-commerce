import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  password: '',
  userId: 'auth0|659ad72ccbcd7a0e1196e5de',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
