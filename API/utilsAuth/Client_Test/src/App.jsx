import { useState } from 'react'
import './App.css'
import {createUser} from "./services/postUser.js";
import LogginButton from './auth/logginButton.jsx';
import LogoutButton from './auth/logoutButton.jsx';
import { Route,Routes } from "react-router-dom";
import Challenges from './Challenges.jsx';

const App = () => {
  const [infoUser, setInfoUser] = useState({

    name:"",
    last_name:"",
    phone:"",
    password:""

  })


  const handleChange = (event) => {

    const {name, value} = event.target;

    setInfoUser({
      ...infoUser,
      [name]:value,
    })

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    alert("se Esta subiendo el perro a la DB...");

    createUser(infoUser)

  }
  return (

          <div className="App">
      <header className="App-header">
        <h1>Dashboard</h1>
      </header>
      <div className="App-body">
        <span>
          <LogginButton />
          <LogoutButton />
        </span>
        <Routes>
        <Route path="/challenges" component={<Challenges/>} />
        </Routes>

      </div>
     </div>
  )
}

export default App
