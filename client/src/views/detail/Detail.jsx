import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../redux/services/getProductDetail';
import {
  setProductDetailLoading,
  setProductDetail,
  setProductDetailError,
} from '../../redux/slices/products';
import { useParams } from 'react-router-dom';

function Detail() {
  const { detailProduct } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(setProductDetailLoading());
      dispatch(getProductDetails(id));
    }
  }, [id, dispatch]);

  return (
    <div>
      <section class="text-textGray body-font overflow-hidden bg-white py-2">
        <div class="container px-5 py-24 mx-auto">
          <div class="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
              src={detailProduct?.image}
            />
            <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 class="text-textDark text-2xl title-font font-bold mb-1 pb-2">
                {detailProduct?.title || 'Título no disponible.'}
              </h1>
              <h2 class="text-sm title-font text-textGray tracking-widest pb-1">
                {detailProduct?.Authors.map((author) => author.name) ||
                  'Autor no disponible.'}
              </h2>
              <div class="flex mb-4">
                <span class="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    class="w-4 h-4 text-accents"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    class="w-4 h-4 text-accents"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    class="w-4 h-4 text-accents"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    class="w-4 h-4 text-accents"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    class="w-4 h-4 text-accents"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span class="text-gray-600 ml-3">4 Reviews</span>
                </span>
              </div>
              <p class="leading-relaxed py-1">
                {detailProduct?.synopsis || 'Sinopsis no disponible.'}
              </p>
              <hr></hr>
              <h2 class="text-sm title-font text-gray-800 tracking-widest py-1">
                Género:{' '}
                {detailProduct?.Genres.map((genre) => genre.name).join(', ') ||
                  'Género no disponible.'}
              </h2>
              <h2 class="text-sm title-font text-gray-800 tracking-widest py-1">
                Editorial: {detailProduct?.Editorial.name}
              </h2>
              <h2 class="text-sm title-font text-gray-800 tracking-widest py-1">
                ISBN: {detailProduct?.ISBN?.name || 'ISBN no disponible.'}
              </h2>
              <div class="flex pt-4">
                <span class="text-left text-2xl font-medium text-textDark dark:text-black">
                  Precio: ${detailProduct?.price || 'Precio no disponible.'}
                </span>
                <button class="flex ml-auto text-white bg-accents border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                  Agregar al carrito
                </button>
                <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-textGray ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Detail;
