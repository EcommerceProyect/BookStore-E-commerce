import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

import { ReviewsProfile } from './ReviewsProfile';
import { getReviewsByUserId } from '../../redux/services/getReviewsByUserId';

const Profile = () => {
  const userData = useSelector((state) => state.userData.userData?.response);
  const orders = useSelector((state) => state.userData.orders);
  console.log(orders);

  const formattedDateString =
    userData && userData.createdAt
      ? new Date(userData.createdAt).toLocaleDateString('en-GB')
      : '';

  const [booksReviewsByUser, setBooksReviewsByUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (booksReviewsByUser.length === 0) {
        const responseReviews = await getReviewsByUserId(userData.id);
        setBooksReviewsByUser(responseReviews);
      }
    };
    fetchData();
  }, [booksReviewsByUser, userData]); // Add userData.id to the dependency array

  return userData ? (
    <div className="container mx-auto mt-8 mb-8">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse p-2">
          <li className="inline-flex items-center">
            <a
              href="/"
              className="inline-flex items-center text-base font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Inicio
            </a>
          </li>

          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="ms-1 text-base font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                Perfil
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <div className="border overflow-x-hidden min-h-90 flex-grow w-full bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 border-gray-400 flex flex-col md:flex-row">
        <div className="md:w-1/5 flex flex-col items-center justify-top p-5 border-b md:border-b-0 md:border-r border-gray-400">
          <img
            className="rounded-full w-full h-1/2 md:w-48 md:h-48 object-cover mb-0"
            src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
            alt="Foto de usuario"
          />
          <a
            href="/profile/edit"
            className=" w-4/5 text-white bg-accents hover:bg-red-800 hover:cursor-pointer focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mt-0 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Editar perfil
          </a>
        </div>

        <div className="flex-grow p-5 flex flex-col md:pl-8">
          <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <p className="text-textDark text-lg font-bold mb-2">Nombre de usuario</p>
              <p className="text-textDark">
                {/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(
                  userData.name,
                )
                  ? '...'
                  : userData.name}
              </p>
            </div>
            <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <p className="text-textDark text-lg font-bold mb-2">Nombre completo</p>
              <p className="text-textDark">
                {userData.last_name ? userData.last_name : '...'}
              </p>
            </div>
            <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <p className="text-textDark text-lg font-bold mb-2">Correo</p>
              <p className="text-textDark">{userData.email}</p>
            </div>
            <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <p className="text-textDark text-lg font-bold mb-2">Teléfono</p>
              <p className="text-textDark">
                {userData.phone ? userData.phone : '...'}
              </p>
            </div>
            <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <p className="text-textDark text-lg font-bold mb-2">
                Fecha de creación
              </p>
              <p className="text-textDark">{formattedDateString}</p>
            </div>{' '}
            <p className="text-textDark text-lg font-bold mb-2">
              Tipo de usuario
            </p>
            <p className="text-textDark">
              {userData.role === 'user' ? 'Cliente' : 'Administrador'}
            </p>
          </div>
          <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <p className="text-textDark text-lg font-bold mb-2">Registro</p>
            <p className="text-textDark">
              {userData.id && userData.id.startsWith('google-oauth2|')
                ? 'Mediante Google'
                : 'Manual'}
            </p>
          </div>

          <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <p className="text-textDark text-lg font-bold mb-2">
              Últimas compras{' '}
            </p>
            {Array.isArray(orders) ? (
              <div className="flex overflow-x-auto p-4">
                {orders?.map((p) => (
                  <Link to={`/detail/${p.id}`}>
                    <div className="max-w-xs mx-2" key={p.id}>
                      <div className="relative max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:border-gray-700">
                        <div className="relative p-4">
                          <div className="w-32 h-32 mx-auto">
                            <img
                              className="rounded-lg shadow-md object-contain w-full h-full"
                              src={p.image}
                              alt={`Foto de ${p.title}`}
                            />
                          </div>
                        </div>

                        <div className="px-4 pb-4">
                          <div className="flex items-center justify-between">
                            <span className="text-left text-sm font-bold text-textGray dark:text-black">
                              Fecha de compra: {p.orderDate}
                            </span>
                          </div>

                          <h5 className="text-left text-lg font-semibold tracking-tight text-textDark dark:text-black">
                            {p.title}
                          </h5>

                          <div className="flex items-center justify-between">
                            <span className="text-left text-lg font-bold text-textDark dark:text-black">
                              ${p.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-textDark">...</p>
            )}
          </div>
          <div>
            <p className="text-textDark text-lg font-bold mb-2">Mis reseñas</p>
            <div className="flex overflow-x-auto p-4">
            {Array.isArray(booksReviewsByUser) ? (
              booksReviewsByUser.map((review) => (
                <div key={review.id} className="max-w-xs mx-2">
                  <div className="relative max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:border-gray-700">
                    <div className="relative p-4">
                      <div className="w-32 h-32 mx-auto">
                        <img
                          className="rounded-lg shadow-md object-contain w-full h-full"
                          src={review.image}
                          alt={`Foto de ${review.title}`}
                        />
                      </div>
                    </div>

                    <div className="px-4 pb-4">
                      <h5 className="text-left text-lg font-semibold tracking-tight text-textDark dark:text-black">
                        {review.title}
                      </h5>

                      <div className="flex items-center justify-between">
                        <ReviewsProfile
                          rating={review.rating}
                          productId={review.id}
                          userId={userData.id}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-textDark">...</p>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div
      role="status"
      className="my-10 text-center flex flex-col justify-center items-center h-[57vh]"
    >
      <svg
        aria-hidden="true"
        class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-accents"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span class="sr-only">Cargando...</span>
    </div>
  );
};

export default Profile;