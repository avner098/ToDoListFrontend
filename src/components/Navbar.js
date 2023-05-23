import { Link } from 'react-router-dom'
import { AuthContext } from "../context/authContext"
import { TasksContext } from "../context/TaskContext"
import { useContext } from "react"

const Navbar = () => {

   

    const context = useContext(AuthContext);
    const {user} = useContext(AuthContext);

    const Taskcontext = useContext(TasksContext);
    

    const logout = () => {
      localStorage.removeItem('user');
      context.dispatch({ type: 'LOGOUT' });
      Taskcontext.dispatch({ type: 'SET_TASKS' ,payload: null});
    };

    return (
        <header>
            <div className="container">
                
                <Link to={"/"} className="logo-container">
                    <img src="/check.ico" alt="Logo" />
                    <h1>Task Manger</h1>
                </Link>
                <nav>
                    {user && (
                    <div>
                        <button onClick={logout} className="logout-container">
                            <span className="material-symbols-outlined">logout</span>
                        </button>
                    </div>)
                    }
                    {!user && (
                    <div className="connecting_btn">

                        <Link to="/Login">
                            <label>Login</label>
                            <span className="material-symbols-outlined">login</span>
                        </Link>

                        <Link to="/Register">
                            <label>Register</label>
                            <span className="material-symbols-outlined">signature</span>
                            
                        </Link>
                    </div>)}
                </nav>
            </div>
        </header>
    )
}

export default Navbar