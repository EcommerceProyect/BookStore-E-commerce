import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Registration from './components/registration/Registration';
import Footer from './components/footer/Footer';
import Faqs from './components/footer/Faqs';
import Login from './components/login/Login';
import Home from './views/home/Home';
import CreateProduct from './views/createProduct/CreateProduct';

function App() {
  return (
    <div>
      {/* <Test /> */}
      {/* <DropDownMenu /> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/createProducts" element={<CreateProduct />} />
        <Route path="/faqs" element={<Faqs />} />
      </Routes>
      <Footer />

      <Registration />
      <CreateBook />
    </div>
  );
}
export default App;
