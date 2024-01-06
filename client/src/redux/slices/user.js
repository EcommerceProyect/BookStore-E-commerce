import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  password: '',
  userId: 'e42c0d41-79d6-4bcb-b06a-e73a9bd0f774'
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
