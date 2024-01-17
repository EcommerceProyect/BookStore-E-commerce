import React, { useEffect, useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { setBooksByTitle, setCurrentPage } from '../../redux/slices/products';
import { useDispatch } from 'react-redux';
import { useNavigate,useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getProducts } from '../../redux/services/getAllProducts';
import { Toaster, toast } from 'sonner';

const SearchButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { booksByTitle } = useSelector((state) => state.products);
  const { list } = useSelector((state) => state.products);


  

  const handleSearchClick = (event) => {
    event.preventDefault();
    const searchTerm = event.target[0].value;

    dispatch(setBooksByTitle(searchTerm));
    navigate('/products');
    if (list && list.length > 0) {
      toast('No se han encontrado resultados');
    }
  };

  useEffect(() => {
    dispatch(getProducts(0)); //página inicial 0
    dispatch(setCurrentPage(0));

  }, [booksByTitle]);


  useEffect(() => {

    if(location.pathname !== "/products"){
      console.log(location.pathname);
      dispatch(setBooksByTitle(""));
    }

  },[location.pathname])

  return (
    <form onSubmit={handleSearchClick} className="flex items-center ml-auto">
      <div className={'w-52'}>
        <input
          type="search"
          placeholder=" Buscar..."
          className="rounded-md border border-black mx-1 py-1 px-2 bg-textLight "
        />
      </div>

      <div>
        <button
          type="submit"
          className="ml-1 text-textLight p-3 rounded-full hover:bg-accents hover:duration-150"
        >
          <FaMagnifyingGlass />
        </button>
      </div>
      <Toaster richColors duration={1500} closeButton={false} visibleToasts={1} />
    </form>
  );
};

export default SearchButton;
