import React, { useRef } from 'react';

import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/products';

// import ButtonHeart from './ButtonHeart';
// import FiveStars from './FiveStars';

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { Badge } from 'flowbite-react';
import { createCart } from '../../redux/slices/cartUsersTest';

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
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.products);
  const handleCart = () => {
    const userId = '2873bcf9-a7be-419f-99d2-831cc78727e5';
    dispatch(addToCart({ id, image, title, price, ISBN, Authors }));
    dispatch(createCart(userId));
    console.log(cart);
  };

  const sliderRef = useRef(null);

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 100;
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 100;
    }
  };

  return (
    <div class="relative w-full max-w-sm bg-white  border border-gray-200 rounded-lg shadow dark:border-gray-700">
      <div class="relative p-8">
        <Link to={`/detail/${id}`}>
          <div className="w-60 h-60">
            <img
              className="rounded-lg shadow-md object-contain w-full h-full"
              src={image}
              alt={`Foto de ${title}`}
            />
          </div>
        </Link>
      </div>

      <div class="px-5 pb-5">
        <Link to={`/detail/${id}`}>
          <h5 class="text-left text-xl font-semibold tracking-tight text-textDark dark:text-black">
            {title}
          </h5>
        </Link>

        <div className="flex mt-3 mb-3" style={{ width: 'auto' }}>
          <MdChevronLeft
            onClick={slideLeft}
            size={25}
            className="opacity-50 cursor-pointer hover:opacity-100"
          />
          <div
            ref={sliderRef}
            className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide pr-2 pl-2"
          >
            {Genres.map((genreItem) => (
              <Badge
                color="gray"
                key={genreItem.id}
                className="mr-2 inline-block"
              >
                {genreItem.name}
              </Badge>
            ))}
          </div>
          <MdChevronRight
            onClick={slideRight}
            size={25}
            className="opacity-50 cursor-pointer hover:opacity-100"
          />
        </div>

        <div class="flex items-center mt-2.5 mb-5">
          {/* <FiveStars /> */}
          {/* <span class="bg-textLight text-textGray text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
            5.0
          </span> */}
        </div>
        <div class="flex items-center justify-between">
          <span class="text-left text-2xl font-bold text-textDark dark:text-black">
            ${price}
          </span>
          <button
            onClick={handleCart}
            class="text-white bg-accents hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
export default Card;
