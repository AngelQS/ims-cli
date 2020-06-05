// Third
import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="myCard">
      <div className="card auth-card input-password-field input-text-field">
        <h2>Instagram</h2>
        <input type="text" placeholder="Fullname"></input>
        <input type="text" placeholder="Username"></input>
        <input type="text" placeholder="Email"></input>
        <input type="password" placeholder="Password"></input>
        <input type="password" placeholder="Password Confirmation"></input>
        <button className="btn waves-effect waves-light #64b5f6 blue darken-1">
          Signup
        </button>
        <h6>
          <Link to="/login">Already have an account?</Link>
        </h6>
      </div>
    </div>
  );
};

export default Signup;
