import { useEffect } from 'react';
import CardCarousel from './CardCarousel';
import { useDispatch, useSelector } from 'react-redux';
import { getLastProducts } from '../../../redux/services/getLastProducts';
import { Carousel } from 'flowbite-react';

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
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      {loading ? (
        <div className='text-center h-full'>Loading...</div>
      ) : (
        <Carousel>
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
