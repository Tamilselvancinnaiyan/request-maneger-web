import React, { useState } from "react";
import { apiRequest } from "../api";

export default function CreateRequest({ token }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const [assigneeLabel, setAssigneeLabel] = useState("");

  const [users, setUsers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await apiRequest("/user/list", "GET", null, token);
      setUsers(res.users || []);
      setShowDropdown(true);
    } catch (err) {
      alert(err.message);
    }
  };

  const create = async () => {
    try {
      await apiRequest(
        "/requests/create",
        "POST",
        { title, description, assigneeId },
        token
      );
      alert("Request created!");
      setTitle("");
      setDescription("");
      setAssigneeLabel("");
      setAssigneeId("");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={card}>
      <h3 style={{ marginBottom: "10px" }}>Create Request</h3>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={input}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ ...input, height: "70px" }}
      />

      <input
        placeholder="Select Assignee"
        value={assigneeLabel}
        onClick={fetchUsers}
        readOnly
        style={input}
      />

      {showDropdown && (
        <div style={dropdown}>
          {users.map((u) => (
            <div
              key={u.id}
              style={dropdownItem}
              onClick={() => {
                setAssigneeId(u.id);
                setAssigneeLabel(`${u.name} (${u.emp_id})`);
                setShowDropdown(false);
              }}
            >
              {u.name} — {u.emp_id}
            </div>
          ))}
        </div>
      )}

      <button style={blueBtn} onClick={create}>Create</button>
    </div>
  );
}

const card = {
  width: "350px",
  padding: "15px",
  background: "#f9f9f9",
  borderRadius: "8px",
  border: "1px solid #ddd",
  marginTop: "20px"
};

const input = {
  width: "100%",
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  marginBottom: "10px"
};

const blueBtn = {
  width: "100%",
  padding: "10px",
  background: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold"
};

const dropdown = {
  border: "1px solid #ccc",
  background: "#fff",
  borderRadius: "6px",
  marginBottom: "10px"
};

const dropdownItem = {
  padding: "8px",
  cursor: "pointer",
  borderBottom: "1px solid #eee"
};
