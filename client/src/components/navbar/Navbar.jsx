import React from 'react';
import { useSelector } from 'react-redux';
import Logo from '../../assets/images/Logo.svg';

// import SearchButton from '../searchButton/SearchButton';
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
      <div className="flex items-center justify-between gap-2">
        {/* <SearchButton /> */}
        <div title="Home" className="left-0">
          <img src={Logo} alt="Logo" className="ml-10" />
        </div>

        <div className="flex items-center justify-between gap-2 pl-10 mr-5">
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
              counter={cartCount}
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
