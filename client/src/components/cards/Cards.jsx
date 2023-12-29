import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/services/getAllProducts';
import Card from '../card/Card';
import GenreFilter from './filters/genres';
import AuthorFilter from './filters/Authors';
import EditorialFilter from './filters/Editorial';
import SortingComponent from './sort/Sort';


function Cards() {
  const dispatch = useDispatch();

  const { list, loading, error, orderOption } = useSelector(
    (state) => state.products,
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const selectedGenre = useSelector((state) => state.genres && state.genres.selectedGenre);
  const selectedAuthor = useSelector((state) => state.authors && state.authors.selectedAuthor);
  const selectedEditorial = useSelector((state) => state.editorial.selectedEditorial);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const totalItemsFromState = useSelector((state) => state.products.totalItems);
  const [sortField, setSortField] = useState(null);
  const [sortAction, setSortAction] = useState(null);


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

  const handleSorting = (option) => {
  let [field, action] = option.split('_');
  setSortField(field);
  setSortAction(action);

    if (sortField && sortAction) {
  
      dispatch(getProducts(currentPage, sortField, sortAction));
    }
  };

  useEffect(() => {
    setTotalItems(totalItemsFromState);
  }, [totalItemsFromState]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        let total = 0;
        let filters = {};

        console.log('Selected Genre fetchData:', selectedGenre);

        if (selectedGenre && selectedGenre.length > 0) {
          filters = { ...filters, genre: selectedGenre };
        }


        if (selectedAuthor && selectedAuthor.length > 0) {
          filters = { ...filters, author: selectedAuthor };
        }


        if (selectedEditorial && selectedEditorial.length > 0) {
          filters = { ...filters, editorial: selectedEditorial };
        }



        await dispatch(getProducts(currentPage, sortField, sortAction));
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();
  }, [dispatch, currentPage, selectedAuthor, selectedEditorial, selectedGenre, sortField, sortAction]);


  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(list)
  return (
    <div className="flex">
      <div className='absolute m-4 right-4'>
      <SortingComponent handleSorting={handleSorting}/>
      </div>
   
      <div className=" w-1/4 p-4">
        <div>
          <GenreFilter
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <div>
          <AuthorFilter
            selectedAuthor={selectedAuthor}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <div>
          <EditorialFilter
            selectedEditorial={selectedEditorial}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
      <div className=" mt-20 w-3/4 p-4">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (<div>Error: {error}</div>) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 justify-items-center">
          {Array.isArray(list) && list.map((product) => (
  <div key={product.id} className="p-4">
    <Card
      id={product.id}
      image={product.image || 'Imagen no disponible'}
      title={product.title || 'Título no disponible'}
      Genres={product.Genres || 'Género no disponible'}
      Authors={product.Authors || 'Autor no disponible'}
      price={product.price || 'Precio no disponible'}
      ISBN={product.ISBN}
    />
  </div>
))}
        </div>)}
        <nav className="flex justify-center p-5" aria-label="Page navigation example">
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
                onClick={() => setCurrentPage(i)}
                className={`flex items-center justify-center px-3 h-8 leading-tight text-textGray bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === i ? 'text-blue-600 bg-blue-50' : ''
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
    </div>
  );
  
}

export default Cards;