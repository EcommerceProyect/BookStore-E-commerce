import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Faqs from './components/footer/Faqs';
import AboutUs from './components/footer/AboutUs';
import LoginModal from './components/login/LoginModal';
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
import Products from './views/products/Products';
import PaymentBill from './views/cart/PaymentBill';
import { useDispatch, useSelector } from 'react-redux';
import { createCart } from './redux/slices/cartUsersTest';
import { debounce, isEmpty } from 'lodash';
import { getUserId } from './redux/slices/user';

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if(isEmpty(user)){
      dispatch(getUserId());
    }
    
  },[user])
  const createCartFn = debounce((userId) => {
    dispatch(createCart(userId || ""));
  }, 500);

  useEffect(() => {
    if (!isEmpty(user)) {
      console.log("USER", user);
      createCartFn(user.id || "");
    }
  }, [user]);

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = (open) => {
    setShowLoginModal(false);
    if (open === true) {
      openRegistrationModal();
    }
  };

  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const openRegistrationModal = () => {
    setShowRegistrationModal(true);
  };

  const closeRegistrationModal = (open) => {
    setShowRegistrationModal(false);
    if (open === true) {
      openLoginModal();
    }
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
            <Route path="/products" element={<Products />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/login" element={<LoginModal />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/dashboard" element={<Statistics />} />
            <Route path="/dashboard/users" element={<Users />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="/dashboard/createBook" element={<CreateProduct />} />
          </Routes>
          <Footer />
          {showRegistrationModal && (
            <RegistrationModal onClose={closeRegistrationModal} />
          )}
          {showLoginModal && <LoginModal onClose={closeLoginModal} />}
        </>
      )}
    </div>
  );
}

export default App;
