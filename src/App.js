import {BrowserRouter, Routes, Route,Navigate} from 'react-router-dom'

import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Login from './pages/Login'
import History from './pages/History'
import Calender from './pages/Calender'
import About from './pages/About'
import Register from './pages/Register'
import NotFound404 from './pages/NotFound404'


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
            path="/History"
            element={user ? <History /> : <Navigate to = "/login" /> }
          />
          <Route 
            path="/Calender"
            element={user ? <Calender /> : <Navigate to = "/login" /> }
          />
          <Route 
            path="/About"
            element={user ? <About /> : <Navigate to = "/login" /> }
          />
          
          <Route 
            path="/Login"
            element={!user ? <Login />  : <Navigate to = "/" /> }
          />
          <Route 
            path="/Register"
            element={!user ? <Register /> : <Navigate to = "/login" /> }
          />


          <Route  
          path="*"
          element={<NotFound404 /> }>
          </Route>

        </Routes>
      </div>
     </BrowserRouter>
    </div>
  );
}

export default App;
