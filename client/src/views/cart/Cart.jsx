import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { debounce, isEmpty } from 'lodash';
import {
  removeFromCart,
  incrementCartQuantity,
  decrementCartQuantityt,
} from '../../redux/slices/products';
import NoProducts from './NoProducts';
import { deleteProduct } from '../../redux/slices/cartUsersTest';

//? Icons
import { CiSquarePlus, CiSquareMinus } from 'react-icons/ci';
import { LuTrash2 } from 'react-icons/lu';
import {
  decrementProductCartQuantity,
  incrementProductCartQuantity,
} from '../../redux/slices/cartUsersTest';

import { API_BOOKS } from '../../vars';

import { Toaster, toast } from 'sonner';

const Cart = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const { cart } = useSelector((state) => state.products);
  const { userData } = useSelector((state) => state.userData);
  const { userCart, cartProducts } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(
    Array.isArray(cart)
      ? Object.fromEntries(cart.map(({ id }) => {
        const cartQuantity = cart.find(
          product => product.id === id
        ).quantity
        return [id, cartQuantity || 1]
      }))
      : {},
  );
  console.log("quantity:", quantity);
  const [user, setUser] = useState({});
  useEffect(() => {
    if (!isEmpty(userData)) {
      if (!isEmpty(userData.response)) {
        setUser(userData.response);
      }
    }
    console.log("carrito:", userCart)
  }, [userData]);
  const [sureDelete, setSureDelete] = useState(
    Object.fromEntries(cart.map(({ id }) => [id, false])),
  );

  const handleQuantityChange = (id, newQuantity) => {
    setQuantity({
      ...quantity,
      [id]: newQuantity,
    });
  };

  const increment = (id) => {
    const product = cart.find((product) => product.id === id);
    
    const currentQuantity = product.quantity || 0;

    const stock = product.ISBN.stock || 0;

    if (currentQuantity < stock) {
      handleQuantityChange(id, (currentQuantity || 1) + 1);
      dispatch(
        incrementProductCartQuantity(
          user.id || '',
          id,
          (currentQuantity || 1) + 1,
        ),
      );
    }
  };

  const decrement = (id) => {
    const product = cart.find((product) => product.id === id);

    if (product.quantity > 1) {
      handleQuantityChange(id, product.quantity - 1);
      dispatch(
        decrementProductCartQuantity(user.id || '', id, product.quantity - 1),
      );
    }
  };

  const isStockAvailable = cart.every((product) => product.ISBN.stock > 0);

  const token = localStorage.getItem('actualT');
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteProduct(user.id || '', id));
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };
  const checkOut = () => {
    const cartId = userCart;
    const books = cart.map((product) => ({
      id: product.id,
      title: product.title,
      price: Number(product.price),
      quantity: quantity[product.id] || 1,
    }));

    axios
      .post(`${API_BOOKS}/mercadoPago/create-order`, {
        books,
        cartId,
      })
      .then((response) => {
        window.location.href = response.data;
        localStorage.setItem('cart', JSON.stringify([]));
        console.log(response.data);
      })
      .catch((error) => console.log(error.message));
    // console.log(actualStock);
  };

  useEffect(() => {
    const amount = cart.reduce((acc, { price, quantity }) => {
      return acc + Number(price) * (quantity || 1);
    }, 0);
    setTotalAmount(amount);
  },[cart]);

  return (
    <div style={{ minHeight: '65.5vh' }}>
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse p-2">
          <li className="inline-flex items-center">
            <a
              href="/"
              className="inline-flex items-center text-base font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Inicio
            </a>
          </li>

          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="ms-1 text-base font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                Carrito
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <div className="flex flex-col">
        <h1 className="p-4 text-3xl font-bold dark:text-textLight">Tu carrito de compras</h1>

        {cart.length === 0 ? (
          <NoProducts />
        ) : (
          <div>
            {cart.map(({ id, image, title, price, ISBN, Authors, quantity }) => (
              <div
                key={id}
                className="flex items-start py-4 px-2 my-4 mx-2 w-2/3 border-b border-gray-400"
              >
                <img
                  src={image}
                  alt={title}
                  className="w-36 dark:bg-bgDark bg-slate-400 p-4"
                />

                <div className="flex flex-col pl-4 w-60">
                  <h5 className="dark:text-gray-100/85 text-left text-xl font-semibold tracking-tight text-textDark">
                    {title}
                  </h5>
                  <span>
                    {Authors.map((author) => (
                      <div
                        key={author.id}
                        className="dark:text-gray-100/85 text-textDark font-thin text-xs"
                      >
                        Autor: {author.name}
                      </div>
                    ))}
                  </span>
                  <span className="dark:text-gray-100/85 text-textDark font-thin text-xs">
                    ISBN: {ISBN.name}
                  </span>
                  <span className="dark:text-gray-100/85 text-textDark font-thin text-xs">
                    Stock: {ISBN.stock}
                  </span>
                  <div className="flex gap-2 my-1 p-1">
                    <button onClick={() => decrement(id)}>
                      <CiSquareMinus size={30} className="dark:text-gray-100/85 text-textGray" />
                    </button>
                    <span className='dark:text-gray-100/85'>{quantity || 1}</span>
                    <button onClick={() => increment(id)}>
                      <CiSquarePlus size={30} className="dark:text-gray-100/85 text-textGray" />
                    </button>
                  </div>
                  {sureDelete[id] ? (
                    <div className="text-textGray">
                      <span className="dark:text-gray-100/85 flex w-96">
                        ¿Seguro que desea eliminar este producto del carrito?
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(id)}
                          className="dark:text-gray-100/85 w-16"
                        >
                          Si
                        </button>
                        <button
                          onClick={() =>
                            setSureDelete((prev) => ({ ...prev, [id]: false }))
                          }
                          className="dark:text-gray-100/85 w-16"
                        >
                          No
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <button
                        // onClick={() => handleDelete(id)}
                        onClick={() =>
                          setSureDelete((prev) => ({ ...prev, [id]: true }))
                        }
                        className="flex gap-1 text-textGray"
                      >
                        <LuTrash2 className=" mt-1 dark:text-gray-100/85" />
                        <span className='dark:text-gray-100/85'>Eliminar del carrito</span>
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex ml-16 gap-16">
                  <div className="flex flex-col">
                    <span className="text-textGray dark:text-gray-100/85">Valor unitario</span>
                    <span className="font-sans font-semibold dark:text-gray-100/85">${price}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-textGray dark:text-gray-100/85">Valor total</span>
                    <span className="font-sans font-semibold dark:text-gray-100/85">
                      ${Number(price) * quantity || price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div className="dark:bg-gray-900/20 bg-gray-200 absolute p-10 top-44 right-12 w-72 rounded-sm">
              <div className="flex justify-between p-2">
                <span className="dark:text-gray-100/85 font-sans font-semibold text-lg text-textDark">
                  Total:
                </span>
                <span className="dark:text-gray-100/85 font-sans font-semibold text-lg text-textDark">
                  $ {totalAmount}
                </span>
              </div>
              <div className=" p-2 mt-8 flex justify-center">
                {token ? (
                  <button
                    onClick={
                      isStockAvailable
                        ? checkOut
                        : () => toast.error('Uno de los libros no tiene stock')
                    }
                    className="text-white bg-accents active:translate-y-2 active:transform active:bg-red-700 font-medium shadow-sm shadow-black rounded-lg text-base px-16 py-2.5 text-center"
                  >
                    <span className="flex w-32">Continuar compra</span>
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      toast.error(
                        'Debe iniciar sesión para poder continuar con la compra',
                      )
                    }
                    className="text-white bg-accents active:translate-y-2 active:transform active:bg-red-700 font-medium shadow-sm shadow-black rounded-lg text-base px-16 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <span className="flex w-32">Continuar compra</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
        <Toaster richColors duration={1500} />
      </div>
    </div>
  );
};

export default Cart;
