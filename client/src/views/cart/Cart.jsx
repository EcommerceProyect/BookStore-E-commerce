import axios from 'axios';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
  const { cart } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);
  const { userCart, cartProducts } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(
    Object.fromEntries(cart.map(({ id }) => [id, 1])),
  );

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
    const currentQuantity = quantity[id];

    const stock = cart.find((product) => product.id === id)?.ISBN.stock || 0;

    if (currentQuantity < stock) {
      handleQuantityChange(id, (quantity[id] || 1) + 1);
      dispatch(
        incrementProductCartQuantity(
          user.id || '',
          id,
          (quantity[id] || 1) + 1,
        ),
      );
    }
  };

  const decrement = (id) => {
    if (quantity[id] > 1) {
      handleQuantityChange(id, quantity[id] - 1);
      dispatch(
        decrementProductCartQuantity(user.id || '', id, quantity[id] - 1),
      );
    }
  };

  const isStockAvailable = cart.every((product) => product.ISBN.stock > 0);
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteProduct(user.id || '', id));
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };
  const checkOut = () => {
    const cartId = userCart;
    const totalAmount = 500;
    const books = cart.map((product) => ({
      id: product.id,
      title: product.title,
      // image: product.image,
      price: Number(product.price),
      quantity: quantity[product.id] || 1,
    }));

    axios
      .post(`${API_BOOKS}/mercadoPago/create-order`, {
        books,
        cartId,
        totalAmount,
      })
      .then((response) => {
        window.location.href = response.data;
        console.log(response.data);
      })
      .catch((error) => console.log(error.message));
    // console.log(actualStock);
  };

  const totalAmount = cart.reduce((acc, { price, id }) => {
    return acc + Number(price) * (quantity[id] || 1);
  }, 0);

  return (
    <div className="flex flex-col">
      <h1 className="p-4 text-3xl font-bold">Tu carrito de compras</h1>

      {cart.length === 0 ? (
        <NoProducts />
      ) : (
        <div>
          {cart.map(({ id, image, title, price, ISBN, Authors }) => (
            <div
              key={id}
              className="flex items-start py-4 px-2 my-4 mx-2 w-2/3 border-b border-gray-400"
            >
              <img src={image} alt={title} className="w-36 bg-slate-400 p-4" />

              <div className="flex flex-col pl-4 w-60">
                <h5 className="text-left text-xl font-semibold tracking-tight text-textDark">
                  {title}
                </h5>
                <span>
                  {Authors.map((author) => (
                    <div
                      key={author.id}
                      className="text-textDark font-thin text-xs"
                    >
                      Autor: {author.name}
                    </div>
                  ))}
                </span>
                <span className="text-textDark font-thin text-xs">
                  ISBN: {ISBN.name}
                </span>
                <span className="text-textDark font-thin text-xs">
                  Stock: {ISBN.stock}
                </span>
                <div className="flex gap-2 my-1 p-1">
                  <button onClick={() => decrement(id)}>
                    <CiSquareMinus size={30} className="text-textGray" />
                  </button>
                  <span>{quantity[id] || 1}</span>
                  <button onClick={() => increment(id)}>
                    <CiSquarePlus size={30} className="text-textGray" />
                  </button>
                </div>
                {sureDelete[id] ? (
                  <div className="text-textGray">
                    <span className="flex w-80">
                      ¿Seguro que desea eliminar este producto?
                    </span>
                    <div className="flex gap-2">
                      <button onClick={() => handleDelete(id)} className="w-16">
                        Si
                      </button>
                      <button
                        onClick={() =>
                          setSureDelete((prev) => ({ ...prev, [id]: false }))
                        }
                        className="w-16"
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
                      <LuTrash2 className=" mt-1" />
                      <span>Eliminar este producto</span>
                    </button>
                  </div>
                )}
              </div>
              <div className="flex ml-16 gap-16">
                <div className="flex flex-col">
                  <span className="text-textGray">Valor unitario</span>
                  <span className="font-sans font-semibold">${price}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-textGray">Valor total</span>
                  <span className="font-sans font-semibold">
                    ${Number(price) * quantity[id] || price}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div className="bg-gray-200 absolute p-10 top-44 right-12 w-72 rounded-sm">
            <div className="flex justify-between p-2">
              <span className="font-sans font-semibold text-lg text-textDark">
                Total:
              </span>
              <span className="font-sans font-semibold text-lg text-textDark">
                $ {totalAmount}
              </span>
            </div>
            <div className=" p-2 mt-8 flex justify-center">
              <button
                onClick={
                  isStockAvailable
                    ? checkOut
                    : () =>
                        toast.error(
                          'Uno de los libros no tiene stock disponible',
                        )
                }
                className="text-white bg-accents active:translate-y-2 active:transform active:bg-red-700 font-medium shadow-sm shadow-black rounded-lg text-base px-16 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <span className="flex w-32">Continuar compra</span>
              </button>
            </div>
          </div>
        </div>
      )}
      <Toaster richColors duration={1500} />
    </div>
  );
};

export default Cart;
