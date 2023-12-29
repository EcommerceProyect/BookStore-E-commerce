import "./App.css";
import LoginButton from "./auth/LoginButton";
import LogoutButton from "./auth/LogoutButton";
import Authorization from "./Authorization";

import { Route,Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Dashboard</h1>
      </header>
      <div className="App-body">
        <span>
          <LoginButton />
          <LogoutButton />
        </span>
        <Routes>
        <Route path="/redirect" Component={Authorization} />
        </Routes>
        
      </div>
    </div>
  );
}

export default App;
