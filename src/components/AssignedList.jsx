import React, { useEffect, useState } from "react";
import { apiRequest } from "../api";

export default function AssignedList({ token, user }) {
  const [requests, setRequests] = useState([]);

  const load = async () => {
    try {
      const res = await apiRequest("/requests/assigned", "GET", null, token);
      const all = res.requests || [];

      setRequests(all);
    } catch (err) {
      alert(err.message);
    }
  };

  const action = async (id, type) => {
    await apiRequest(`/requests/${id}/${type}`, "POST", {}, token);
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ paddingTop: 10 }}>
    <button style={refreshBtn} onClick={load}>  🔄 Refresh </button>
     {requests.length === 0 ? (
        <p style={{ fontSize: "16px", fontWeight: "bold", color: "gray",  textAlign: "center" }}>
          No tasks found
        </p>
      ) : (
      <table style={table}>
        <thead>
          <tr style={headerRow}>
            <th style={th}>SL</th>
            <th style={th}>Created By</th>
            <th style={th}>Title</th>
            <th style={th}>Description</th>
            <th style={th}>Status</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((r, i) => (
            <tr key={r.id} style={i % 2 === 0 ? rowEven : rowOdd}>
              <td style={td}>{i + 1}</td>
              <td style={td}>{r.creator?.name} - {r.creator?.emp_id}</td>
              <td style={td}>{r.title}</td>
              <td style={td}>{r.description}</td>
              <td style={td}>{r.status}</td>

              <td style={td}>
                {user.role === "EMPLOYEE" && r.status === "APPROVED" && (
                  <button style={btnBlue} onClick={() => action(r.id, "close")}>
                    Close
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
         )}
    </div>
  );
}
const refreshBtn = {
  padding: "8px 15px",
  color: "black",
  border: "none",
  borderRadius: "5px",
  marginBottom: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};
const table = { width: "100%", borderCollapse: "collapse" };
const th = { border: "1px solid #ddd", padding: 8 };
const td = { border: "1px solid #ddd", padding: 8 };
const headerRow = { background: "#007bff", color: "#fff" };
const rowEven = { background: "#f9f9f9" };
const rowOdd = { background: "#fff" };
const btnGreen = { padding: "5px", marginRight: "4px", background: "green", color: "white" };
const btnRed = { padding: "5px", background: "red", color: "white" };
const btnBlue = { padding: "5px", background: "blue", color: "white" };
