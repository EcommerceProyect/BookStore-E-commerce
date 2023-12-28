import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Faqs from './components/footer/Faqs';
import AboutUs from './components/footer/AboutUs';
import Login from './components/login/Login';
import Home from './views/home/Home';
// import DropDownMenu from './components/dropDownMenu/DropDownMenu';
import { useState } from 'react';
import RegistrationModal from './components/registration/RegistrationModal';
import CreateBook from './components/createBook/createBook';
import Detail from './views/detail/Detail';
import Cart from './views/cart/Cart';

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
      {/* <DropDownMenu /> */}
      <Navbar
        openLoginModal={openLoginModal}
        openRegistrationModal={openRegistrationModal}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/carrito" element={<Cart />} />
      </Routes>
      <Footer />
      {showRegistrationModal && (
        <RegistrationModal onClose={closeRegistrationModal} />
      )}
      {showLoginModal && <Login onClose={closeLoginModal} />}
    </div>
  );
}

export default App;
