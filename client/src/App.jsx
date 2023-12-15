import React from 'react';

import { Route, Routes } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Cards from './components/cards/Cards';
import Login from './components/login/Login';
import Footer from './Components/footer/Footer';
import DropDownMenu from './components/dropDownMenu/DropDownMenu';
import Test from './components/tests/Test';

function App() {
  return (
    <div>
      {/* <Test /> */}
      {/* <DropDownMenu /> */}
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>

      <Cards />
      <Footer />
    </div>
  );
}
export default App;
