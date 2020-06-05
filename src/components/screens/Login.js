// Third
import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="myCard">
      <div className="card auth-card input-password-field input-text-field">
        <h2>Instagram</h2>
        <input type="text" placeholder="Email"></input>
        <input type="password" placeholder="Password"></input>
        <button className="btn waves-effect waves-light #64b5f6 blue lighten-2">
          Login
        </button>
        <h6>
          <Link to="/signup">Don't have an account?</Link>
        </h6>
      </div>
    </div>
  );
};

export default Login;
