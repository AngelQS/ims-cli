// Third
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getUUIDV4 } from "../../utils/uuid";
import M from "materialize-css";

// Local
import CredentialValidator from "../../services/validator/credential-validator";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const PostData = () => {
    const isValidLogin = new CredentialValidator(
      null,
      null,
      null,
      email,
      password,
      null
    ).verifyLogin();
    console.log("isValidLogin:", isValidLogin);
    if (isValidLogin) {
      console.log("paso if");
      return M.toast({
        html: `${isValidLogin}`,
        classes: "c62828 red darken-3",
      });
    }
    /* if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      return M.toast({
        html: "Email entered is invalid",
        classes: "c62828 red darken-3",
      });
    } */
    fetch("/account/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "IMS-Request-Id": getUUIDV4().toString(),
        "IMS-Request-Date": new Date().toISOString(),
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.error) {
          return M.toast({
            html: data.error,
            classes: "#c62828 red darken-3",
          });
        }
        localStorage.setItem("authorization", data.token);
        M.toast({
          html: "Success login",
          classes: "#43a047 green darken-1",
        });
        return history.push("/");
      })
      .catch((err) => {
        console.log("error:", err);
        M.toast({ html: "Something went wrong" });
      });
  };
  return (
    <div className="myCard">
      <div className="card auth-card input-password-field input-text-field">
        <h2>Instagram</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button
          className="btn waves-effect waves-light #64b5f6 blue darken-1"
          onClick={() => PostData()}
        >
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
