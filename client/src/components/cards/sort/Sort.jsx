import React, { useState } from 'react';

const SortingComponent = ({ handleSorting }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSort = (option) => {
    setSelectedOption(option);
    handleSorting(option);
  };

  return (
    <div>
      <label className=' pr-4 dark:text-textLight'>Ordenar por:</label>
      <select className='dark:bg-gray-900/20 dark:border-none dark:text-textLight' value={selectedOption} onChange={(e) => handleSort(e.target.value)}>
        <option className='dark:text-textDark' value="">Seleccionar</option>
        <option className='dark:text-textDark' value="title_ASC">Orden alfabético (A-Z)</option>
        <option className='dark:text-textDark' value="title_DESC">Orden alfabético (Z-A)</option>
        <option className='dark:text-textDark' value="price_ASC">Precio (ascendente)</option>
        <option className='dark:text-textDark' value="price_DESC">Precio (descendente)</option>
        <option className='dark:text-textDark' value="date_ASC">Fecha de publicación (ascendente)</option>
        <option className='dark:text-textDark' value="date_DESC">Fecha de publicación (descendente)</option>
      </select>
    </div>
  );
};

export default SortingComponent;