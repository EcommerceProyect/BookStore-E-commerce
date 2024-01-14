import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ReviewsProfile } from './ReviewsProfile';
import { getReviewsByUserId } from '../../redux/services/getReviewsByUserId';
import { useState } from 'react';
const Profile = () => {
  const userData = useSelector((state) => state.userData.userData.response);
  const [booksReviewsByUser, setBooksReviewsByUser] = useState([]);

  const inputDate = new Date(userData.createdAt);
  const day = String(inputDate.getUTCDate()).padStart(2, '0');
  const month = String(inputDate.getUTCMonth() + 1).padStart(2, '0');
  const year = inputDate.getUTCFullYear();
  const formattedDateString = `${month}/${day}/${year}`;

  useEffect(() => {
    const fetchData = async () => {
      if (booksReviewsByUser.length === 0) {
        const responseReviews = await getReviewsByUserId(userData.id);
        setBooksReviewsByUser(responseReviews);
      }
    };
    fetchData();
  }, [booksReviewsByUser]);

  const products = [
    {
      title: 'Mujer en punto cero',
      price: '4000',
      image:
        'https://res.cloudinary.com/dwajgrydt/image/upload/v1704670771/PortadasLibros/geljgyijovcwldsvmmkv.jpg',
    },
    {
      title: 'El poder del ahora',
      price: '3000',
      image:
        'https://res.cloudinary.com/dwajgrydt/image/upload/v1704675025/PortadasLibros/eb0dh4xq8uzxzwc3rfpi.jpg',
    },
    {
      title: 'El principito',
      price: '7000',
      image:
        'https://res.cloudinary.com/dwajgrydt/image/upload/v1704675356/PortadasLibros/jaidzwop7ikdcynkhevi.jpg',
    },
    {
      title: 'La catedral del mar',
      price: '3000',
      image:
        'https://res.cloudinary.com/dwajgrydt/image/upload/v1704675664/PortadasLibros/lajtxesjacjxpbrxhlov.jpg',
    },
    {
      title: 'Orgullo y prejuicio',
      price: '5500',
      image:
        'https://res.cloudinary.com/dwajgrydt/image/upload/v1704676620/PortadasLibros/hxllzm5plyb8znc4ut44.jpg',
    },
  ];

  return (
    <div>
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
      <div className="overflow-x-hidden min-h-90 flex-grow w-full bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col md:flex-row">
        <div className="md:w-1/3 flex flex-col items-center justify-center p-5 border-b md:border-b-0 md:border-r border-gray-400 dark:border-gray-700">
          <img
            className="rounded-full w-full h-1/2 md:w-64 md:h-64 object-cover mb-4"
            src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
            alt="Foto de usuario"
          />
          <a
            href="/profile/edit"
            className=" w-1/2 text-white bg-accents hover:bg-red-800 hover:cursor-pointer focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mt-4 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Editar perfil
          </a>
        </div>

        <div className="flex-grow p-5 flex flex-col">
          <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <p className="text-textDark text-lg font-bold mb-2">Nombre</p>
              <p className="text-textDark">
                {/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(
                  userData.name,
                )
                  ? '...'
                  : userData.name}
              </p>
            </div>
            <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <p className="text-textDark text-lg font-bold mb-2">Apellido</p>
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
            <div className="flex overflow-x-auto p-4">
              {products.map((p) => (
                <div className="max-w-xs mx-2">
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
              ))}
            </div>
          </div>
          <div>
            <p className="text-textDark text-lg font-bold mb-2">Mis reseñas</p>
            <div className="flex overflow-x-auto p-4">
              {booksReviewsByUser.map((review) => {
                return (
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
                          <ReviewsProfile rating={review.rating} productId={review.id} userId={userData.id} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
