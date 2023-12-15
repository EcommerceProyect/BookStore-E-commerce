import React, { useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';

const SearchButton = () => {
  const [search, setSearch] = useState(false);

  const handleSearchClick = () => {
    setSearch(!search);
  };

  return (
    <div className="flex items-center ml-auto">
      <div
        className={`transition-all duration-500 overflow-hidden origin-right ${
          search ? 'w-48' : 'w-0 ml-0'
        } `}
      >
        {search ? (
          <input
            type="search"
            placeholder=" Buscar..."
            className="rounded-md border border-black mx-1 p-0 bg-transparent"
          />
        ) : null}
      </div>

      <button
        onClick={handleSearchClick}
        className="ml-1 duration-75 p-2 rounded-full hover:bg-slate-400"
      >
        <FaMagnifyingGlass color="black" />
      </button>
    </div>
  );
};

export default SearchButton;
