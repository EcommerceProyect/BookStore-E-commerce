import { Link } from 'react-router-dom';
import React from 'react';

const Button = ({ link, text, icon }) => {
  return (
    <Link to={link} className="flex flex-col items-center">
      <button className="flex flex-col items-center px-3 py-2 focus:ring active:transform active:translate-y-1 ">
        {icon}
        <span className="text-black">{text}</span>
      </button>
    </Link>
  );
};

export default Button;
