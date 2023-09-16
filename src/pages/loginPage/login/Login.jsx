import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.scss";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://api-flickhub.onrender.com/users/login", {
        email,
        password,
      });
      const data = response.data;
      console.log("data-login", data);
      if (data === "notlogin") {
        setMessage("Email or Password is not correct😟");
        return;
      }
      document.cookie = `token=${data.accessToken}; path=/`;
      window.location.assign('/');
    } catch (error) {
      alert("Error during registration");
      console.error(error);
    }
  };

  return (
    <div className="login">
      <div className="main">
        <form onSubmit={handleSubmit}>
          <h2>Sign In</h2>
          <div className="container">
            <label htmlFor="email">Email:</label>
            <input
              className="control"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter Email"
              required
              autoFocus
            />
          </div>
          <div className="container">
            <label htmlFor="password">Password:</label>
            <input
              className="control"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter Password"
              required
            />
          </div>
          <div className="btn">
            <button className="btn-inside" type="submit">
              Sign In
            </button>
          </div>
          <div className="link">
            <Link to="/register">I am not register yet !</Link>
            <p> {message}</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
