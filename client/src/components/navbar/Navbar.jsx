import React, { useState } from 'react';
import { useSelector} from 'react-redux';
import { useEffect } from 'react';
import Logo from '../../assets/images/Logo.svg';

import SearchButton from '../searchButton/SearchButton';
import Button from '../linkButtons/LinkButtons';
import { LiaShoppingBagSolid } from 'react-icons/lia';
import { FaBook } from "react-icons/fa";
import {
  MdOutlineLogin,
  MdOutlineLogout,
  MdPersonOutline,
  MdPersonAddAlt1,
  MdAppRegistration,
  MdDashboard
} from 'react-icons/md';

import AuthLogin from '../Auth/auth0Login';
import LoginAuth from '../Auth/LoginAuth';
import RegisterAuth from '../Auth/RegisterAuth';
import handleLogout from '../Auth/handleLogout';
import { Link } from 'react-router-dom';

const Navbar = ({ openLoginModal, openRegistrationModal }) => {
  const { cartCount } = useSelector((state) => state.products);
  const userData = useSelector((state) => state.userData.userData);

const [admin, setAdmin] = useState(userData && userData.scope === "user:edit admin:edit");



  useEffect(() => {
    if (userData && userData.scope === "user:edit admin:edit") {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, [userData]);



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
            link="#"
            icon={<MdPersonOutline className="text-textLight" size={25} />}
          />
        </div>
        )}

          <div title="Carrito">
            <Button
              link="/carrito"
              counter={cartCount === 0 ? null : cartCount}
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
              <SearchButton/>
        </div>
      </div>
    </nav>

    // auth
  );
};

export default Navbar;
