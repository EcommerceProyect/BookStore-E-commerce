import axios from 'axios';
import { API_BOOKS } from '../../vars';
export const getOrderId = async () =>{
      try {
        const response = await axios.get(`${API_BOOKS}/ebook/orders?page=0`);
        return response;
      } catch (error) {
        console.log(error)
      }
    }