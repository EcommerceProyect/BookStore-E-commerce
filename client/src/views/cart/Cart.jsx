import React from 'react';
import { useSelector } from 'react-redux';

const Cart = () => {
  const { cart } = useSelector((state) => state.products);
  return (
    <div>
      <h1>Hola</h1>
      {cart.map(({ id, image, title, price, ISBN, Authors }) => (
        <div key={id}>
          <p>{title}</p>
          <p>
            {Authors.map((author) => (
              <div key={author.id}>{author.name}</div>
            ))}
          </p>
          <p>{ISBN.name}</p>
          <img src={image} alt={title} />
          <p>{price}</p>
        </div>
      ))}
    </div>
  );
};

export default Cart;
