import { Link } from 'react-router-dom';
import React from 'react';

const Button = ({ link, text, icon, onClick, counter }) => {
  return (
    <Link onClick={onClick} to={link} className="flex flex-col items-center">
      <button className="flex items-center p-2 rounded-md hover:bg-accents hover:duration-150 active:translate-y-1 active:transform">
        {icon}
        <span className="text-black">{text}</span>
      </button>
      <div className="absolute flex items-center justify-center top-12 w-4 transform translate-x-1/2 -translate-y-1/2">
        <span className="flex justify-center items-center text-textDark bg-textLight rounded-full w-6 text-xs">
          {counter}
        </span>
      </div>
    </Link>
  );
};

export default Button;
