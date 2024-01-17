import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedAuthor } from '../../../redux/slices/authors';
import { fetchAuthors } from '../../../redux/services/getAuthors';

function AuthorFilter({ currentPage, setCurrentPage }) {
  const dispatch = useDispatch();
  const authors = useSelector((state) => state.authors.allAuthors || []);
  const selectedAuthor = useSelector(
    (state) => state.authors.selectedAuthor || [],
  );

  useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);

  const [filterValue, setFilterValue] = useState('');

  const handleAuthorChange = (event, author) => {
    if (!selectedAuthor || !selectedAuthor.includes(author)) {
      dispatch(setSelectedAuthor([...(selectedAuthor || []), author]));
    } else {
      dispatch(setSelectedAuthor(selectedAuthor.filter((a) => a !== author)));
    }

    setCurrentPage(0);
  };

  const filteredAuthors = authors.filter((author) =>
    author.name.toLowerCase().includes(filterValue.toLowerCase()),
  );

  return (
    <div className="flex dark:text-textLight">
      <div className="w-60 pt-5 pl-5">
        <h2>Autores</h2>
        <input
          type="text"
          placeholder="Filtrar autores"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="dark:bg-gray-900/20 dark:border-none border border-gray-300 p-1 rounded mt-2 mb-2"
        />
        <div className="grid w-auto max-h-52 overflow-y-auto overflow-x-hidden">
          <span className="dark:border-gray-900/20 border-b-2 mb-3"></span>
          {filteredAuthors.map((author) => (
            <div key={author.id} className="flex items-center mb-4 pr-8">
              <input
                checked={selectedAuthor && selectedAuthor.includes(author.name)}
                onChange={(event) => handleAuthorChange(event, author.name)}
                type="checkbox"
                value={author.name}
                className="w-4 h-4 dark:border-gray-900/20 bg-gray-100 border-none rounded dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 appearance-none checked:bg-primary checked:border-primary"
              />
              <label
                htmlFor={`author-${author.name}`}
                className="dark:text-textLight ms-2 text-sm font-medium text-black"
                style={{ wordWrap: 'break-word', width: '120px' }}
              >
                {author.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AuthorFilter;
