import "./login.css";
import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../../contexts/Auth-Context";
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useToast } from "../../contexts/Toast-Context";

export function Login() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { auth, setAuth } = useAuth();

  async function loginHandler() {
    try {
      const response = await axios.post(
        "https://podcart.herokuapp.com/register/login",
        {
          email: email,
          password: password,
        }
      );

      console.log(response.data);

      if (!response.data.token) {
        setError(response.data);
        toast(response.data, {
          type: "error",
        });
      } else {
        setAuth(response.data);
        setAuth((prev) => {
          localStorage.setItem("auth", JSON.stringify(prev));
          return prev;
        });

        navigate(state?.from ? state.from : "/");
        toast("logged in successfully", {
          type: "success",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="loginParent">
      <div className="loginBody">
        <h1>Login</h1>

        <input
          className="inputBox"
          placeholder="Email"
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

        <button className="btnPrimary" onClick={loginHandler}>
          Login
        </button>

        {error && (
          <p className="errorMessage" style={{ color: "red" }}>
            {error}
          </p>
        )}

        <p>
          Don't have an accout, <Link to="/signup">Create Account</Link>
        </p>
      </div>
    </div>
  );
}
