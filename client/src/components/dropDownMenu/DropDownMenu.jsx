import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// icons
import { MdMenu, MdOutlineClose } from 'react-icons/md'
import { FaUsers, FaQuestion } from 'react-icons/fa'

const DropDownMenu = () => {
  const [openMenu, setOpenMenu] = useState(false)

  const handleMenuClick = () => {
    setOpenMenu(!openMenu)
  }

  return (
    <div
      className={`bg-green-200 absolute transition-all duration-100 ease-in-out z-50  ${
        openMenu ? 'h-screen w-80' : ' w-0 '
      }`}
    >
      <button
        onClick={handleMenuClick}
        className={`bg-green-200 flex absolute top-24 mx-3 my-2 p-2  ${
          openMenu ? 'border-none' : 'border-2 border-black rounded-full'
        }`}
      >
        {openMenu ? <MdOutlineClose size={20} /> : <MdMenu size={20} />}
      </button>
      {openMenu ? (
        <ul className={`py-2 `}>
          <div>
            <Link
              className={`flex items-center  absolute  duration-300 ${
                openMenu ? 'ml-10 my-3 top-36' : ''
              }`}
            >
              <FaUsers
                size={35}
                className="p-1 border-2 border-black rounded-full"
              />
              <li
                className={`text-sm ml-2 my-1 pl-2 pr-7 border-2 border-black rounded-md w-40 `}
              >
                Quienes somos
              </li>
            </Link>
          </div>
          <Link className="flex items-center ml-10 my-3 absolute top-48 ">
            <FaQuestion
              size={33}
              className="p-1 border-2 border-black rounded-full"
            />
            <li
              className={`text-sm ml-2 my-1 pl-2 pr-7 border-2 border-black rounded-md w-48 `}
            >
              Preguntas frecuentes
            </li>
          </Link>
        </ul>
      ) : null}
    </div>
  )
}

export default DropDownMenu
