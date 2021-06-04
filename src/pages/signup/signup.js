import "./signup.css";
import axios from "axios";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

export function Signup() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function signupHandler() {
    try {
      const response = await axios.post(
        "https://podcart.herokuapp.com/register/signup",
        {
          name: name,
          email: email,
          password: password,
        }
      );
      console.log(response.data, "resss");

      if (!response.data.User) {
        setError(response.data);
      } else {
        navigate(state?.from ? state.from : "/");
      }
    } catch (err) {
      console.log(err);
      setError("something went wrong");
    }
  }

  return (
    <div className="sigupParent">
      <div className="sigupBody">
        <h1>signup</h1>
        <input
          className="inputBox"
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          placeholder="Email"
          className="inputBox"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className="inputBox"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button className="btnPrimary" onClick={signupHandler}>
          Sign Up
        </button>

        {error && (
          <p className="errorMessage" style={{ color: "red" }}>
            {error}
          </p>
        )}

        <p>
          Already have an account, <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
