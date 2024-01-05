import React, { useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { getProductsForSearch } from '../../redux/services/getProductsForSearch';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const SearchButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSearchClick = (event) => {
    event.preventDefault();
    const searchTerm = event.target[0].value;

    dispatch(getProductsForSearch(searchTerm));
    navigate("/products")
  };

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
     
    </form> 
    
  );
};

export default SearchButton;
