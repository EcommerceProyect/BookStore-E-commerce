import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Logo from '../../assets/images/Logo.svg';
import { Link } from 'react-router-dom';
import SearchButton from '../searchButton/SearchButton';
import Button from '../linkButtons/LinkButtons';
import { LiaShoppingBagSolid } from 'react-icons/lia';
import { FaBook } from 'react-icons/fa';
import {
  MdOutlineLogin,
  MdOutlineLogout,
  MdPersonOutline,
  MdPersonAddAlt1,
  MdAppRegistration,
  MdDashboard,
} from 'react-icons/md';

import AuthLogin from '../Auth/auth0Login';
import LoginAuth from '../Auth/LoginAuth';
import RegisterAuth from '../Auth/RegisterAuth';
import handleLogout from '../Auth/handleLogout';
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";


const Navbar = ({ openLoginModal, openRegistrationModal }) => {
  const { cart } = useSelector((state) => state.products);
  const userData = useSelector((state) => state.userData?.userData);

  const [admin, setAdmin] = useState(
    userData && userData.scope === 'user:edit admin:edit',
  );

  useEffect(() => {
    if (userData && userData.response.role === 'admin') {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, [userData]);

  const [theme, setTheme] = useState("light")

  useEffect(() => {
    if (theme == "dark") {
      document.querySelector("html").classList.add('dark')
    } else {
      document.querySelector("html").classList.remove("dark")
    }
  }, [theme])

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
      if (storedTheme === 'dark') {
        document.querySelector('html').classList.add('dark');
      }
    }
  }, []);

  const handleChangeTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

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
          <div title="Productos">
            <Button
              link="products"
              icon={<FaBook className="text-textLight" size={25} />}
            />
          </div>

          {!userData && (
            <div title="Iniciar Sesión">
              <Button
                onClick={openLoginModal}
                icon={<MdOutlineLogin className="text-textLight" size={25} />}
              />
            </div>
          )}

          {!userData && (
            <div title="Registrarse">
              <Button
                onClick={openRegistrationModal}
                // link="#"
                icon={<MdPersonAddAlt1 className="text-textLight" size={25} />}
              />
            </div>
          )}

          {userData && (
            <div title="Perfil">
              <Button
                link="/profile"
                icon={<MdPersonOutline className="text-textLight" size={25} />}
              />
            </div>
          )}

          <div title="Carrito">
            <Button
              link="/carrito"
              counter={cart.length === 0 ? null : cart.length}
              icon={
                <LiaShoppingBagSolid className="text-textLight" size={25} />
              }
            />
          </div>
          {admin && (
            <div title="Panel de Administrador">
              <Button
                link="dashboard"
                icon={<MdDashboard className="text-textLight" size={25} />}
              />
            </div>
          )}
          {userData && (
            <div title="Cerrar Sesión">
              <Button
                onClick={handleLogout}
                icon={<MdOutlineLogout className="text-textLight" size={25} />}
              />
            </div>
          )}
          <SearchButton />
          {theme === 'dark' ? (
            <MdOutlineDarkMode title="Modo Oscuro" className='text-textLight cursor-pointer' size={25} onClick={handleChangeTheme} />
          ) : (
            <MdOutlineLightMode title="Modo Claro" className='text-textLight cursor-pointer' size={25} onClick={handleChangeTheme} />
          )}
        </div>
      </div>
    </nav>

    // auth
  );
};

export default Navbar;
