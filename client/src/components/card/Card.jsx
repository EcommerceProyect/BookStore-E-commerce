import React from 'react';
import ButtonHeart from './ButtonHeart';
import FiveStars from './FiveStars';

function Card({
  id,
  imagen,
  titulo,
  autor,
  genero,
  sinopsis,
  editorial,
  ISBN,
}) {
  return (
    <div class="relative w-full max-w-sm bg-white  border border-gray-200 rounded-lg shadow dark:border-gray-700">
      <a href="#">
        <div class="relative p-8">
          <ButtonHeart />
          <img class="rounded-lg  shadow-md" src={imagen} alt="product image" />
        </div>
      </a>
      <div class="px-5 pb-5">
        <a href="#">
          <h5 class="text-left text-xl font-semibold tracking-tight text-gray-900 dark:text-black">
            {titulo}
          </h5>
          <h5 class="text-left text-xl font-semibold tracking-tight text-gray-900 dark:text-black">
            {genero}
          </h5>
          <h5 class="text-left text-xl font-semibold tracking-tight text-gray-900 dark:text-black">
            {autor}
          </h5>
        </a>
        <div class="flex items-center mt-2.5 mb-5">
          <FiveStars />
          <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
            5.0
          </span>
        </div>
        <div class="flex items-center justify-between">
          {/* <span class="text-left text-2xl font-bold text-gray-900 dark:text-black">Precio: {precio}</span> */}
          <a
            href="#"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Agregar al carrito
          </a>
        </div>
      </div>
    </div>
  );
}
export default Card;
