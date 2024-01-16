import axios from 'axios';
import { setUserBuyedProduct } from '../slices/ratingStarsAverage';
import { API_BOOKS } from '../../vars';

const getUserBuyedProduct = async (userId, id) => {
  try {
    const token = localStorage.getItem('actualT');
    if (token) {
      const response = await axios.get(
        `${API_BOOKS}/ebook/userBuyedProduct?userId=${userId}&productId=${id}`,
      );
      // console.log('response', response.data);
      return response.data;
    } else {
      throw new Error('No se tiene el token de acceso');
    }
  } catch (error) {
    console.log(error);
  }
};

// const isPurchased = (userId, id) => {
//   return async (dispatch) => {
//     try {
//       const { success } = await getUserBuyedProduct(userId, id);
//       dispatch(setUserBuyedProduct({ success }));
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
// };

export default getUserBuyedProduct;
