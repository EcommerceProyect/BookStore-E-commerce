import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Registration from './components/registration/Registration';
import Footer from './components/footer/Footer';
import Faqs from './components/footer/Faqs';
import Login from './components/login/Login';
import Home from './views/home/Home';
import CreateProduct from './views/createProduct/CreateProduct';
import Test from './components/tests/Test';
import OffCanvasMenu from './components/off-canvasMenu/OffCanvasMenu';

function App() {
  return (
    <div>
      <Test />
      <OffCanvasMenu />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/createProducts" element={<CreateProduct />} />
        <Route path="/faqs" element={<Faqs />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
