import { Link } from 'react-router-dom';
import React from 'react';

const Button = ({ link, text, icon, onClick, counter }) => {
  return (
    <Link onClick={onClick} to={link} className="flex flex-col items-center">
      <button className="flex items-center p-2 rounded-md hover:bg-accents hover:duration-150 active:translate-y-1 active:transform">
        {icon}
        <span className="text-textLight">{counter}</span>
        <span className="text-black">{text}</span>
      </button>
    </Link>
  );
};

export default Button;
