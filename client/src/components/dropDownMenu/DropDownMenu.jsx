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
      className={`bg-green-200 absolute z-50 duration-300 ${
        openMenu ? 'h-screen w-64' : 'w-0 h-screen'
      }`}
    >
      <div>
        <button onClick={handleMenuClick} className="relative top-24 mx-4">
          {openMenu ? (
            <MdOutlineClose color="black" size={30} />
          ) : (
            <MdMenu
              size={30}
              color="black"
              className="bg-white bg-opacity-50 border border-solid border-black rounded-sm"
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
      </div>
    </aside>
  );
};

export default DropDownMenu;
