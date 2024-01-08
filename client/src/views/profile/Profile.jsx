import React from 'react';
import { useSelector } from 'react-redux';

// email, name, role, phone, created

// const inputDate = new Date(inputDateString);

// const day = String(inputDate.getUTCDate()).padStart(2, '0');
// const month = String(inputDate.getUTCMonth() + 1).padStart(2, '0');
// const year = inputDate.getUTCFullYear();
// const formattedDateString = `${month}/${day}/${year}`;

const Profile = () => {
  const userData = useSelector((state) => state.userData.userData);
  console.log(userData);

  return (
    <div className="overflow-x-hidden min-h-90 flex-grow w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col md:flex-row">
      <div className="md:w-1/3 flex flex-col items-center justify-center p-5 border-b md:border-b-0 md:border-r border-gray-400 dark:border-gray-700">
        <img
          className="rounded-full w-full h-1/2 md:w-64 md:h-64 object-cover mb-4"
          src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
          alt="Foto de usuario"
        />
        <button
          type="button"
          className="w-2/3 text-white bg-accents hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mt-4 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Editar perfil
        </button>
      </div>

      <div className="flex-grow p-5 flex flex-col">
        <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <p className="text-textDark text-lg font-bold mb-2">Nombre</p>
            <p className="text-textDark">Roberto</p>
          </div>
          <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <p className="text-textDark text-lg font-bold mb-2">Apellido</p>
            <p className="text-textDark">Iglesias</p>
          </div>
          <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <p className="text-textDark text-lg font-bold mb-2">Correo</p>
            <p className="text-textDark">{userData.custom_email_claim}</p>
          </div>
          <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <p className="text-textDark text-lg font-bold mb-2">Teléfono</p>
            <p className="text-textDark">+1234567890</p>
          </div>
          <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <p className="text-textDark text-lg font-bold mb-2">
              Fecha de creación
            </p>
            <p className="text-textDark">01/05/2024</p>
          </div>{' '}
          <p className="text-textDark text-lg font-bold mb-2">
            Tipo de usuario
          </p>
          <p className="text-textDark">
            {userData.scope === 'admin:edit' ? 'Administrador' : 'Cliente'}
          </p>
        </div>
        <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          <p className="text-textDark text-lg font-bold mb-2">Registro</p>
          <p className="text-textDark">
            {userData.sub.startsWith('google-oauth2|')
              ? 'Mediante Google'
              : 'Manual'}
          </p>
        </div>

        <div>
          <p className="text-textDark text-lg font-bold mb-2">Compras </p>
          <p className="text-textDark">Ejemplo 1</p>{' '}
          <p className="text-textDark">Ejemplo 2</p>{' '}
          <p className="text-textDark">Ejemplo 3</p>{' '}
        </div>
      </div>
    </div>
  );
};

export default Profile;
