import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Registration from './components/registration/Registration';
import Footer from './components/footer/Footer';
import Faqs from './components/footer/Faqs';
import Login from './components/login/Login';
import Home from './views/home/Home';
import CreateProduct from './views/createProduct/CreateProduct';
import DropDownMenu from './components/dropDownMenu/DropDownMenu';
import React, { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import Login from './components/login/Login';
import Cards from './components/cards/Cards';
import Footer from './Components/footer/Footer';
import RegistrationModal from './components/registration/RegistrationModal';
import CreateBook from './components/createBook/createBook';
import DropDownMenu from './components/dropDownMenu/DropDownMenu';

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const openRegistrationModal = () => {
    closeLoginModal();
    setShowRegistrationModal(true);
  };

  const closeRegistrationModal = () => {
    setShowRegistrationModal(false);
  };

  return (
    <div>
      <DropDownMenu />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/createProducts" element={<CreateProduct />} />
        <Route path="/faqs" element={<Faqs />} />
      </Routes>
      <Footer />
      <Navbar
        openLoginModal={openLoginModal}
        openRegistrationModal={openRegistrationModal}
      />
      <Cards />
      <Footer />
      <CreateBook />
      {showRegistrationModal && (
        <RegistrationModal onClose={closeRegistrationModal} />
      )}
      {showLoginModal && <Login onClose={closeLoginModal} />}
    </div>
  );
}

export default App;
