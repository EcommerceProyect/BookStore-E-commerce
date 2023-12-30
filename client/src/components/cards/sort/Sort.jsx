import React, { useState } from 'react';

const SortingComponent = ({ handleSorting }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSort = (option) => {
    setSelectedOption(option);
    handleSorting(option);
  };

  return (
    <div>
      <label>Ordenar por:</label>
      <select value={selectedOption} onChange={(e) => handleSort(e.target.value)}>
        <option value="">Seleccionar</option>
        <option value="title_ASC">Orden alfabético (A-Z)</option>
        <option value="title_DESC">Orden alfabético (Z-A)</option>
        <option value="price_ASC">Precio (ascendente)</option>
        <option value="price_DESC">Precio (descendente)</option>
        <option value="date_ASC">Fecha de publicación (ascendente)</option>
        <option value="date_DESC">Fecha de publicación (descendente)</option>
      </select>
    </div>
  );
};

export default SortingComponent;