import React, { useState } from 'react';

const Filterts = () => {
  const [check, setCheck] = useState('');

  const gens = ['Aventura', 'Accion', 'Misterio', 'Sic-fi', 'Romance'];

  const handleCheckBox = (event) => {
    setCheck(event.target.value);
  };

  return (
    <div className="bg-slate-500 flex flex-col h-screen w-56">
      <span className="m-2 pt-2">Filtra tu búsqueda</span>
      <div className="border-t border-gray-300 pt-2 mx-4 my-2 w-48"></div>
      <span className="m-2">Genero</span>
      <ul className="border-t border-gray-300 pt-2 mx-4 my-2 w-48">
        {gens.map((item, index) => (
          <div key={index}>
            <input value={item} type="checkbox" onChange={handleCheckBox} />
            <label> {item}</label>
          </div>
        ))}
      </ul>
      <span className="m-2">Autores</span>
      <div className="border-t border-gray-300 pt-2 mx-4 my-2 w-48"></div>
    </div>
  );
};

export default Filterts;
