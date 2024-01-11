import axios from 'axios';
import { modifyProductList } from '../slices/products';
import {
  APIDOMAIN
} from '../../vars';
export const putProduct = (formattedData, id) => {
  return async (dispatch) => {
    try {
      const token =localStorage.getItem("actualT");
      console.log("formatted data en peticion put",formattedData);
      if(token){
      const response = await axios.put(
        `${APIDOMAIN}/authorized/${id}?route=products&token=${token}`,
        formattedData,
      );

      dispatch(modifyProductList(formattedData, id));
      return response;
    } else{
      throw new Error("No se tiene el token de acceso")
    }

  } catch (error) {
    console.error(error)
    throw error
  }
}
}
