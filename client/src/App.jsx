import React, { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import Orders from './components/filters/Orders';
import Filterts from './components/filters/Filterts';
import Login from './components/login/Login';
import Cards from './components/cards/Cards';
import Footer from './Components/footer/Footer';
import RegistrationModal from './components/registration/RegistrationModal';
import CreateBook from './components/createBook/createBook';
import OffCanvasMenu from './components/off-canvasMenu/OffCanvasMenu';

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
      <OffCanvasMenu />
      <Navbar
        openLoginModal={openLoginModal}
        openRegistrationModal={openRegistrationModal}
      />
      <Orders />
      <Filterts />
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
