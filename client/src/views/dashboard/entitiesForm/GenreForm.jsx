import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { updateGenre } from '../../../redux/services/updateGenre';
import { fetchGenres } from '../../../redux/services/getGenres';

import DeleteConfirmationModal from './deleteModal';
import { deleteGenre } from '../../../redux/services/deleteGenre';

const GenreForm = ({ setToast }) => {
  const dispatch = useDispatch();
  const allGenres = useSelector((state) => state.genres.allGenres);
  const currentPage = useSelector((state) => state.genres.currentPage);
  const totalItemsFromState = useSelector((state) => state.genres.totalItems);

  const [editedGenres, setEditedGenres] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [genreToDelete, setGenreToDelete] = useState(null);

  const itemsPerPage = 50;
  const totalPages = Math.ceil(totalItemsFromState / itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchGenres(currentPage));
    };

    fetchData();
  }, [currentPage]);

  const handleInputChange = (genreId, newName) => {
    setEditedGenres((prev) => ({ ...prev, [genreId]: newName }));
  };

  const handleEditClick = async (genreId) => {
    const newName = editedGenres[genreId];
    if (newName.length < 2) {
      setToast('error', 'El campo debe tener más de dos dígitos');
      return;
    } else if (newName.length > 20) {
      setToast('error', 'El campo debe tener menos de veinte dígitos');
      return;
    }

    if (newName) {
      const response = await dispatch(updateGenre({ name: newName }, genreId));
      if (response.data.message === 'Genre actualizado con éxito') {
        setToast('success', 'Género actualizado con éxito');
      } else {
        setToast('error', response.data.message);
      }
    }
  };

  const handleDeleteClick = (genre) => {
    setShowDeleteModal(true);
    setGenreToDelete(genre);
  };

  const handleConfirmDelete = async (id) => {
    const response = await dispatch(deleteGenre(id));
    setShowDeleteModal(false);
    console.log(response);
    if (response.data.message === 'Género eliminado exitosamente') {
      setToast('success', response.data.message);
    } else {
      setToast('error', response.data.message);
    }
  };

  const handleCancelDelete = () => {
    setGenreToDelete(null);
    setShowDeleteModal(false);
  };

  const filteredGenres = allGenres.filter((genre) =>
    genre.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  return (
    <div>
      {' '}
      <form>
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Buscar
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Buscar géneros..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            required
          />
        </div>
      </form>
      <div>
        {filteredGenres.map((genre) => (
          <div
            key={genre.id}
            className="flex items-center justify-between mt-6 space-x-4"
          >
            <input
              type="text"
              className="flex-1 py-2 px-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={
                editedGenres[genre.id] !== undefined
                  ? editedGenres[genre.id]
                  : genre.name
              }
              onChange={(e) => handleInputChange(genre.id, e.target.value)}
            />
            <button
              type="button"
              className="py-2 px-4 text-white bg-accents hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={() => handleEditClick(genre.id)}
            >
              Editar
            </button>
            <button
              type="button"
              className="py-2 px-4 text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              onClick={() => handleDeleteClick(genre)}
            >
              Eliminar
            </button>
          </div>
        ))}
        <nav
          className="flex justify-center p-5"
          aria-label="Page navigation example"
        >
          <ul className="inline-flex -space-x-px text-sm">
            <li>
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-textGray bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i}>
                <button
                  onClick={() => dispatch(setCurrentPage(i))}
                  className={`flex items-center justify-center px-3 h-8 leading-tight text-textGray bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                    currentPage === i ? 'text-blue-600 bg-blue-50' : ''
                  }`}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
                className="flex items-center justify-center px-3 h-8 leading-tight text-textGray bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <DeleteConfirmationModal
        showDeleteModal={showDeleteModal}
        handleCancelDelete={handleCancelDelete}
        handleConfirmDelete={handleConfirmDelete}
        type={'género'}
        entity={genreToDelete}
      />
    </div>
  );
};

export default GenreForm;
