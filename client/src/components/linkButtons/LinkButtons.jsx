import { Link } from 'react-router-dom'
import React from 'react'

const Button = ({ link, text, icon, onClick }) => {
  return (
    <Link to={link} className="flex flex-col items-center">
      <button onClick={onClick} className="flex flex-col items-center p-2">{icon}</button>
      <span className="text-black">{text}</span>
    </Link>
  )
}

export default Button
