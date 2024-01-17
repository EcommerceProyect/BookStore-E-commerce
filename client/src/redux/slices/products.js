import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'sonner';



export const getCartFromLocalStorage = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};
const initialState = {
  list: [],
  loading: false,
  error: null,
  detailProduct: null,
  orderOption: [],
  cart: getCartFromLocalStorage(),
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
      state.error = null;
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
      state.loading = false;
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

      console.log(action.payload.ISBN.stock);
      console.log(productWithQuantity)


      if (!existingProduct) {
        if (action.payload.ISBN.stock > productWithQuantity.quantity || action.payload.ISBN.stock === productWithQuantity.quantity) {
          toast.success('Agregado al carrito exitosamente');
          state.cart.push(productWithQuantity);
          state.cartCount += 1;
          localStorage.setItem('cart', JSON.stringify(state.cart));
        } else {
          toast.error('No hay suficiente stock para agregar el producto')
        }
      } else {
        if (action.payload.ISBN.stock > productWithQuantity.quantity || action.payload.ISBN.stock === productWithQuantity.quantity) {
          toast.success('Agregado al carrito exitosamente');
          existingProduct.quantity += 1;
          localStorage.setItem('cart', JSON.stringify(state.cart));
        } else {
          toast.error('No hay suficiente stock para agregar el producto')
        }
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (product) => product.id !== action.payload.id,
      );

      state.cartCount -= 1;
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    incrementCartQuantity: (state, action) => {
      const existingProductIndex = state.cart.findIndex(
        (product) => product.id === action.payload.id,
      );

      if (existingProductIndex !== -1) {
        state.cart[existingProductIndex].quantity += 1;
        const cart = localStorage.getItem('cart');
        const cartJson = JSON.parse(cart);
        cartJson[existingProductIndex].quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cartJson));
      }
    },
    decrementCartQuantityt: (state, action) => {
      const existingProductIndex = state.cart.findIndex(
        (product) => product.id === action.payload.id,
      );

      if (existingProductIndex !== -1) {
        state.cart[existingProductIndex].quantity -= 1;
        const cart = localStorage.getItem('cart');
        const cartJson = JSON.parse(cart);
        cartJson[existingProductIndex].quantity -= 1;
        localStorage.setItem('cart', JSON.stringify(cartJson));
      }
    },
    setCart: (state, action) => {
      state.cart = action.payload;
      state.cartCount = action.payload.length;
    },
    deleteProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteProductSuccess: (state, action) => {
      state.loading = false;
    },
    deleteProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    activeProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    activeProductSuccess: (state, action) => {
      state.loading = false;
    },
    activeProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  activeProductStart,
  activeProductSuccess,
  activeProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
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
  setCart,
  modifyProductList
} = productSlice.actions;

export default productSlice.reducer;
