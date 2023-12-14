import React from 'react'
// components
import SearchButton from '../searchButton/SearchButton'

// icons
import Button from '../linkButtons/LinkButtons'
import { LiaShoppingBagSolid } from 'react-icons/lia'
import {
  MdOutlineLogin,
  MdOutlineLogout,
  MdPersonOutline,
  MdPersonAddAlt1,
} from 'react-icons/md'

const Navbar = () => {
  return (
    <nav className=" bg-primary p-3">
      <h1 className="w-28 m-auto py-5">Besto-logo</h1>
      <div className="flex items-center justify-between gap-2">
        <SearchButton />

        <div className="flex items-center justify-between gap-2 pl-10 ml-10">
          <Button
            link="/login"
            icon={<MdOutlineLogin color="black" size={20} />}
            text="Iniciar Sesión"
          />

          <Button
            link="#"
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
    </nav>
  )
}

export default Navbar
