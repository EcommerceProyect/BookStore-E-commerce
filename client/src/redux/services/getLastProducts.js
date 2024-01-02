import axios from 'axios';
import { setCarouselProducts, setTotalItems} from '../slices/products';

const apiUrl = 'https://bookstore-e-commerce.onrender.com/ebook/products';
export const getLastProducts = (page, amount) => async (dispatch, getState) => {
    try {
      let url = apiUrl + `?page=${page}`;

      let response = await axios.get(url);
      const lastProducts = response.data.data.slice(-amount)

      if(lastProducts.length < amount & page > 0){
        url= apiUrl + `?page=${page-1}`
        response = await axios.get(url);
        lastProducts.push(...response.data.data.slice(lastProducts.length - amount))
      }
      dispatch(setTotalItems(response.data.count || response.data.numberOfResults))
      dispatch(setCarouselProducts(lastProducts))
    } catch (error) {
      console.log(error)
    }
};
      
     