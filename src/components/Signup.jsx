import React, { useState } from "react";
import { apiRequest } from "../api";


export default function Signup({ setScreen }) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "EMPLOYEE",
    manager_id: "",
  });

  const signup = async () => {
    try {
      await apiRequest("/auth/signup", "POST", {
        ...form,
        manager_id: form.manager_id || null,
      });
      alert("Signup successful! Pleas login again");
      setScreen("login"); 

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={card}>
      <h3>Signup</h3>

      <input style={input} placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input style={input} placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input
        style={input}
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <select style={input} onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="EMPLOYEE">EMPLOYEE</option>
        <option value="MANAGER">MANAGER</option>
      </select>

      {form.role === "EMPLOYEE" && (
        <input
          style={input}
          placeholder="Manager ID"
          onChange={(e) => setForm({ ...form, manager_id: e.target.value })}
        />
      )}

      <button style={btn} onClick={signup}>Signup</button>
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
  background: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  fontWeight: "bold",
  cursor: "pointer",
};
