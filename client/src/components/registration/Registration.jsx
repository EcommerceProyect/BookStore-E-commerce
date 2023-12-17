import React, { useState } from 'react';
import userValidation from './userValidation';

const Registration = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center h-screen"
    >
      <div>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-600 text-center"
          >
            Nombre
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={userData.name}
            onChange={handleChange}
            className="w-full border p-2 mt-1"
          />
          {errors.name ? (
            <a className="block text-sm font-semibold text-red-600 text-center">
              {errors.name}
            </a>
          ) : null}
        </div>

        <div className="mb-6">
          <label
            htmlFor="lastname"
            className="block text-sm font-semibold text-gray-600 text-center"
          >
            Apellido
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            onChange={handleChange}
            value={userData.lastname}
            className="w-full border p-2 mt-1"
          />
          {errors.lastname ? (
            <a className="block text-sm font-semibold text-red-600 text-center">
              {errors.lastname}
            </a>
          ) : null}
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-600 text-center"
          >
            E-mail
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            value={userData.email}
            className="w-full border p-2 mt-1"
          />
          {errors.email ? (
            <a className="block text-sm font-semibold text-red-600 text-center">
              {errors.email}
            </a>
          ) : null}
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-600 text-center"
          >
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={userData.password}
            className="w-full border p-2 mt-1"
          />
          {errors.password ? (
            <a className="block text-sm font-semibold text-red-600 text-center">
              {errors.password}
            </a>
          ) : null}
        </div>

        <div className="mb-6">
          <label
            htmlFor="verifyPassword"
            className="block text-sm font-semibold text-gray-600 text-center"
          >
            Verificar contraseña
          </label>
          <input
            type="password"
            name="verifyPassword"
            id="verifyPassword"
            onChange={handleChange}
            value={userData.verifyPassword}
            className="w-full border p-2 mt-1"
          />
          {errors.verifyPassword ? (
            <a className="block text-sm font-semibold text-red-600 text-center">
              {errors.verifyPassword}
            </a>
          ) : null}
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded"
          >
            Registrar
          </button>
        </div>
      </div>
    </form>
  );
};

export default Registration;
