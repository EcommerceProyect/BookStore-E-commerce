import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Logo from '../../assets/images/Logo.svg';

import auth0 from 'auth0-js';

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
import LoginAuth from '../Auth/LoginAuth';
import RegisterAuth from '../Auth/RegisterAuth';

const Navbar = ({ openLoginModal, openRegistrationModal }) => {
  const { cartCount } = useSelector((state) => state.products);

  //Auth modularizarlo si es necesario
  
  
  const handleLoginAuth = async () => {

    const domain = "dev-s3pcs1ovog464bay.us.auth0.com";

    const audience = 'https://www.protectAPI.com';

    const scope = 'admin:edit';
    const clientId = 'V1mOd1KV60WmMBdH9Lgw8vWWCEH7koDY';

    const response_type = "code";
    const redirectUri = "https://bookstore-e-commerce-z27y.onrender.com/";
    // const redirectUri = "http://localhost:5173/";
    const response = await fetch(
      `https://${domain}/authorize?` +
        `audience=${audience}&` +
        `scope=${scope}&` +
        `response_type=${response_type}&` +
        `client_id=${clientId}&` +
        `redirect_uri=${redirectUri}`,
      {
        redirect: 'manual',
      },
    );

    window.location.href = response.url;
  };
  const handleRegisterAuth = async () => {

    const domain = "dev-s3pcs1ovog464bay.us.auth0.com";

    const audience = 'https://www.protectAPI.com';

    const scope = 'admin:edit';
    const clientId = 'V1mOd1KV60WmMBdH9Lgw8vWWCEH7koDY';

    const response_type = "code";
    const redirectUri = "https://bookstore-e-commerce-z27y.onrender.com/redirect";
    // const redirectUri = "http://localhost:5173/redirect";
    const response = await fetch(
      `https://${domain}/authorize?` +
        `audience=${audience}&` +
        `scope=${scope}&` +
        `response_type=${response_type}&` +
        `client_id=${clientId}&` +
        `redirect_uri=${redirectUri}`,
      {
        redirect: 'manual',
      },
    );

    window.location.href = response.url;
  };

  const handleLogout = () => {
    const auth0Domain = "dev-s3pcs1ovog464bay.us.auth0.com";
    const auth0ClientId = "V1mOd1KV60WmMBdH9Lgw8vWWCEH7koDY";
    const auth0ReturnTo = "https://bookstore-e-commerce-z27y.onrender.com/";
    // const auth0ReturnTo = "http://localhost:5173/";
  
    localStorage.clear();
    const webAuth = new auth0.WebAuth({
      domain: auth0Domain,
      clientID: auth0ClientId,
    });

    webAuth.logout({
      returnTo: auth0ReturnTo,
      clientID: auth0ClientId,
    });
  };

  return (
    <nav className=" bg-primary p-3">
      <div className="flex items-center justify-between gap-2">
        <div title="Home" className="left-0">
          <img src={Logo} alt="Logo" className="ml-10" />
        </div>
       
        <div className="flex items-center justify-between gap-2 pl-10 mr-5">
          {/* auth */}

          <div>
            <LoginAuth />
          </div>

          <div title="Register Auth">
            <Button
              onClick={handleRegisterAuth}
              icon={<MdAppRegistration className="text-textLight" size={20} />}
            />
          </div>

          <div title="Login Auth">
            <Button
              onClick={handleLoginAuth}
              icon={<MdOutlineLogin className="text-textLight" size={20} />}
            />
          </div>

          <div title="Logout Auth">
            <Button
              onClick={handleLogout}
              icon={<MdOutlineLogout className="text-textLight" size={20} />}
            />
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
              link="#"
              icon={<MdOutlineLogout className="text-textLight" size={25} />}
            />
          </div>
          <SearchButton />
        </div>
      </div>
    </nav>

    // auth
  );
};

export default Navbar;
