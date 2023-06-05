import React from 'react';
import {Link} from "react-router-dom"



const NotFound404 = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-heading">404 Page Not Found</h1>
      <p className="not-found-message">Sorry, the page you're looking for does not exist.</p>
      <Link to="/" className="not-found-link">
      
         <label>Back to Home</label>

         <span className="home404 material-symbols-outlined">
            home
        </span>
    </Link>
    </div>
  );
};

export default NotFound404;