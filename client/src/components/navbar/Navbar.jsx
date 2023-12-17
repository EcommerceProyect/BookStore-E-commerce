import React from 'react';
// components
import SearchButton from '../searchButton/SearchButton';

// icons
import Button from '../linkButtons/LinkButtons';
import { LiaShoppingBagSolid } from 'react-icons/lia';
import {
  MdOutlineLogin,
  MdOutlineLogout,
  MdPersonOutline,
  MdPersonAddAlt1,
} from 'react-icons/md';

const Navbar = () => {
  return (
    <div>
    <nav className="flex items-center justify-between gap-2">
      <input type="search" placeholder="Search..." />
      <Button
        link="/login"
        icon={<MdOutlineLogin color="black" size={25} />}
        text="Iniciar Sesion"
      />

          <Button
            link="#"
            icon={<LiaShoppingBagSolid color="black" size={20} />}
            text="Carrito de compras"
          />

          <Button
            link="#"
            icon={<MdOutlineLogout color="black" size={20} />}
            text="Cerrar sesión"
          />
    </nav>
    </div>
  );
};

export default Navbar;
