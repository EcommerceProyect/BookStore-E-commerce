import React from 'react';

const Filterts = () => {
  return (
    <div className="flex items-center justify-between">
      <select>
        <option value="">Categoría</option>
      </select>
      <select>
        <option value="">Autor</option>
      </select>
      <select>
        <option value="">Ordenamiento</option>
      </select>
    </div>
  );
};

export default Filterts;
