import axios from 'axios';
export const getOrderId = async () =>{
      try {
        const response = await axios.get('http://localhost:3002/ebook/orders?page=0');
        return response;
      } catch (error) {
        console.log(error)
      }
    }