import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/Logo.svg';
import { FaFacebook, FaYoutube, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="px-3 pt-4 lg:px-9  bg-primary flex flex-col w-full relative bottom-0">
      <div className=" grid gap-10 row-gap-6 mb-8 sm:grid-cols-1 lg:grid-cols-3 mt-2 p-3 h-auto">
        <div className="grid justify-center self-center">
          <a href="#" className=" justify-self-center inline-flex items-center">
            <div title="Home" className="left-0">
              <img src={Logo} alt="Logo" className="ml-10 transform transition-transform duration-300 ease-in-out hover:scale-105" />
            </div>
          </a>
          <Link to="/aboutUs">
            <div className="lg:max-w-xl pt-10">
              <h2 className="font-bold text-xl text-textLight text-center hover:text-accents transition-colors duration-300 cursor-pointer">
                ¿Quiénes somos?
              </h2>
            </div>
          </Link>
          <Link to="/faqs">
            <div className="mt-6 lg:max-w-xl">
              <h2 className="font-bold text-xl text-textLight text-center hover:text-accents   transition-colors duration-300 cursor-pointer">
                Preguntas frecuentes
              </h2>
            </div>
          </Link>
        </div>
        <div className="self-center">
          <div className="flex flex-col gap-2 text-sm text-center items-center ">
            <p className="font-bold text-xl text-textLight tracking-wide">
              Contacto
            </p>
            <div className="inline-flex gap-3 ">
              <FaFacebook
                href="#"
                className="text-textLight hover:text-accents h-12 text-3xl cursor-pointer hover:scale-110 duration-300"
              />
              <FaInstagram
                href="#"
                className="text-textLight hover:text-accents h-12 text-3xl cursor-pointer hover:scale-110 duration-300"
              />
              <FaYoutube
                href="#"
                className="text-textLight hover:text-accents h-12 text-3xl cursor-pointer hover:scale-110 duration-300"
              />
              <FaWhatsapp
                href="#"
                className="text-textLight hover:text-accents h-12 text-3xl cursor-pointer hover:scale-110 duration-300"
              />
              <FiMail
                href="#"
                className="text-textLight hover:text-accents h-12 text-3xl cursor-pointer hover:scale-110 duration-300"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2  text-sm text-center items-center mt-5">
            <p className="font-bold text-xl text-textLight tracking-wide">
              Ubicación
            </p>
            <div className="inline-flex gap-3 ">
              <p className="text-xl">-</p>
            </div>
          </div>
        </div>

        <div className="flex h-auto">
          <div href="#" className="flex w-full min-w-xl justify-center">
            <iframe
              className="h-full w-full"
              title="Ubicación Empresa"
              src="https://www.google.com/maps/embed?..."
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
