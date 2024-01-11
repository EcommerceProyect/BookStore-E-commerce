import axios from 'axios';
import { getUsersSuccess, getUsersFailure } from '../slices/userList';

export const getUsers = (page) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("actualT");
      if (token) {
        const response = await axios.get(
          `http://localhost:3001/authorized?route=users&page=0&token=${token}`
        );

        const users = response.data;

        console.log("Datos de usuarios recibidos:", users);

        dispatch(getUsersSuccess(users));
        return response;
      } else {
        throw new Error("No se tiene el token de acceso");
      }
    } catch (error) {
      console.error(error);
      dispatch(getUsersFailure(error.message)); 
      throw error;
    }
  };
};