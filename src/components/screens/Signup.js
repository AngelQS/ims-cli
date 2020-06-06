// Third
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getUUIDV4 } from "../../utils/uuid";
import M from "materialize-css";

const Signup = () => {
  const history = useHistory();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const PostData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      return M.toast({
        html: "Email entered is invalid",
        classes: "c62828 red darken-3",
      });
    }
    fetch("/account/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "IMS-Request-Id": getUUIDV4().toString(),
        "IMS-Request-Date": new Date().toISOString(),
      },
      body: JSON.stringify({
        firstname,
        lastname,
        username,
        email,
        password,
        passwordConfirmation,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          console.log("data:", data);
          return M.toast({
            html: data.error.nestedErrors.message,
            classes: "#c62828 red darken-3",
          });
        }
        M.toast({
          html: "Your account has been created",
          classes: "#43a047 green darken-1",
        });
        return history.push("/login");
      })
      .catch((err) => {
        M.toast({ html: err.message });
      });
  };
  return (
    <div className="myCard">
      <div className="card auth-card input-password-field input-text-field">
        <h2>Instagram</h2>
        <input
          type="text"
          placeholder="Firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
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
        <input
          type="password"
          placeholder="Password Confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        ></input>
        <button
          className="btn waves-effect waves-light #64b5f6 blue darken-1"
          onClick={() => PostData()}
        >
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
