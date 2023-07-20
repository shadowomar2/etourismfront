import React, { useState } from "react";
import axios from "axios";
import { fetchData } from "../../axios_URL";
import { Navigate } from 'react-router-dom';
import "./LoginForm.css";
function LoginForm({ onLogin }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    usernameoremail: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetchData(
        "post",
        "/login",
        {
          usernameoremail: formData.usernameoremail,
          password: formData.password,
        },
        setError
      );

      // Save token in local storage
      localStorage.setItem("token", response.data.token);

      const roleResponse = await fetchData("get", "/getrole", setError);
      const userRole = roleResponse.data[0]; // Assumes that the response is an array with a single element

      if (userRole === "ADMIN") {
        setIsAuthenticated(true);
        onLogin();
        window.location.href = "/admin-page"; // Redirect to admin page
      } else {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setError("You are not authorized to access this page.");
      }
    } catch (error) {
      setIsAuthenticated(false);
      setError("Invalid username or password");
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  if (isAuthenticated) {
    return <Navigate to="/admin-page" />;
  }

  return (
    <>
      <div className="login-container">
        <div className="login-form-container">
          {error && <p className="error-message">{error}</p>}
          <form className="login-form" onSubmit={handleLogin}>
            <h1>Login DashBoard</h1>
            <div className="form-group">
              <label htmlFor="usernameoremail">Username:</label>
              <input
                type="text"
                id="usernameoremail"
                name="usernameoremail"
                value={formData.usernameoremail}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;