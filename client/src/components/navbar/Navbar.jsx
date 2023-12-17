import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import Filterts from '../filters/Filterts';

const Navbar = ({ openLoginModal, openRegistrationModal }) => {
  return (
    <nav className="bg-primary p-3 sticky top-0 z-20">
      <Link to="/">
        <h1 className="w-28 m-auto py-5">Besto-logo</h1>
      </Link>
      <div className="flex items-center justify-between">
        <SearchButton />

        <div className="flex items-center justify-between gap-2 ml-2">
          <Button
            onClick={openLoginModal}
            // link="/login"
            icon={<MdOutlineLogin color="black" size={20} />}
            text="Iniciar Sesión"
          />

          <Button
            onClick={openRegistrationModal}
            // link="#"
            icon={<MdPersonAddAlt1 color="black" size={20} />}
            text="Registrarse"
          />

          <Button
            link="#"
            icon={<MdPersonOutline color="black" size={20} />}
            text="Perfil"
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
        </div>
      </div>
      <Filterts />
    </nav>
  );
};

export default Navbar;
