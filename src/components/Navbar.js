import { Link } from 'react-router-dom'
import { AuthContext } from "../context/authContext"
import { useContext } from "react"
const Navbar = () => {

   

    const context = useContext(AuthContext);

    const logout = () => {
      localStorage.removeItem('user');
      context.dispatch({ type: 'LOGOUT' });
    };

    return (
        <header>
            <div className="container">
                
                <Link to={"/"} className="logo-container">
                    <img src="/check.ico" alt="Logo" />
                    <h1>Task Manger</h1>
                </Link>
                <nav >
                    <div>
                        <button onClick={logout}>
                            <span className="material-symbols-outlined">logout</span>
                        </button>
                    </div>
                    <div>
                        <Link to="/Login">Login</Link>
                        <Link to="/Register">Register</Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Navbar