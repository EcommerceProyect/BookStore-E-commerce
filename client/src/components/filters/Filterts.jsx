import React from 'react';

const Filterts = () => {
  return (
    <div className="bg-slate-500 flex flex-col h-screen w-56">
      <span className="m-2 pt-2">Filtra tu búsqueda</span>
      <div className="border-t border-gray-300 pt-2 mx-4 my-2 w-48"></div>
      <span className="m-2">Genero</span>
      <ul className="border-t border-gray-300 pt-2 mx-4 my-2 w-48">
        <li>
          <label>
            <input type="checkbox" />
            Terror
          </label>
        </li>
      </ul>
      <span className="m-2">Autores</span>
      <div className="border-t border-gray-300 pt-2 mx-4 my-2 w-48"></div>
    </div>
  );
};

export default Filterts;
