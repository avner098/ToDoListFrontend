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
            
            <nav  className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link to={"/"} className="btn btn-link">
                        <div  className="logo-container">
                            <img src="/check.ico" alt="Logo" />
                            <h1 >Task Manger</h1>
                        </div>
                    </Link>
                    {user && <ul className="navbar-nav me-auto">
                                <li className="nav-item">
                                <Link to={"/ History"} className="btn btn-link">
                                    
                                    History
                               
                                </Link>
                                </li>
                                <li className="nav-item">
                                <Link to={"/Calender"} className="btn btn-link">
                                    
                                    Calender
                               
                                </Link>
                                </li>
                                <li className="nav-item">
                                <Link to={"/About"} className="btn btn-link">
                                    
                                    About
                               
                                </Link>
                                </li>
                            </ul>}
                    
                        {user && (
                        <div>
                            
                            <button onClick={logout} className="btn btn-outline-secondary" style={{
            
                                top: "10px",
                                right: "10px",
                                width: "40px",
                                height: "40px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <span className="material-symbols-outlined">logout</span>
                            </button>
                        </div>)
                        }
                        {!user && (
                        <div className="connecting_btn">
                            
                            <Link to="/Login" className="btn btn-success">
                                <label>Login</label>
                                <span className="material-symbols-outlined">login</span>
                                
                            </Link>

                            <Link to="/Register" className='btn btn-success'>
                                <label>Register</label>
                                <span className="material-symbols-outlined">signature</span>
                                
                            </Link>
                        </div>)}
                    </div>
                </nav>
            
        </header>
    )
}

export default Navbar