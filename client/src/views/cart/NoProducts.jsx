import React from 'react';
import { MdOutlineRemoveShoppingCart } from 'react-icons/md';

const NoProducts = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <MdOutlineRemoveShoppingCart size={100} />
      <h3 className="m-10 text-2xl">¡Tu carrito de compras esta vacio!</h3>
    </div>
  );
};

export default NoProducts;
