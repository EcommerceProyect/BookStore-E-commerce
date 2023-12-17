import React from 'react';
import ButtonHeart from './ButtonHeart';
import FiveStars from './FiveStars';

function Card({
  id,
  image,
  title,
  Authors,
  Genres,
  synopsis,
  editorial,
  price,
  ISBN,
}) {
  return (
    <div className="relative w-full max-w-sm bg-white  border border-gray-200 rounded-lg shadow dark:border-gray-700">
      <a href="#">
        <div className="relative p-8">
          <ButtonHeart />
          <img class="rounded-lg  shadow-md" src={image} alt="product image" />
        </div>
      </a>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 class="text-left text-xl font-semibold tracking-tight text-gray-900 dark:text-black">
            {title}
          </h5>
          <h5 class="text-left text-xl font-semibold tracking-tight text-gray-900 dark:text-black">
            Géneros:
          </h5>
          <ul>
            {Genres.map((genreItem) => (
              <li key={genreItem.id}>{genreItem.name}</li>
            ))}
          </ul>
          <h5 class="text-left text-xl font-semibold tracking-tight text-gray-900 dark:text-black">
            Autores:
          </h5>
          <ul>
            {Authors.map((author) => (
              <li key={author.id}>{author.name}</li>
            ))}
          </ul>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
          <FiveStars />
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
            5.0
          </span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-left text-2xl font-bold text-gray-900 dark:text-black">
            Precio: {price}
          </span>
          <a
            href="#"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Agregar al carrito
          </a>
        </div>
      </div>
    </div>
  );
}
export default Card;
