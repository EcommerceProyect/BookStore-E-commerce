import React from 'react'
import Navbar from './components/navbar/Navbar'
import Cards from './components/cards/Cards'
import Login from './components/login/Login'
import Footer from './Components/footer/Footer'

function App() {
  return (
    <div>
      <Navbar />
      <Login />
      <Cards />
      <Footer/>
    </div>
  )
}
export default App
