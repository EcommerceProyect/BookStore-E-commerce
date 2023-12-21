import React, { useState } from 'react';
import Logo from '../../assets/images/Logo.svg';
// components
// import SearchButton from '../searchButton/SearchButton';

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
  return (
    <nav className=" bg-primary p-3">
      <div className="flex items-center justify-between gap-2">
        {/* <SearchButton /> */}
        <div title="Home" className="left-0">
          <img src={Logo} alt="Logo" className="ml-10" />
        </div>

        <div className="flex items-center justify-between gap-2 pl-10 mr-5">
          <div title="Iniciar Sesión">
            <Button
              onClick={openLoginModal}
              icon={<MdOutlineLogin color="white" size={20} />}
            />
          </div>

          <div title="Registrarse">
            <Button
              onClick={openRegistrationModal}
              // link="#"
              icon={<MdPersonAddAlt1 color="white" size={20} />}
            />
          </div>
          <div title="Perfil">
            <Button
              link="#"
              icon={<MdPersonOutline color="white" size={20} />}
            />
          </div>
          <div title="Carrito">
            <Button
              link="#"
              icon={<LiaShoppingBagSolid color="white" size={20} />}
            />
          </div>
          <div title="Cerrar Sesión">
            <Button
              link="#"
              icon={<MdOutlineLogout color="white" size={20} />}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
