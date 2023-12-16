import React, { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import Login from './components/login/Login';
import Cards from './components/cards/Cards';
import Footer from './Components/footer/Footer';
import Registration from './components/registration/Registration';
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

  return (
    <div>
      <DropDownMenu />
      <Navbar openLoginModal={openLoginModal} /> {/* Pasar la función al Navbar */}
      <Cards />
      <Footer />
      <Registration />
      <CreateBook />
      {showLoginModal && <Login onClose={closeLoginModal} />} {/* Mostrar el Login si showModal es true */}
    </div>
  );
}

export default App;
