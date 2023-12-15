import React from 'react';

import { Route, Routes } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Cards from './components/cards/Cards';
import Login from './components/login/Login';
import Footer from './Components/footer/Footer';
import Registration from './components/registration/Registration';
import CreateBook from './components/createBook/createBook';

function App() {
  return (
    <div>
      <DropDownMenu />
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>

      <Cards />
      <Footer />

      <Registration />
      <CreateBook />
    </div>
  );
}
export default App;
