import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { fetchEditorial } from '../../redux/services/getEditorial';
import { fetchGenres } from '../../redux/services/getGenres';
import { fetchAuthors } from '../../redux/services/getAuthors';

import { Toaster, toast } from 'sonner';

import Dashboard from './Dashboard';

import AuthorForm from './entitiesForm/AuthorForm';
import EditorialForm from './entitiesForm/editorialForm';
import GenreForm from './entitiesForm/genreForm';

const EditEntities = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGenres());
    dispatch(fetchAuthors());
    dispatch(fetchEditorial());
  }, []);

  const allGenres = useSelector((state) => state.genres.allGenres);
  const allAuthors = useSelector((state) => state.authors.allAuthors);
  const allEditorials = useSelector((state) => state.editorial.allEditorial);

  const [selectedType, setSelectedType] = useState('author');

  const setToast = (type, value) => {
    if (type === 'success') {
      toast.success(value);
    } else if (type === 'error') {
      toast.error(value);
    }
  };

  const handleSelectChange = (e) => {
    setSelectedType(e.target.value);
  };

  return allGenres !== undefined &&
    allGenres.length > 0 &&
    allAuthors !== undefined &&
    allAuthors.length > 0 &&
    allEditorials !== undefined &&
    allEditorials.length > 0 ? (
    <div className="flex">
      <Dashboard />
      <div className="flex flex-col w-full p-8 ">
        <div className="mx-auto max-w-screen-2xl w-full gap-4 p-8 border rounded-md">
          <div className="flex items-center pb-8">
            <label
              htmlFor="entities"
              className="text-sm font-medium text-gray-900 dark:text-white px-4 w-1/8"
            >
              Entidades
            </label>
            <select
              onChange={handleSelectChange}
              id="entities"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block flex-1 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected value="author">
                Autores
              </option>
              <option value="editorial">Editoriales</option>
              <option value="genre">Géneros</option>
            </select>
          </div>

          <div className="border-b border-gray-300" />

          <div className="mt-8 ">
            {selectedType === 'author' && <AuthorForm setToast={setToast} />}
            {selectedType === 'editorial' && (
              <EditorialForm setToast={setToast} />
            )}
            {selectedType === 'genre' && <GenreForm setToast={setToast} />}
          </div>
        </div>
      </div>
      <Toaster richColors />
    </div>
  ) : (
    <div
      role="status"
      className="my-10 text-center flex flex-col justify-center items-center h-[57vh]"
    >
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-accents"
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
      <span className="sr-only">Cargando...</span>
    </div>
  );
};

export default EditEntities;
