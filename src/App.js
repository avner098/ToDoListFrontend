import {BrowserRouter, Routes, Route,Navigate} from 'react-router-dom'

import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthContext } from "../src/context/authContext"
import { useContext } from "react"

function App() {
  
  const {user} = useContext(AuthContext);

  return (
    <div className="App">
     <BrowserRouter>
     <Navbar />
      <div className="pages">
        <Routes>
          <Route 
            path="/"
            element={user ? <Home /> : <Navigate to = "/login" /> }
          />
          <Route 
            path="/Login"
            element={!user ? <Login />  : <Navigate to = "/" /> }
          />
          <Route 
            path="/Register"
            element={!user ? <Register /> : <Navigate to = "/login" /> }
          />
        </Routes>
      </div>
     </BrowserRouter>
    </div>
  );
}

export default App;
