import axios from 'axios';
import { setCarouselProducts, setTotalItems} from '../slices/products';

const apiUrl = 'https://bookstore-e-commerce.onrender.com/ebook/products';
export const getLastProducts = (page, amount) => async (dispatch, getState) => {
    try {
      let url = apiUrl + `?page=${page}`;

      console.log(url)

      let response = await axios.get(url);
      const lastProducts = response.data.data.slice(-amount)

      if(lastProducts.length <= 1){
        url= apiUrl + `?page=${page-1}`
        response = await axios.get(url);
        console.log('responseCarrusel',response)
        lastProducts.push(...response.data.data.slice(-4))
      }
      dispatch(setTotalItems(response.data.count || response.data.numberOfResults))
      dispatch(setCarouselProducts(lastProducts))
    } catch (error) {
      console.log(error)
    }
};
      
     