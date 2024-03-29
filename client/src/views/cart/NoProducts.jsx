import React from 'react';
import { MdOutlineRemoveShoppingCart } from 'react-icons/md';

const NoProducts = () => {
  return (
    <div className='h-full flex items-center justify-center' style={{ minHeight: '54.1vh' }}>
      <div className="dark:text-gray-100/85 flex flex-col justify-center items-center h-full">
        <MdOutlineRemoveShoppingCart size={100} />
        <h3 className="m-10 text-2xl dark:text-gray-100/85">¡Tu carrito de compras está vacío!</h3>
      </div>
    </div>
  );
};

export default NoProducts;