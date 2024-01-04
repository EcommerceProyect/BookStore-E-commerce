import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  email: '',
  password: '',
  access: false,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin: async (state, action) => {
      state.access = true;
    },
  },
});

export const { setLogin } = loginSlice.actions;

export const loginUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post('', {
      email: userData.email,
      password: userData.password,
    });
    dispatch(setLogin(response.data));
  } catch (error) {
    console.error('Error en el login:', error.message);
  }
};

export default loginSlice.reducer;
