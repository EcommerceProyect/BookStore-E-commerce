import React, { useState } from 'react';
import Select from 'react-select';

const Orders = () => {
  const [value, setValue] = useState('');

  const options = [
    { value: 'AZ', label: 'Nombre A - Z' },
    { value: 'ZA', label: 'Nombre Z - A' },
    { value: 'MenorAMayor', label: 'Precio menor a mayor' },
    { value: 'MayorAMenor', label: 'Precio mayor a menor' },
    { value: 'Reciente', label: 'Más reciente' },
  ];

  const handleSelect = (value) => {
    setValue(value);
  };

  return (
    <div className="flex items-center justify-center p-3 m-3">
      <span className="mr-4">Ordernamiento:</span>
      <Select
        options={options}
        onChange={handleSelect}
        isSearchable={false}
        placeholder="Ordernar Por..."
      />
    </div>
  );
};

export default Orders;
