import React, { useState } from "react";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 7) {
      setMessage("Password must contain 8 characters🤐.");
      return;
    }
    try {
      const response = await axios.post(
        "https://api-flickhub.onrender.com/users/register",
        {
          username,
          email,
          password,
        }
      );
      const data = response.data;
      console.log("data", data);

      if (data === "exist") {
        setMessage("Email is already used 🤷‍♀️,do Sign In👍 ");
        return;
      }
      navigate("/login");
    } catch (error) {
      setMessage("Error during registration");
      console.error(error);
    }
  };

  return (
    <div className="register">
      <div className="main-div">
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <div className="content">
            <label htmlFor="username">Username:</label>
            <input
              className="control-div"
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Enter Username"
              required
              autoFocus
            />
          </div>
          <div className="content">
            <label htmlFor="email">Email:</label>
            <input
              className="control-div"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter Email"
              required
            />
          </div>
          <div className="content-div">
            <label htmlFor="password">Password:</label>
            <input
              className="control-div"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter Password"
              required
            />
          </div>
          <div className="btn-div">
            <button className="btn-in" type="submit">
              Register
            </button>
          </div>
          <div className="link-div">
            <Link to="/login">I have already register !, Go to Sign In</Link>
            <p> {message}</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
