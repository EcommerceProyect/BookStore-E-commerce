import React from 'react';
import Cards from '../../components/cards/Cards';
import Filterts from '../../components/filters/Filterts';
import Orders from '../../components/filters/Orders';

const Home = () => {
  return (
    <div className="flex">
      <Filterts
        filterOptions={['Aventura', 'Accion', 'Misterio', 'Sic-fi', 'Romance']}
      />
      <div className="flex flex-col w-full">
        <Orders />
        <Cards />
      </div>
    </div>
  );
};

export default Home;
