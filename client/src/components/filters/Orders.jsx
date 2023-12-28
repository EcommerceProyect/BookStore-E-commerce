import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOrderOption } from '../../redux/slices/products';
import Select from 'react-select';

const Orders = () => {
  const dispatch = useDispatch();
  // const { orderOption } = useSelector((state) => state.products);

  const options = [
    { value: 'asc', label: 'Nombre A - Z' },
    { value: 'desc', label: 'Nombre Z - A' },
    { value: 'lowtohigh', label: 'Precio menor a mayor' },
    { value: 'hightolow', label: 'Precio mayor a menor' },
    { value: 'Reciente', label: 'Más reciente' },
  ];

  const handleSelect = (selectedOption) => {
    dispatch(setOrderOption(selectedOption ? selectedOption.value : null));
  };

  return (
    <div className="flex items-center relative justify-center p-3 m-3">
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
