import React, { useEffect, useState } from "react";
import { apiRequest } from "../api";

export default function RequestList({ token, user, filter }) {
  const [requests, setRequests] = useState([]);
console.log("user", user)
  const load = async () => {
    try {
      let res =  []
      if(user.role === 'EMPLOYEE'){
        res = await apiRequest("/requests", "GET", null, token);
      }else{
         res = await apiRequest("/requests/all", "GET", null, token);
      }

      
      let all = res.requests || [];
      

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
  }, [filter]);

  return (
    <div style={{ paddingTop: 10 }}>

      <div style={{ textAlign: "left", marginBottom: "10px" }}>
        <button style={refreshBtn} onClick={load}>🔄 Refresh</button>
      </div>

      {requests.length === 0 ? (
        <p style={{ fontSize: "16px", fontWeight: "bold", color: "gray",  textAlign: "center" }}>
          No Request found
        </p>
      ) : (
        <table style={table}>
          <thead>
            <tr style={headerRow}>
              <th style={th}>SL</th>
              <th style={th}>Assigned To</th>
              <th style={th}>Title</th>
              <th style={th}>Description</th>
              <th style={th}>Status</th>
              {  user.role === "MANAGER" && <th style={th}>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {requests.map((r, i) => (
              <tr key={r.id} style={i % 2 === 0 ? rowEven : rowOdd}>
                <td style={td}>{i + 1}</td>
                <td style={td}>{r.assignee?.name} - {r.assignee?.emp_id}</td>
                <td style={td}>{r.title}</td>
                <td style={td}>{r.description}</td>
                <td style={td}>{r.status}</td>
                { user.role === "MANAGER" && <td style={td}>
                    {user.role === "MANAGER" && (
                        <>

                         {r.status === "REJECTED" && (
                            <button style={btnGreen} onClick={() => action(r.id, "approve")}>
                            Approve
                            </button>
                        )}
                        
                        {r.status === "ASSIGNED" && (
                            <>
                            <button style={btnGreen} onClick={() => action(r.id, "approve")}>
                                Approve
                            </button>
                            <button style={btnRed} onClick={() => action(r.id, "reject")}>
                                Reject
                            </button>
                            </>
                        )}

                        {r.status === "APPROVED" && (
                            <button style={btnRed} onClick={() => action(r.id, "reject")}>
                            Reject
                            </button>
                        )}

                       
                        </>
                    )}
                </td>}
                
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
  fontWeight: "bold"
};
const table = { width: "100%", borderCollapse: "collapse" };
const th = { border: "1px solid #ddd", padding: 8 };
const td = { border: "1px solid #ddd", padding: 8 };
const headerRow = { background: "#28a745", color: "#fff" };
const rowEven = { background: "#f9f9f9" };
const rowOdd = { background: "#fff" };
const btnGreen = { padding: "5px", marginRight: "4px", background: "green", color: "white" };
const btnRed = { padding: "5px", background: "red", color: "white" };
const btnBlue = { padding: "5px", background: "blue", color: "white" };
