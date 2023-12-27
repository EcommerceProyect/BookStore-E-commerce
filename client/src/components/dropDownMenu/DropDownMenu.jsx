import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DropDownItems from './DropDownItems';

// icons
import { MdMenu, MdOutlineClose } from 'react-icons/md';
import { FaUsers, FaQuestion } from 'react-icons/fa';

const DropDownMenu = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuClick = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <aside
      className={`flex flex-col bg-white absolute z-50 duration-300 ease-in-out ${
        openMenu ? 'h-screen w-64' : 'w-0 h-screen'
      }`}
    >
      <button onClick={handleMenuClick} className="relative top-24 mx-4">
        {openMenu ? (
          <MdOutlineClose color="black" size={35} className="p-1" />
        ) : (
          <MdMenu
            size={35}
            color="black"
            className="rounded-full p-1 hover:bg-accents duration-150"
          />
        )}
      </button>
      {openMenu ? (
        <ul className="mt-28">
          <div className="flex flex-col items-center mr-10 overflow-hidden">
            <Link>
              <DropDownItems
                icon={
                  <FaUsers
                    size={35}
                    color="black"
                    className="p-1 border-2 border-black rounded-full"
                  />
                }
                text="Quienes somos"
              />
            </Link>
          </div>

          <div className="flex flex-col items-center mr-10 overflow-hidden">
            <Link>
              <DropDownItems
                icon={
                  <FaQuestion
                    size={35}
                    color="black"
                    className="p-1 border-2 border-black rounded-full"
                  />
                }
                text="Preguntas frecuentes"
              />
            </Link>
          </div>
        </ul>
      ) : null}
    </aside>
  );
};

export default DropDownMenu;
