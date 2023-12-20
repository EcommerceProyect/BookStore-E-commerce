import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, getTotalProducts } from '../../redux/services/getAllProducts';
import Card from '../card/Card';

function Cards() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const itemsPerPage = 2;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // const handleGenreChange = (event) => {
  //   const genre = event.target.value;
  
  //   if (genre === "") {
  //     setSelectedGenre([]);
  //   } else if (!selectedGenre.includes(genre)) {
  //     setSelectedGenre([...selectedGenre, genre]);
  //   }

    const handleGenreChange = (event) => {
      const genre = event.target.value;
    
      if (!selectedGenre.includes(genre)) {
        setSelectedGenre([...selectedGenre, genre]);
      } else {
        setSelectedGenre(selectedGenre.filter((g) => g !== genre));
      }
    
      setCurrentPage(0);
    };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        let total = 0;
        if (selectedGenre) {
          await dispatch(getProducts(currentPage, selectedGenre));
          total = await getTotalProducts(selectedGenre);
        } else {
          await dispatch(getProducts(currentPage));
          const response = await dispatch(getProducts(currentPage));
          total = response.data.length;
        }
        setTotalItems(total);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
  
    fetchData();
  }, [dispatch, currentPage, selectedGenre]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
            <div>
        <label>
          <input
            type="checkbox"
            value="Aventura"
            checked={selectedGenre.includes("Aventura")}
            onChange={handleGenreChange}
          />
          Aventura
        </label>
        <label>
          <input
            type="checkbox"
            value="ciencia%20ficción"
            checked={selectedGenre.includes("ciencia%20ficción")}
            onChange={handleGenreChange}
          />
          Ciencia Ficción
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 justify-items-center">
        {list.map((product) => (
          <div key={product.id} className="p-4">
            <Card
              id={product.id}
              image={product.image || 'Imagen no disponible'}
              title={product.title || 'Título no disponible'}
              Genres={product.Genres || 'Género no disponible'}
              Authors={product.Authors || 'Autor no disponible'}
              price={product.price || 'Precio no disponible'}
            />
          </div>
        ))}
      </div>
      <nav className="flex justify-center p-5" aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-sm">
          <li>
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, i) => (
            <li key={i}>
              <button
                onClick={() => setCurrentPage(i)}
                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
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
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Cards;
