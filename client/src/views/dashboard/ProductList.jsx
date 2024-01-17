import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/services/getAllProducts';
import { setCurrentPage } from '../../redux/slices/products';
import GenreFilter from '../../components/cards/filters/Genres';
import AuthorFilter from '../../components/cards/filters/Authors';
import EditorialFilter from '../../components/cards/filters/Editorial';
import SortingComponent from '../../components/cards/sort/Sort';
import Dashboard from './Dashboard';
import ListChild from './ListChild';
import { MdAutoDelete, MdLibraryAdd } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import DeleteModal from './productModal/deleteModal';
import { deleteProduct } from '../../redux/services/deleteProduct';
import ActiveModal from './productModal/activeModal';
import { activeProduct } from '../../redux/services/activeProduct';

import { ITEMS_PER_PAGE } from "../../vars";

function ProductList() {
  const dispatch = useDispatch();

  const { list, loading, error, orderOption, currentPage } = useSelector(
    (state) => state.products,
  );

  const [totalItems, setTotalItems] = useState(0);

  const selectedGenre = useSelector(
    (state) => state.genres && state.genres.selectedGenre,
  );
  const selectedAuthor = useSelector(
    (state) => state.authors && state.authors.selectedAuthor,
  );
  const selectedEditorial = useSelector(
    (state) => state.editorial.selectedEditorial,
  );

  const itemsPerPage = ITEMS_PER_PAGE;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const totalItemsFromState = useSelector((state) => state.products.totalItems);
  const [sortField, setSortField] = useState(null);
  const [sortAction, setSortAction] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [showModalActive, setShowModalActive] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [activeProductId, setActiveProductId] = useState(null);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  
  const handleDelete  = (productId) => {
    setDeleteProductId(productId);
    setShowModal(true);
    console.log("id del producto: ", productId);
  };

  const handleConfirmDelete = async () => {
    if (deleteProductId) {
      await dispatch(deleteProduct(deleteProductId));
      await dispatch(getProducts());
      setShowModal(false);
      setActiveProductId(null);
    }
  };
  
  const handleCancelDelete = () => {
    setShowModal(false);
    setDeleteProductId(null);
  };

  const handleActive  = (productId) => {
    setActiveProductId(productId);
    setShowModalActive(true);
    console.log("id del producto: ", productId);
  };

  const handleConfirmActive = async () => {
    if (activeProductId) {
      await dispatch(activeProduct(activeProductId));
      await dispatch(getProducts());
      setShowModalActive(false);
      setActiveProductId(null);
    }
  };

  
  const handleCancelActive = () => {
    setShowModalActive(false);
    setActiveProductId(null);
  };
  
  const handlePrevPage = () => {
    if (currentPage > 0) {
      dispatch(setCurrentPage(currentPage - 1));
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

        if (selectedGenre && selectedGenre.length > 0) {
          filters = { ...filters, genre: selectedGenre };
        }

        if (selectedAuthor && selectedAuthor.length > 0) {
          filters = { ...filters, author: selectedAuthor };
        }

        if (selectedEditorial && selectedEditorial.length > 0) {
          filters = { ...filters, editorial: selectedEditorial };
        }

        await dispatch(getProducts(currentPage, sortField, sortAction, true));
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();
  }, [
    dispatch,
    currentPage,
    selectedAuthor,
    selectedEditorial,
    selectedGenre,
    sortField,
    sortAction,
    totalItemsFromState
  ]);

  if (error) {
    return <div>Error: {error}</div>;
  }


  const handleEdit = (id) =>{
    console.log(id)
  }

  return (
    <div className="flex">
      <Dashboard />
      <div className="absolute m-4 right-4">
        <SortingComponent handleSorting={handleSorting} />
      </div>
      <div className="flex">


      </div>
      <div className="w-1/4 p-4">
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
      <div className="flex">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:py-24 lg:px-8">
          <div className="w-usersWidthm bg-white rounded-lg border shadow-md dark:bg-gray-900/20 ">
            <div className="p-8 flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Libros Registrados
              </h3>

            </div>
            <div className="">
              <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
              <div className="p-4 flex justify-between items-center">
  <li className="py-3 sm:py-4 p-8 flex items-center space-x-4">
    <div className="cursor-pointer flex-1 text-center min-w-40 ">
      <p className="content text-sm font-medium text-gray-900 truncate dark:text-white min-w-40 text-center">
        Nombre
      </p>
    </div>
    <div className="flex-1 text-sm font-semibold text-gray-900 dark:text-white min-w-32 text-center ">
      ISBN
    </div>
    <div className="flex-1 text-sm font-semibold text-gray-900 dark:text-white text-center min-w-20">
      Precio
    </div>
    <div className="flex-1 text-sm font-semibold text-gray-900 dark:text-white text-center min-w-20">
      Stock
    </div>
  </li>
</div>
              </ul>
            </div>

            <hr className="w-full border-gray-300 dark:border-gray-700 mb-8" />



            <div className="flow-root">
              <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                {list.map((product) => (
                  <div key={product.id} className="p-4 flex justify-between items-center">
                    <div >
                      <ListChild
                        id={product.id}
                        title={product.title || 'Título no disponible'}
                        price={product.price || 'Precio no disponible'}
                        ISBN={product.ISBN.name}
                        stock={product.ISBN.stock}
                      />
                    </div>
                    <Link to={`/dashboard/editBook/${product.id}`}>
                    <FaRegEdit className="dark:text-textLight w-7 h-7"> 
                    onClick={() => handleEdit(product.id)}
                    
                    </FaRegEdit>
                    </Link>
                    {product.deletedAt !== null ? (<MdLibraryAdd  onClick={() => handleActive(product.id)}
                      className="dark:text-textLight w-7 h-7 cursor-pointer" />) : (
                    <MdAutoDelete
                      onClick={() => handleDelete(product.id)}
                      className="dark:text-textLight w-7 h-7 cursor-pointer"
                    />
                    )}
                  </div>
                ))}
              </ul>
            </div>
            <nav
              className="flex justify-center p-5"
              aria-label="Page navigation example"
            >
              <ul className="inline-flex -space-x-px text-sm">
                <li>
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 0}
                    className="dark:bg-gray-900/20 flex items-center justify-center px-3 h-8 ms-0 leading-tight text-textGray bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
                  <li key={i}>
                    <button
                      onClick={() => dispatch(setCurrentPage(i))}
                      className={`dark:bg-gray-900/20 flex items-center justify-center px-3 h-8 leading-tight text-textGray bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === i ? 'text-blue-600 bg-blue-50' : ''
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
                    className="dark:bg-gray-900/20 flex items-center justify-center px-3 h-8 leading-tight text-textGray bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
            
          </div>
        </div>
      </div>
      <DeleteModal isOpen={showModal} onCancel={handleCancelDelete} onConfirm={handleConfirmDelete}/>
                <ActiveModal isOpen={showModalActive} onCancel={handleCancelActive} onConfirm={handleConfirmActive}/>
    </div>
  );
}

export default ProductList;
