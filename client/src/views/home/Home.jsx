import React from 'react';
import CarouselComponent from '../home/carousel/CarouselComponent';

const Home = () => {
  return (
    <div>
      <h2 className="my-5 text-textDark font-bold text-center text-lg">
        Últimos libros agregados
      </h2>
      <CarouselComponent />
      <hr className="bg-gray-700"></hr>
      <div className="my-10">
        <p class="font-serif text-center text-3xl">
          "Un libro es un regalo que puedes abrir una y otra vez."
          <br />
          <cite className="px-4 mb-10 text-base leading-7 text-textGray">
            Garrison Keillor
          </cite>
        </p>
      </div>
      <hr></hr>
      <div className="grid grid-cols-2 my-8 items-center mx-6">
        <div className="col-span-1 justify-center flex p-0">
          <img
            className="shadow-md"
            src="https://www.aprendum.com/cdn/13/images/libreriagrande01.jpg"
            alt="libreria"
          />
        </div>
        <div className="col-span-1 flex flex-col justify-between px-8 pb-5">
          <p className="leading-relaxed">
            En Librería Apolo, te invitamos a explorar nuestra amplia selección
            de libros que abarca desde cautivadoras novelas, enriquecedores
            libros de historia, divertidas historietas cómicas y mucho más.
            Sumérgete en un universo literario diverso y descubre la magia de
            cada página. ¡Encuentra la lectura perfecta para ti y deja que la
            aventura comience en cada libro que elijas!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
