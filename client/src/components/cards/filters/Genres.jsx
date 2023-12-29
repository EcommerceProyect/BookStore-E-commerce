import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedGenre } from '../../../redux/slices/genres';
import { fetchGenres } from '../../../redux/services/getGenres';

function GenreFilter({ currentPage, setCurrentPage }) {
  const genres = useSelector((state) => state.genres.allGenres || []);
  const selectedGenre = useSelector((state) => state.genres.selectedGenre || []);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  const [filterValue, setFilterValue] = useState('');

  const handleGenreChange = (event, genre) => {
    if (!selectedGenre || !selectedGenre.includes(genre)) {
      dispatch(setSelectedGenre([...(selectedGenre || []), genre]));
    } else {
      dispatch(setSelectedGenre(selectedGenre.filter((g) => g !== genre)));
    }
    setCurrentPage(0);
  };

  const filteredGenres = genres.filter((genre) =>
    genre.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <div className='flex'>
      <div className='w-60 pt-5 pl-5'>
        <h2 className=''>Género</h2>
        <input
          type="text"
          placeholder="Filtrar géneros"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="border border-gray-300 p-1 rounded mt-2 mb-2"
        />
        <div className='grid w-auto max-h-52 overflow-y-auto overflow-x-hidden'>
          <span className='border-b-2 mb-3'></span>
          {filteredGenres.map((genre) => (
            <div key={genre} className="flex items-center mb-4 pr-8">
              <input
                checked={selectedGenre && selectedGenre.includes(genre)}
                onChange={(event) => handleGenreChange(event, genre)}
                type="checkbox"
                value={genre}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor={`genre-${genre}`} className="ms-2 text-sm font-medium text-black dark:text-gray-500" style={{ wordWrap: 'break-word', width: '120px' }}>{genre}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GenreFilter;
