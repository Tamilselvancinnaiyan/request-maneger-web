import React, { useState } from "react";
import { apiRequest } from "../api";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await apiRequest("/auth/login", "POST", { email, password });
      onLogin(res.user, res.token);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={card}>
      <h3>Login</h3>

      <input style={input} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        style={input}
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button style={btn} onClick={login}>Login</button>
    </div>
  );
}

const card = {
  width: "320px",
  padding: "20px",
  background: "#f9f9f9",
  borderRadius: "8px",
};

const input = {
  width: "90%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  marginBottom: "12px",
};

const btn = {
  width: "100%",
  padding: "10px",
  background: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  fontWeight: "bold",
  cursor: "pointer",
};
