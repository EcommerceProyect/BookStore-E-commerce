import React from 'react';

function ListChild({ title, ISBN, price, stock, id }) {
  return (
    <li key={id} className="py-3 sm:py-4 p-8 flex items-center space-x-4">
      <div className="max-w-40 cursor-pointer flex-1 min-w-0" style={{ minWidth: '10rem' }}> 
        <p className="text-center text-sm font-medium text-gray-900 truncate dark:text-white">
          {title}
        </p>
      </div>
      <div className="max-w-32 flex-1 text-sm font-semibold text-gray-900 dark:text-white text-center min-w-0"  style={{ minWidth: '8rem' }}>
        {ISBN}
      </div>
      <div className="max-w-20 flex-1 text-sm font-semibold text-gray-900 dark:text-white text-center min-w-0" style={{ minWidth: '5rem' }}>
        {price}
      </div>
      <div className="max-w-20 flex-1 text-sm font-semibold text-gray-900 dark:text-white text-center min-w-0" style={{ minWidth: '5rem' }}>
        {stock}
      </div>
    </li>
  );
}

export default ListChild;
