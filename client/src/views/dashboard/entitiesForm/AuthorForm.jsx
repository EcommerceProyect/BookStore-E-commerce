import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { updateAuthor } from '../../../redux/services/updateAuthor';

const AuthorForm = ({ setToast }) => {
  const dispatch = useDispatch();
  const allAuthors = useSelector((state) => state.authors.allAuthors);

  const [editedAuthors, setEditedAuthors] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (authorId, newName) => {
    setEditedAuthors((prev) => ({ ...prev, [authorId]: newName }));
  };

  const handleEditClick = async (authorId) => {
    const newName = editedAuthors[authorId];
    if (newName.length < 2) {
      setToast('error', 'El campo debe tener más de dos dígitos');
      return;
    }

    if (newName) {
      const response = await dispatch(
        updateAuthor({ name: newName }, authorId),
      );
      if (response.data.message === 'Autor actualizado con éxito') {
        setToast('success', response.data.message);
      } else {
        setToast('error', response.data.message);
      }
    }
  };

  const filteredAuthors = allAuthors.filter((author) =>
    author.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div>
      <form>
        <label
          htmlFor="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Buscar
        </label>
        <div className="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Buscar autores..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            required
          />
        </div>
      </form>

      <div>
        {filteredAuthors.map((author) => (
          <div
            key={author.id}
            className="flex items-center justify-between mt-6"
          >
            <input
              type="text"
              className="w-3/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={
                editedAuthors[author.id] !== undefined
                  ? editedAuthors[author.id]
                  : author.name
              }
              onChange={(e) => handleInputChange(author.id, e.target.value)}
            />
            <button
              type="button"
              class="h-full w-1/5 focus:outline-none text-white bg-accents hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={() => handleEditClick(author.id)}
            >
              Editar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorForm;
