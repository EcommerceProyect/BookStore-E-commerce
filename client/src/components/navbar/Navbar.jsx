import React from 'react'
import Button from '../linkButtons/LinkButtons'
import { MdOutlineLogin, MdOutlineShoppingCart } from 'react-icons/md'

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between gap-2">
      <input type="search" placeholder="Search..." />
      <Button
        link="#"
        icon={<MdOutlineLogin color="black" size={25} />}
        text="Iniciar Sesion"
      />

      <Button
        link="#"
        icon={<MdOutlineShoppingCart color="black" size={25} />}
        text="Carrito de compras"
      />
    </nav>
  )
}

export default Navbar
