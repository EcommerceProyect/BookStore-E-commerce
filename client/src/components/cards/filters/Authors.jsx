import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedAuthor } from '../../../redux/slices/authors'; 
import { fetchAuthors } from '../../../redux/services/getAuthors';

function AuthorFilter({ currentPage, setCurrentPage }) {
  const dispatch = useDispatch();
  const authors = useSelector((state) => state.authors.allAuthors || []);
  const selectedAuthor = useSelector((state) => state.authors.selectedAuthor || []);

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
    author.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <div className='flex'>
      <div className='w-60 pt-5 pl-5'>
        <h2>Autores</h2>
        <input
          type="text"
          placeholder="Filtrar autores"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="border border-gray-300 p-1 rounded mt-2 mb-2"
        />
        <div className='grid w-auto max-h-52 overflow-y-auto overflow-x-hidden'>
          <span className='border-b-2 mb-3'></span>
          {filteredAuthors.map((author) => (
            <div key={author} className="flex items-center mb-4 pr-8">
              <input
                checked={selectedAuthor && selectedAuthor.includes(author)}
                onChange={(event) => handleAuthorChange(event, author)}
                type="checkbox"
                value={author}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor={`author-${author}`} className="ms-2 text-sm font-medium text-black dark:text-gray-500" style={{ wordWrap: 'break-word', width: '120px' }}>{author}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AuthorFilter;
