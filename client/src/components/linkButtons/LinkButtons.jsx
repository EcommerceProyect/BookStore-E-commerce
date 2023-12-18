import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ link, text, icon, onClick }) => {
  return (
    <Link
      onClick={onClick}
      to={link}
      className="flex flex-col items-center rounded-md hover:bg-slate-400 duration-200"
    >
      <button className="flex flex-col items-center p-2 active:transform active:translate-y-1 ">
        {icon}
        <span className="text-black">{text}</span>
      </button>
    </Link>
  );
};

export default Button;
