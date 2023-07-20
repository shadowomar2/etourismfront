import React, { useState } from "react";
 
import { Navigate } from 'react-router-dom';

function Logout({ onLogout }) {
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleLogout = async (event) => {
    event.preventDefault();

    // Remove token from local storage
    localStorage.removeItem("token");

    // Remove authorization header for future requests

    // Redirect to home page or login page
    // Replace this with your own logic
    setIsLoggedOut(true);
    onLogout();
  };

  if (isLoggedOut) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <div className="login-container">
    
        <div className="login-form-container">
          <form className="login-form" onSubmit={handleLogout}>
            <h3>Are you sure you want to log out?</h3>
            <button type="submit">Log Out</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Logout;