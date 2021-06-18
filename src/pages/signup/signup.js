import "./signup.css";
import axios from "axios";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useToast } from "../../contexts/Toast-Context";

export function Signup() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { toast } = useToast();

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

      if (!response.data.User) {
        setError(response.data);
        toast(response.data, {
          type: "error",
        });
      } else {
        navigate(state?.from ? state.from : "/");
        toast("signed in successfully", {
          type: "success",
        });
      }
    } catch (err) {
      console.log(err);
      setError("something went wrong");
      toast("something went wrong", {
        type: "error",
      });
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
