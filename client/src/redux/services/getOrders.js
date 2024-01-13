import axios from 'axios';
import { APIDOMAIN } from '../../vars';

const getOrders = (userId) => async (dispatch) => {
  const token = localStorage.getItem('actualT');
  try {
    const response = await axios.get(
      `${APIDOMAIN}/authorized?page=0&route=orders&token=${token}`,
    );
  } catch (error) {}
};

export default getOrders;
