import axios from 'axios';
import { setUserData } from '../slices/userData';
import { jwtDecode } from "jwt-decode";

export const fetchUserData = (token) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3001/authorized?route=profile&token=${token}`);
    
    const userData = { ...response.data }; 
    const decodedToken = jwtDecode(userData.token);

    if (decodedToken.scope === "user:edit admin:edit") {
      userData.response.role = "admin";
    } else {
      userData.response.role = "user"; 
    }

    dispatch(setUserData(userData)); 
    console.log("Data del usuario desde la petición con role agregado: ", userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};