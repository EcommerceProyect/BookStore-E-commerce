import React from 'react';
import SearchButton from '../searchButton/SearchButton';
import Button from '../linkButtons/LinkButtons';
import { LiaShoppingBagSolid } from 'react-icons/lia';
import {
  MdOutlineLogin,
  MdOutlineLogout,
  MdPersonOutline,
  MdPersonAddAlt1,
} from 'react-icons/md';

const Navbar = ({ openLoginModal, openRegistrationModal }) => {
  return (
    <nav className="bg-primary p-3">
      <h1 className="w-28 m-auto py-5 text-textLight">Besto-logo</h1>
      <div className="flex items-center justify-between gap-2">
        <SearchButton />

        <div className="flex items-center justify-between gap-2 pl-10 ml-10">
          <Button
            onClick={openLoginModal}
            icon={<MdOutlineLogin className="text-textLight" size={20} />}
            text="Iniciar Sesión"
          />

          <Button
            onClick={openRegistrationModal}
            icon={<MdPersonAddAlt1 className="text-textLight" size={20} />}
            text="Registrarse"
          />

          <Button
            icon={<MdPersonOutline className="text-textLight" size={20} />}
            text="Perfil"
          />

          <Button
            icon={<LiaShoppingBagSolid className="text-textLight" size={20} />}
            text="Carrito de compras"
          />

          <Button
            icon={<MdOutlineLogout className="text-textLight" size={20} />}
            text="Cerrar sesión"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
