import React, { useEffect, useRef, useState } from 'react';
import { debounce, isEmpty } from 'lodash';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/products';

// import ButtonHeart from './ButtonHeart';
// import FiveStars from './FiveStars';

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { Badge } from 'flowbite-react';
import {
  addProductToCart,
  addProductToCartApi,
  createCart,
} from '../../redux/slices/cartUsersTest';

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
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.products);
  const { userData } = useSelector((state) => state.userData);
  
  useEffect(() => {
    if(!isEmpty(userData)){
      if(!isEmpty(userData.response)){
        setUser(userData.response);
      }
    }
  },[userData])
  const handleCart = () => {
    if (ISBN.stock === 0) {
      console.log('No se pueden agregar productos sin stock');
    } else {
      dispatch(addToCart({ id, image, title, price, ISBN, Authors }));
      dispatch(addProductToCartApi(user.id || '', id, 1));
    }
    console.log(cart);
    console.log(user.id);
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
    <div class="w-80 h-100 dark:bg-gray-900/20 relative max-w-sm bg-white  border border-gray-200 rounded-lg shadow dark:border-gray-700">
      <div class="relative p-8">
        <Link to={`/detail/${id}`}>
          <div className="dark:bg-bgDark w-60 h-60">
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
          <h5 class="dark:text-textLight text-left text-xl font-semibold tracking-tight text-textDark">
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
          <span class="dark:text-textLight text-left text-2xl font-bold text-textDark ">
            ${price}
          </span>
          {ISBN.stock === 0 || ISBN.stock < 0 ? (
            <button
              disabled
              className="text-gray-500 bg-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Stock agotado
            </button>
          ) : (
            <button
              onClick={handleCart}
              class="text-white bg-accents hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Agregar al carrito
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default Card;
