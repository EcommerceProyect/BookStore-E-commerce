import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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

const Navbar = ({ openLoginModal, openRegistrationModal }) => {
  const { cartCount } = useSelector((state) => state.products);

  return (
    <nav className=" bg-primary p-3">
      <h1 className="w-28 m-auto py-5">Besto-logo</h1>
      <div className="flex items-center justify-between gap-2">
        <SearchButton />

        <div className="flex items-center justify-between gap-2">
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
            link="/carrito"
            icon={<LiaShoppingBagSolid color="black" size={20} />}
            counter={cartCount}
            text="Carrito de compras"
          />

          <Button
            link="#"
            icon={<MdOutlineLogout color="black" size={20} />}
            text="Cerrar sesión"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
