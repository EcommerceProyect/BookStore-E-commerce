import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ link, text, icon }) => {
  return (
    <Link to={link} className="flex flex-col items-center ">
      <button className="flex flex-col items-center px-3 py-2 rounded-md duration-200 hover:bg-slate-400 active:transform active:translate-y-1 ">
        {icon}
        <span className="text-black">{text}</span>
      </button>
    </Link>
  );
};

export default Button;
