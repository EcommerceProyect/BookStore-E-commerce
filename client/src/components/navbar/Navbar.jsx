import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Logo from '../../assets/images/Logo.svg';
import { Link } from 'react-router-dom';

import SearchButton from '../searchButton/SearchButton';
import Button from '../linkButtons/LinkButtons';
import { LiaShoppingBagSolid } from 'react-icons/lia';
import {
  MdOutlineLogin,
  MdOutlineLogout,
  MdPersonOutline,
  MdPersonAddAlt1,
  MdAppRegistration,
} from 'react-icons/md';

import AuthLogin from '../Auth/auth0Login';
import LoginAuth from '../Auth/LoginAuth';
import RegisterAuth from '../Auth/RegisterAuth';
import handleLogout from '../Auth/handleLogout';

const Navbar = ({ openLoginModal, openRegistrationModal }) => {
  const { cartCount } = useSelector((state) => state.products);

  //Auth modularizarlo si es necesario

  return (
    <nav className=" bg-primary p-3">
      <div className="flex items-center justify-between gap-2">
        <Link to="/">
          <div title="Home" className="left-0">
            <img src={Logo} alt="Logo" className="ml-10" />
          </div>
        </Link>

        <div className="flex items-center justify-between gap-2 pl-10 mr-5">
          {/* auth */}

          <div>
            <LoginAuth />
          </div>

          {/* auth */}
          <div title="Iniciar Sesión">
            <Button
              onClick={openLoginModal}
              icon={<MdOutlineLogin className="text-textLight" size={25} />}
            />
          </div>

          <div title="Registrarse">
            <Button
              onClick={openRegistrationModal}
              // link="#"
              icon={<MdPersonAddAlt1 className="text-textLight" size={25} />}
            />
          </div>
          <div title="Perfil">
            <Button
              link="#"
              icon={<MdPersonOutline className="text-textLight" size={25} />}
            />
          </div>
          <div title="Carrito">
            <Button
              link="/carrito"
              counter={cartCount === 0 ? null : cartCount}
              icon={
                <LiaShoppingBagSolid className="text-textLight" size={25} />
              }
            />
          </div>
          <div title="Cerrar Sesión">
            <Button
              onClick={handleLogout}
              icon={<MdOutlineLogout className="text-textLight" size={25} />}
            />
          </div>
              <SearchButton/>
        </div>
      </div>
    </nav>

    // auth
  );
};

export default Navbar;
