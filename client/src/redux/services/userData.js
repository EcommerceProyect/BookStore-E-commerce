import axios from 'axios';
import { setUserData } from '../slices/userData';
import { jwtDecode } from 'jwt-decode';
import { APIDOMAIN } from '../../vars';
import { getCartFromApi } from './getCart';
import getOrders from './getOrders';

export const fetchUserData = (token) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${APIDOMAIN}/authorized?route=profile&token=${token}`,
    );

    const userData = { ...response.data };
    const decodedToken = jwtDecode(userData.token);

    const hasAdminEdit = decodedToken.permissions.includes('admin:edit');

    if (hasAdminEdit) {
      userData.response.role = 'admin';
    } else {
      userData.response.role = 'user';
    }

    dispatch(setUserData(userData));
    dispatch(getCartFromApi(userData.response.id));
    dispatch(getOrders(userData.id));

  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};
