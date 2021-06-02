import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../../contexts/Auth-Context";
// userrr9

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { auth, setAuth } = useAuth();

  console.log(auth, "Auuuuuuuuuth");

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
      console.log(response.data.token);
      setAuth(response.data);
      setAuth((prev) => {
        localStorage.setItem("auth", JSON.stringify(prev));
        return prev;
      });
    } catch (err) {
      console.log(err);
    }
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
    </div>
  );
}
