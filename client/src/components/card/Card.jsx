import React from 'react';
import ButtonHeart from './ButtonHeart';
import FiveStars from './FiveStars';

<<<<<<< HEAD
function Card ({ id, image, price, title, author, genre, synopsis, editorial, ISBN }) {
  return (

<div class="relative w-full max-w-sm bg-white  border border-gray-200 rounded-lg shadow dark:border-gray-700">
    <a href="#">
      <div class="relative p-8">
        <ButtonHeart/>
        <img class="rounded-lg  shadow-md" src={image} alt="product image" />
    </div>
    </a>
    <div class="px-5 pb-5">
      
        <a href="#">
            <h5 class="text-left text-xl font-semibold tracking-tight text-gray-900 dark:text-black">{title}</h5>
            <h5 class="text-left text-xl font-semibold tracking-tight text-gray-900 dark:text-black">{genre}</h5>
            <h5 class="text-left text-xl font-semibold tracking-tight text-gray-900 dark:text-black">{author}</h5>
=======
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
>>>>>>> 4f7b99096a94584891135b801521357fa5e5bd6b
        </a>
        <div class="flex items-center mt-2.5 mb-5">
          <FiveStars />
          <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
            5.0
          </span>
        </div>
        <div class="flex items-center justify-between">
<<<<<<< HEAD
            <span class="text-left text-2xl font-bold text-gray-900 dark:text-black">Precio: {price}</span>
            <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Agregar al carrito</a>
=======
          {/* <span class="text-left text-2xl font-bold text-gray-900 dark:text-black">Precio: {precio}</span> */}
          <a
            href="#"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Agregar al carrito
          </a>
>>>>>>> 4f7b99096a94584891135b801521357fa5e5bd6b
        </div>
      </div>
    </div>
  );
}
export default Card;
