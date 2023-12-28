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
        className={`transition-all duration-300 overflow-hidden ${
          search ? 'w-52' : 'w-0'
        } `}
      >
        {search ? (
          <input
            type="search"
            placeholder=" Buscar..."
            className="rounded-md border border-black mx-1 py-1 px-2 bg-textLight "
          />
        ) : null}
      </div>

      <button
        onClick={handleSearchClick}
        className="ml-1 text-textLight p-3 rounded-full hover:bg-accents hover:duration-150"
      >
        <FaMagnifyingGlass />
      </button>
    </div>
  );
};

export default SearchButton;
