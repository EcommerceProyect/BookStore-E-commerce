import React from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from './components/navbar/Navbar'
import Login from './components/login/Login'
import Footer from './components/footer/Footer'
import Faqs from './components/footer/Faqs';
import Home from './views/Home'

function App() {
  return (
    <div>
      <Navbar />
      <Login />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/faqs" element={<Faqs />} />
      </Routes>
      <Footer/>
    </div>
  )
}
export default App
