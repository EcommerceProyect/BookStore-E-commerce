import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'sonner';


const initialState = {
  list: [],
  loading: false,
  error: null,
  detailProduct: null,
  orderOption: [],
  cart: [],
  cartCount: 0,
  totalItems: null,
  carouselProducts: [],
  booksByTitle: [],
  currentPage: 0,
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCarouselProducts: (state, action) => {
      state.carouselProducts = action.payload;
    },
    setProductListLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setProductList: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setProductListError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setTotalItems: (state, action) => {
      state.totalItems = action.payload;
    },
    addToProductList: (state, action) => {
      state.productList = [state.productList, action.payload];
    },
    modifyProductList: (state, action) => {
      const { id, updatedProduct } = action.payload;
      const index = state.list.findIndex(product => product.id === id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...updatedProduct };
        toast.success('Producto actualizado exitosamente');
      } else {
        toast.error('El producto no pudo ser encontrado en la lista');
      }
    },
    setProductDetailLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setProductDetail: (state, action) => {
      state.loading = false;
      state.detailProduct = action.payload;
    },
    setProductDetailError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setOrderOption: (state, action) => {
      state.orderOption = action.payload;
    },
    setBooksByTitle: (state, action) => {
      state.booksByTitle = action.payload;
    },
    addToCart: (state, action) => {
      const existingProduct = state.cart.find(
        (product) => product.id === action.payload.id,
      );
      const productWithQuantity = { ...action.payload, quantity: 1 };

      if (!existingProduct) {
        toast.success('Agregado al carrito exitosamente');
        state.cart.push(productWithQuantity);
        state.cartCount += 1;
      } else {
        toast.warning('El producto ya se encuentra en el carrito');
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (product) => product.id !== action.payload.id,
      );

      state.cartCount -= 1;
    },
    incrementCartQuantity: (state, action) => {
      const existingProduct = state.cart.find(
        (product) => product.id === action.payload.id,
      );

      if (existingProduct) existingProduct.quantity += 1;
    },
    decrementCartQuantityt: (state, action) => {
      const existingProduct = state.cart.find(
        (product) => product.id === action.payload.id,
      );

      if (existingProduct) existingProduct.quantity -= 1;
    },
  },
});

export const {
  setCarouselProducts,
  setProductListLoading,
  setProductList,
  setProductListError,
  setTotalItems,
  addToProductList,
  setProductDetailLoading,
  setProductDetail,
  setProductDetailError,
  setOrderOption,
  setBooksByTitle,
  addToCart,
  removeFromCart,
  incrementCartQuantity,
  decrementCartQuantityt,
  setCurrentPage,
  modifyProductList
} = productSlice.actions;

export default productSlice.reducer;
