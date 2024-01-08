import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { APIDOMAIN } from '../../vars';

const initialState = {
  user: {}
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const getUserId = () => async (dispatch) =>  {
  const userToken = localStorage.getItem("actualT");
  console.log(userToken);
  if(userToken){
    try {
      const response =  await axios.get(`${APIDOMAIN}/authorized?route=profile&token=${userToken}`);
      const result = response.data.response;
      console.log("userInfo",result);
      dispatch(setUser(result));
    } catch (error) {
      console.error(error);
    }
  }
}

export default userSlice.reducer;
