import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { TasksContext } from "../context/TaskContext";
import { OffCanvas, OffCanvasMenu, OffCanvasBody } from "react-offcanvas";





const Navbar = () => {
    const context = useContext(AuthContext);
    
    const { user } = useContext(AuthContext);
    const Taskcontext = useContext(TasksContext);
    const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem('user');
    context.dispatch({ type: 'LOGOUT' });
    Taskcontext.dispatch({ type: 'SET_TASKS' ,payload: null});
  };

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to={"/"} className="btn btn-link">
            <div className="logo-container">
              <img src="/check.ico" alt="Logo" />
              <h1>Task Manager</h1>
            </div>
          </Link>
          <div className="collapse navbar-collapse" id="navbarColor02">
            {user && (
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link to={"/"} className="nav-link active">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/History"} className="nav-link">
                    History
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/Calender"} className="nav-link">
                    Calendar
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/About"} className="nav-link">
                    About
                  </Link>
                </li>
               
              </ul>
            )}
          </div>
          {user && (
            <div>
              {!open && ( 
                <button
                  type="button"
                  className="menu btn btn-secondary my-2 my-sm-0"
                  style={{
                    top: "10px",
                    right: "10px",
                    width: "50px",
                    height: "40px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={handleClick}
                >
                  <span className="material-symbols-outlined">menu</span>
                </button>
              )}
              <button
                onClick={logout}
                className="btn btn-secondary my-2 my-sm-0"
                style={{
                  top: "10px",
                  right: "10px",
                  width: "90px",
                  height: "40px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <label style={{ marginRight: "5px" }}>Logout</label>
                <span className="material-symbols-outlined">logout</span>
              </button>
            </div>
          )}
          {!user && (
            <div className="connecting_btn">
              <Link to="/Login" className="btn btn-success">
                <label>Login</label>
                <span className="material-symbols-outlined">login</span>
              </Link>

              <Link to="/Register" className="btn btn-success">
                <label>Register</label>
                <span className="material-symbols-outlined">signature</span>
              </Link>
            </div>
          )}
        </div>
      </nav>
      <OffCanvas
        width={300}
        transitionDuration={300}
        effect="parallax"
        isMenuOpened={open}
        position="right"
        className={`offcanvas ${open ? "open" : ""}`}
        
      >
        <OffCanvasBody />
        <OffCanvasMenu
        style={{ position: "fixed", zIndex: '10000' ,backgroundColor :'#073642dc',height:'100%'}}>
            <div style={{ position: 'absolute', top: '25%',left:"10%" }}>
          <h2>Menu</h2>
          <ul>
            <li>
              <Link to={"/"} className="nav-link active">
                <label className="linkbtn btn btn-success">Home</label>
              </Link>
            </li>
            <li>
              <Link to={"/History"} className="nav-link">
                <label className="linkbtn btn btn-success">History</label>
              </Link>
            </li>
            <li>
              <Link to={"/Calender"} className="nav-link">
                <label className="linkbtn btn btn-success">Calendar</label>
              </Link>
            </li>
            <li>
              <Link to={"/About"} className="nav-link">
                <label className="linkbtn btn btn-success">About</label>
              </Link>
            </li>
            
          </ul>
          <button
            onClick={handleClick}
            style={{ width: "50px" }}
            className="linkbtn btn btn-success"
          >
            <span className="material-symbols-outlined">arrow_forward_ios</span>
          </button>
          </div>
        </OffCanvasMenu>
      </OffCanvas>
    </header>
  );
};

export default Navbar;
