import axios from 'axios';
import {
  setTotalItems,
  setProductList,
  setProductListLoading,
  setProductListError,
} from '../slices/products';



const apiUrl = 'https://bookstore-e-commerce.onrender.com/ebook/products';
// const apiUrl = 'http://localhost:3001/ebook/products';
export const getProducts =
  (page, sortField, sortAction) => async (dispatch, getState) => {
    dispatch(setProductListLoading());
    try {
      const state = getState();
      const { selectedGenre } = state.genres;
      const { selectedAuthor } = state.authors;
      const { selectedEditorial } = state.editorial;
      const { booksByTitle } = state.products;
      let url = apiUrl;

      const queryParams = [];

      if (selectedGenre && selectedGenre.length > 0) {
        const genreParams = selectedGenre
          .map((genre) => `genre=${encodeURIComponent(genre)}`)
          .join('&');
        queryParams.push(genreParams);
      }

      if (selectedAuthor && selectedAuthor.length > 0) {
        const authorParams = selectedAuthor
          .map((author) => `author=${encodeURIComponent(author)}`)
          .join('&');
        queryParams.push(authorParams);
      }

      if (selectedEditorial && selectedEditorial.length > 0) {
        const editorialParams = selectedEditorial
          .map((editorial) => `editorial=${encodeURIComponent(editorial)}`)
          .join('&');
        queryParams.push(editorialParams);
      }

      if (booksByTitle && booksByTitle.length > 0) {
        const titleParams = `title=${encodeURIComponent(booksByTitle)}&`
        queryParams.push(titleParams);
      }

      if (sortField && sortAction) {
        queryParams.push(`sortField=${sortField}`);
        queryParams.push(`sortAction=${sortAction}`);
      }

      if (queryParams.length > 0) {
        url += `/filterPrueba?${queryParams.join('&')}&page=${page}`;
      } else {
        url += `?page=${page}`;
      }

      const response = await axios.get(url);
      dispatch(
        setTotalItems(response.data.count || response.data.numberOfResults),
      );
      dispatch(
        setProductList(response.data.detailedResults || response.data.data),
      );
     
    } catch (error) {
      dispatch(setProductListError(error.message));
    }
  };
