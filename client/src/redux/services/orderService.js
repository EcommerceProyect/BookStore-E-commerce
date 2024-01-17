// ordersService.js

import axios from 'axios';
import { getOrdersStart, getOrderesSuccess, getOrdersFailure } from '../slices/orders'
import { API_BOOKS } from '../../vars';

export const fetchOrders = async (dispatch) => {
    try {
      dispatch(getOrdersStart());
  
      const response = await axios.get(`${API_BOOKS}/ebook/orders?page=0`);
  
      dispatch(getOrderesSuccess(response.data));
    
      return response.data;
    } catch (error) {

      dispatch(getOrdersFailure(error));
  
      throw error;
    }
  };