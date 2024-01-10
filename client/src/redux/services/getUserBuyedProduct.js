import axios from 'axios';

const getUserBuyedProduct = async (userId, id) => {
  try {
    const token = localStorage.getItem('actualT');
    if (token) {
      const response = await axios.get(
        `http://localhost:3001/authorized?page=0&route=orders&token=${token}`,
      );
      console.log('response', response);
      return response;
    } else {
      throw new Error('No se tiene el token de acceso');
    }
  } catch (error) {
    console.log(error);
  }
};

export default getUserBuyedProduct;
