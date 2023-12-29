import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  password: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email
      state.password = action.payload.password
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
