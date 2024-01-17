import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { updateUser } from '../../redux/services/updateUser';
import profileValidation from './profileValidation';

import { Label, TextInput } from 'flowbite-react';
import { Toaster, toast } from 'sonner';

const UpdateProfile = () => {
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [putUserData, setPutUserData] = useState({
    name: userData.userData?.response?.name || '',
    last_name: userData.userData?.response?.last_name || '',
    phone: userData.userData?.response?.phone || '',
  });

  useEffect(() => {
    if (userData.userData && userData.userData.response) {
      setPutUserData({
        name: userData.userData.response.name || '',
        last_name: userData.userData.response.last_name || '',
        phone: userData.userData.response.phone || '',
      });
    }
  }, [userData.userData?.response]);

  const [errors, setErrors] = useState({
    name: '',
    last_name: '',
    phone: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedUser = {
      email: userData.userData.response.email,
      id: userData.userData.response.id,
      last_name: putUserData.last_name,
      name: putUserData.name,
      phone: putUserData.phone,
    };

    const response = await dispatch(updateUser(updatedUser));
    console.log(response.data.message);

    if (response.data.message === 'Usuario actualizado con éxito') {
      toast.success('Usuario actualizado con éxito');
      setTimeout(() => {
        console.log('hola estamos en history');
        navigate('/profile');
      }, 3000);
    } else {
      toast.error(
        'Hubo un error actualizando el usuario. Porfavor, intente de vuelta.',
      );
    }
  };

  const handleChange = (e) => {
    setPutUserData({
      ...putUserData,
      [e.target.name]: e.target.value,
    });
    setErrors(
      profileValidation({
        ...putUserData,
        [e.target.name]: e.target.value,
      }),
    );
  };
  if (!userData.userData || !userData.userData.response) {
    return (
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
  }

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
          <li>
            <div class="flex items-center">
              <svg
                class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
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
              <a
                href="/profile"
                class="ms-1 text-base font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
              >
                Perfil
              </a>
            </div>
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
                Editar perfil
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <div className="flex items-center justify-center h-[65.5vh]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 border p-6 rounded-md max-w-xl"
        >
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Modificar perfil
            </h3>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Nombre de usuario" />
            </div>
            <TextInput
              id="name"
              type="text"
              name="name"
              value={putUserData.name}
              onChange={handleChange}
              color={errors.name ? 'failure' : 'gray'}
              helperText={errors.name ? errors.name : null}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="last_name" value="Nombre completo"></Label>
            </div>
            <TextInput
              id="last_name"
              type="text"
              name="last_name"
              value={putUserData.last_name}
              onChange={handleChange}
              color={errors.last_name ? 'failure' : 'gray'}
              helperText={errors.last_name ? errors.last_name : null}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="phone" value="Número de teléfono"></Label>
            </div>
            <TextInput
              type="text"
              name="phone"
              id="phone"
              value={putUserData.phone}
              onChange={handleChange}
              color={errors.phone ? 'failure' : 'gray'}
              helperText={errors.phone ? errors.phone : null}
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-accents hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            disabled={
              putUserData.name.length === 0 ||
              putUserData.last_name.length === 0 ||
              putUserData.phone.length === 0 ||
              Object.values(errors).some((error) => error)
            }
          >
            Modificar información de usuario
          </button>
        </form>
        <Toaster richColors />
      </div>
    </div>
  );
};

export default UpdateProfile;
