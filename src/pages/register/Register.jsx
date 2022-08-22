import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  // const url = "http://localhost:5000/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(false);
      const res = await axios.post(
        "https://blogapp817.herokuapp.com/api/auth/register",
        {
          username,
          email,
          password,
        }
      );
      res.data && navigate("/login");
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label htmlFor=""> UserName</label>
        <input
          type="text"
          placeholder="Enter Your UserName"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor=""> E-Mail</label>
        <input
          type="text"
          placeholder="Enter Your E-Mail"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor=""> Password</label>
        <input
          type="password"
          placeholder="Enter Your Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="registerBtn" type="submit">
          Register
        </button>
      </form>
      <Link to={"/login"}>
        <button className="registerLoginBtn">Login</button>
      </Link>
      {error && (
        <span style={{ color: "red", marginTop: "10px" }}>
          Something went wrong ....
        </span>
      )}
    </div>
  );
};

export default Register;
