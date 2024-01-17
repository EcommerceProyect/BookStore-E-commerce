import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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
import ProductList from './views/dashboard/ProductList';
import PaymentSuccess from './views/cart/payment/PaymentSuccess';
import PaymentFailure from './views/cart/payment/PaymentFailure';
import { useDispatch, useSelector } from 'react-redux';
import { createCart } from './redux/slices/cartUsersTest';
import Profile from './views/profile/Profile';
import UpdateProfile from './views/profile/UpdateProfile';
import { debounce, isEmpty } from 'lodash';
import EditEntities from './views/dashboard/EditEntities';
import EditBook from './components/createBook/EditBook';

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState({});
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEmpty(userData) && !isEmpty(userData.response)) {
      setUser(userData.response);
    }
    if ((!user || user.role !== "admin") && pathname.startsWith('/dashboard')) {
      navigate('/');
    }
  }, [userData]);

  const createCartFn = debounce((userId) => {
    dispatch(createCart(userId || ''));
  }, 500);

  useEffect(() => {
    if (!isEmpty(user)) {
      console.log('USER', user);
      createCartFn(user.id || '');
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

 


  return (
    <div className='dark:bg-bgDark'>
      {pathname === '/success' ? (
        <PaymentSuccess />
      ) : pathname === '/failure' ? (
        <PaymentFailure />
      ) : (
        <>
          {/* <DropDownMenu /> */}
          <Navbar
            openLoginModal={openLoginModal}
            openRegistrationModal={openRegistrationModal}
          />

          <Routes>
            {/* auth */}
            <Route
              path="/redirect"
              element={<RegisterAuth openLoginModal={openLoginModal} />}
            />
            {/* auth */}
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<UpdateProfile />} />
            <Route path="/products" element={<Products />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/login" element={<LoginModal />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/dashboard" element={<Statistics />} />
            <Route path="/dashboard/users" element={<Users />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="/dashboard/createBook" element={<CreateProduct />} />
            <Route path="/dashboard/products" element={<ProductList />} />
            <Route path="/dashboard/editEntities" element={<EditEntities />} />
             <Route path="/dashboard/editBook/:id" element={<EditBook />} />
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
