import axios from 'axios';
import { setFoundedBooks } from '../slices/products';


export const getProductsForSearch = (searchTerm)=> async (dispatch, getState) =>{
    try {
       const url = `http://localhost:80/ebook/products/search?searchTerm=${searchTerm}`; 
        const response = await axios.get(url);

        dispatch(setFoundedBooks(response.data.data))
    } catch (error) {
       console.log(error.message);
    }
}