import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Faqs from './components/footer/Faqs';
import AboutUs from './components/footer/AboutUs';
import Login from './components/login/Login';
import Home from './views/home/Home';
// import DropDownMenu from './components/dropDownMenu/DropDownMenu';
import { useState } from 'react';
import RegistrationModal from './components/registration/RegistrationModal';
import Detail from './views/detail/Detail';
import Cart from './views/cart/Cart';
import Statistics from './views/dashboard/Statistics';
import Users from './views/dashboard/Users';
import CreateProduct from './views/createProduct/CreateProduct';
import RegisterAuth from './components/Auth/RegisterAuth';
import PaymentBill from './views/cart/PaymentBill';

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

  const { pathname } = useLocation();

  return (
    <div>
      {pathname === '/paymentBill' ? (
        <PaymentBill />
      ) : (
        <>
          {/* <DropDownMenu /> */}
          <Navbar
            openLoginModal={openLoginModal}
            openRegistrationModal={openRegistrationModal}
          />

          <Routes>
            {/* auth */}
            <Route path="/redirect" Component={RegisterAuth} />
            {/* auth */}
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/dashboard" element={<Statistics />} />
            <Route path="/dashboard/users" element={<Users />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="/createBook" element={<CreateProduct />} />
            {/* <Route path="/paymentBill" element={<PaymentBill />} /> */}
          </Routes>
          <Footer />
          {showRegistrationModal && (
            <RegistrationModal onClose={closeRegistrationModal} />
          )}
          {showLoginModal && <Login onClose={closeLoginModal} />}
        </>
      )}
    </div>
  );
}

export default App;
