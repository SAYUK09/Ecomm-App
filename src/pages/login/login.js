import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../../contexts/Auth-Context";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { auth, setAuth } = useAuth();

  async function login() {
    try {
      const response = await axios.post(
        "https://ecom-backend-1.sayuk.repl.co/register/login",
        {
          email: email,
          password: password,
        }
      );

      console.log(response.data);

      if (!response.data.token) {
        setError(response.data);
      } else {
        setAuth(response.data);
        setAuth((prev) => {
          localStorage.setItem("auth", JSON.stringify(prev));
          return prev;
        });
        setError("");
      }
    } catch (err) {
      console.log(err);
    }
    navigate(state?.from ? state.from : "/");
  }

  return (
    <div>
      <h1>signup</h1>

      <input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <button onClick={login}>Sign Up</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
