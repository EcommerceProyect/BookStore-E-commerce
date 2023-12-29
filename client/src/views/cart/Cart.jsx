import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/slices/products';

const Cart = () => {
  const { cart } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
  };

  const decrement = () => {
    if (counter > 0) setCounter(counter - 1);
  };

  const handleDelete = (id) => {
    dispatch(removeFromCart({ id: id }));
  };

  return (
    <div>
      <h1 className="p-4 text-3xl font-bold">Tu carrito de compras</h1>

      <div className="flex justify-between">
        {cart.map(({ id, image, title, price, ISBN, Authors }) => (
          <div key={id} className="flex items-start p-2 m-2">
            <img src={image} alt={title} className="w-36 bg-slate-400 p-4" />

            <div className="flex flex-col pl-4">
              <h5 className="text-left text-xl font-semibold tracking-tight text-textDark dark:text-black">
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
              <div>
                <button onClick={decrement}>-</button>
                <span>{counter}</span>
                <button onClick={increment}>+</button>
              </div>
              <button onClick={() => handleDelete(id)}>
                Eliminar este producto
              </button>
            </div>
            <div className="flex flex-col ml-56">
              <span className="text-textGray">Valor</span>
              <span className="font-sans font-semibold">
                ${increment ? Number(price) + Number(price) : Number(price)}
              </span>
            </div>
          </div>
        ))}
        <div className="bg-gray-500 flex flex-col self-end">
          <button>Continuar compra</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
