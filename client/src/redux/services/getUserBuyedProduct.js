import axios from 'axios';
//import { setUserBuyedProduct } from '../slices/ratingStarsAverage';

const getUserBuyedProduct = async (userId, id) => {
  try {
    const token = localStorage.getItem('actualT');
    if (token) {
      const response = await axios.get(
        `http://localhost:3002/ebook/userBuyedProduct?userId=${userId}&productId=${id}`
);
      console.log('response', response.data);
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

//obtener orderId para el post

// export const getOrderId = async () =>{
//   try {
//     const response = await axios.get('http://localhost:3002/ebook/orders?page=0');
//     return response;
//   } catch (error) {
//     console.log(error)
//   }
// }
