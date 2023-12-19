import React from 'react';
import ButtonHeart from './ButtonHeart';
import FiveStars from './FiveStars';

import { Badge } from 'flowbite-react';

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
    <div class="relative w-full max-w-sm bg-white  border border-gray-200 rounded-lg shadow dark:border-gray-700">
      <a href="#">
        <div class="relative p-8">
          <ButtonHeart />
          <img
            class="rounded-lg  shadow-md"
            src="https://pbs.twimg.com/profile_images/464895051043053568/q2dB15UL_400x400.jpeg"
            alt="product image"
          />
        </div>
      </a>
      <div class="px-5 pb-5">
        <a href="#">
          <h5 class="text-left text-xl font-semibold tracking-tight text-gray-900 dark:text-black">
            {title}
          </h5>
        </a>

        <div className="flex mt-3 mb-3">
          {Genres.slice(0, 3).map((genreItem) => (
            <Badge color="gray" key={genreItem.id} className="mr-2">
              {genreItem.name}
            </Badge>
          ))}
        </div>
        <div class="flex items-center mt-2.5 mb-5">
          <FiveStars />
          <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
            5.0
          </span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-left text-2xl font-bold text-gray-900 dark:text-black">
            ${price}
          </span>
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
