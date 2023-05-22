import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Navbar />
      <div className="pages">
        <Routes>
          <Route 
            path="/"
            element={<Home />}
          />
          <Route 
            path="/Login"
            element={<Login />}
          />
          <Route 
            path="/Register"
            element={<Register />}
          />
        </Routes>
      </div>
     </BrowserRouter>
    </div>
  );
}

export default App;
