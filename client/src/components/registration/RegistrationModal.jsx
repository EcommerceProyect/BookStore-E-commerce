import React, { useState } from 'react';
import userValidation from './userValidation';

import { Button, Label, Modal, TextInput } from 'flowbite-react';
import signUpUser from '../Auth/signUpUser';
import auth0Register from '../Auth/auth0Register';

const Registration = ({ onClose }) => {
  const [userData, setUserData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    verifyPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
    setErrors(
      userValidation({
        ...userData,
        [e.target.name]: e.target.value,
      }),
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signUpUser(userData);
    if (response.data._id) {
      alert('Has sido registrado exitosamente!');
    } else {
      alert(
        'Hubo un error en el registro. Por favor, verifique los datos ingresados',
      );
    }
  };

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-50 z-40"></div>
      <div
        id="authentication-modal"
        tabindex="-1"
        aria-hidden="true"
        className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Registro
              </h3>
              <button
                onClick={() => onClose(false)}
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5">
              <button
                onClick={auth0Register}
                className="mb-4 w-full px-4 py-2 border flex justify-center items-center gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
              >
                <img
                  className="w-6 h-6"
                  src="https://www.svgrepo.com/show/349297/auth0.svg"
                  loading="lazy"
                  alt="auth0 logo"
                />
                Registrarse con Auth0
              </button>
              <div className="flex items-center justify-center">
                <div className="border-t border-b border-slate-200 dark:border-slate-700 flex-grow"></div>
                <p className="mx-4">o</p>
                <div className="border-t border-b border-slate-200 dark:border-slate-700 flex-grow"></div>
              </div>
              <form className="space-y-4" action="#">
                <div>
                  <Label htmlFor="name" value="Nombre" />
                  <TextInput
                    id="name"
                    name="name"
                    type="text"
                    value={userData.name}
                    onChange={handleChange}
                    color={errors.name ? 'failure' : 'gray'}
                    helperText={errors.name ? errors.name : null}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastname" value="Apellido" />
                  <TextInput
                    id="lastname"
                    type="text"
                    name="lastname"
                    value={userData.lastname}
                    onChange={handleChange}
                    color={errors.lastname ? 'failure' : 'gray'}
                    helperText={errors.lastname ? errors.lastname : null}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" value="E-mail" />
                  <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    color={errors.email ? 'failure' : 'gray'}
                    placeholder="name@company.com"
                    helperText={errors.email ? errors.email : null}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password" value="Contraseña" />
                  <TextInput
                    id="password"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    onChange={handleChange}
                    value={userData.password}
                    color={errors.password ? 'failure' : 'gray'}
                    helperText={errors.password ? errors.password : null}
                    required
                  />
                </div>
                <div>
                  <Label
                    htmlFor="verifyPassword"
                    value="Verificar contraseña"
                  />
                  <TextInput
                    id="verifyPassword"
                    type="password"
                    name="verifyPassword"
                    onChange={handleChange}
                    value={userData.verifyPassword}
                    color={errors.verifyPassword ? 'failure' : 'gray'}
                    helperText={
                      errors.verifyPassword ? errors.verifyPassword : null
                    }
                    required
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="w-full text-white bg-accents hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Registrar{' '}
                </button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Ya estás registrado?{' '}
                  <a
                    href="#"
                    onClick={() => onClose(true)}
                    className="text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Iniciar sesión
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
