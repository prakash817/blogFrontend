import axios from "axios";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const url = "http://localhost:5000/";
  const url = "https://blogapp817.herokuapp.com/";

  const { user, dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post(url + "api/auth/login", {
        username,
        password,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label htmlFor=""> Username</label>

        <input
          type="text"
          placeholder="Enter Your Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* ref={userRef} */}

        <label htmlFor=""> Password</label>
        <input
          type="password"
          placeholder="Enter Your Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* ref={passwordRef} */}
        <button className="loginBtn" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <button className="loginRegisterBtn">
        <Link className="link" to={"/register"}>
          Register
        </Link>
      </button>
    </div>
  );
};

export default Login;
