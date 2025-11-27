import React, { useState, useEffect } from "react";
import { apiRequest } from "../api";


export default function Signup({ setScreen }) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "EMPLOYEE",
    manager_id: "",
  });

  const [managers, setManagers] = useState([]);
  const [isLoadingManagers, setIsLoadingManagers] = useState(false);

  useEffect(() => {
    if (form.role === "EMPLOYEE") {
      loadManagers();
    }
  }, [form.role]);

  const loadManagers = async () => {
    try {
      setIsLoadingManagers(true);

      const res = await apiRequest("/auth/managers", "GET");

      const users = res?.users || [];

      if (users.length === 0) {
        setManagers([]);
        return;
      }

      setManagers(users);
    } catch (err) {
      console.error(err);
      alert("Failed to load managers");
      setManagers([]);
    } finally {
      setIsLoadingManagers(false);
    }
  };

  const signup = async () => {
    try {
      await apiRequest("/auth/signup", "POST", {
        ...form,
        manager_id: form.manager_id || null, 
      });
      alert("Signup successful! Please login again");
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
        <>
          {isLoadingManagers ? (
            <div style={{ marginBottom: "12px" }}>
              Loading managers...
            </div>
          ) : managers.length === 0 ? (
            <div style={{ marginBottom: "12px", color: "red" }}>
              No managers available
            </div>
          ) : (
            <select
              style={input}
              onChange={(e) =>
                setForm({ ...form, manager_id: e.target.value })
              }
            >
              <option value="">Select Manager</option>
              {managers.map((m) => (
                <option key={m.emp_id} value={m.emp_id}>
                  {m.name} - {m.emp_id}
                </option>
              ))}
            </select>
          )}
        </>
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
