import axios from "axios";
import React, { useState } from "react";
// userrr9

export function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signup() {
    try {
      const response = await axios.post(
        "https://ecom-backend-1.sayuk.repl.co/register/signup",
        {
          name: name,
          email: email,
          password: password,
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1>signup</h1>
      <input
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
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

      <button onClick={signup}>Sign Up</button>
    </div>
  );
}
