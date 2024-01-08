import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  password: '',
  userId: '21b3d92d-6e13-4ca1-acab-501601b99cf6',
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
