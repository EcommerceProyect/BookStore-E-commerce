import { useEffect } from 'react';
import CardCarousel from './CardCarousel';
import { useDispatch, useSelector } from 'react-redux';
import { getLastProducts } from '../../../redux/services/getLastProducts';
import { Carousel } from 'flowbite-react';

const customTheme = {
  "root": {
    "base": "relative h-full w-full",
    "leftControl": "absolute top-0 left-0 flex h-full items-center justify-center px-4 focus:outline-none",
    "rightControl": "absolute top-0 right-0 flex h-full items-center justify-center px-4 focus:outline-none"
  },
  "indicators": {
    "active": {
      "off": "bg-white/50 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800",
      "on": "bg-white dark:bg-gray-800"
    },
    "base": "h-3 w-3 rounded-full",
    "wrapper": "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3"
  },
  "item": {
    "base": "absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
    "wrapper": {
      "off": "w-full flex-shrink-0 transform cursor-default snap-center",
      "on": "w-full flex-shrink-0 transform cursor-grab snap-center"
    }
  },
  "control": {
    "base": "inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10",
    "icon": "h-5 w-5 text-black dark:text-gray-800 sm:h-6 sm:w-6"
  },
  "scrollContainer": {
    "base": "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg",
    "snap": "snap-x"
  }
};

const CarouselComponent = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.products);
  const carouselProducts = useSelector(
    (state) => state.products.carouselProducts,
  );
  const totalItems = useSelector((state) => state.products.totalItems);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(totalItems / itemsPerPage) - 1;

  useEffect(() => {
    dispatch(getLastProducts(totalPages, 5));
  }, [dispatch, totalPages]);

  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 my-4">
      {loading ? (
        <div className='text-center h-full'>Loading...</div>
      ) : (
        <Carousel slide={true} theme={customTheme} slideInterval={6000} >
          {carouselProducts.map((product) => {
            return (
              <div className=" flex h-full items-center justify-center bg-white-400 dark:bg-gray-700 dark:text-white">
                <CardCarousel
                  id={product.id}
                  image={product.image}
                  title={product.title}
                  Authors={product.Authors}
                  Genres={product.Genres}
                  price={product.price}
                  synopsis={product.synopsis}
                />
              </div>
            );
          })}
        </Carousel>
      )}
    </div>
  );
};
export default CarouselComponent;
