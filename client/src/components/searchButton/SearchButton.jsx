import React, { useState } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'

const SearchButton = () => {
  const [search, setSearch] = useState(false)

  const handleSearchClick = () => {
    setSearch(!search)
  }

  return (
    <div className="flex items-center ml-auto">
      <div className="relative">
        {search ? (
          <input
            type="search"
            placeholder=" Buscar..."
            className="rounded-md border border-black mx-1 bg-transparent"
          />
        ) : null}
      </div>

      <button onClick={handleSearchClick} className="ml-1">
        <FaMagnifyingGlass />
      </button>
    </div>
  )
}

export default SearchButton
