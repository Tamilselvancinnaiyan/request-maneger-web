import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CreateRequest from "./components/CreateRequest";
import RequestList from "./components/RequestList";
import AssignedList from "./components/AssignedList";

function App() {
  const [token, setToken] = useState(() => {
    const saved = localStorage.getItem("token");
    if (!saved || saved === "null" || saved === "undefined") return null;
    return saved;
  });


  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser || savedUser === "null" || savedUser === "undefined")
      return null;

    try {
      return JSON.parse(savedUser);
    } catch {
      return null;
    }
  });

  const [screen, setScreen] = useState("login");
  const [activeTab, setActiveTab] = useState("");


  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);


  useEffect(() => {
    if (user) {
      if (user.role === "EMPLOYEE") setActiveTab("create");
      if (user.role === "MANAGER") setActiveTab("tasks");
    }
  }, [user]);

  const onLogin = (u, t) => {
    setUser(u);
    setToken(t);

    localStorage.setItem("token", t);
    localStorage.setItem("user", JSON.stringify(u));

    if (u.role === "EMPLOYEE") setActiveTab("create");
    if (u.role === "MANAGER") setActiveTab("tasks");
  };


  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.clear();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ textAlign: "center" }}>Request Management System</h1>

      {!token ? (
        <div style={centerWrapper}>
          <div style={centerCard}>
            {screen === "login" ? (
                <Login onLogin={onLogin} />
              ) : (
                <Signup setScreen={setScreen} /> 
              )}
            <button
              onClick={() => setScreen(screen === "login" ? "signup" : "login")}
              style={switchBtn}
            >
              Switch to {screen === "login" ? "Signup" : "Login"}
            </button>
          </div>
        </div>
      ) : (
        <>
          <p>
            Logged in as <b>{user.name}</b> ({user.role})
          </p>

          <button onClick={logout} style={logoutBtn}>
            Logout
          </button>

          {user.role === "EMPLOYEE" && (
            <div style={tabContainer}>
              <button
                onClick={() => setActiveTab("create")}
                style={activeTab === "create" ? activeTabStyle : tabStyle}
              >
                Create Request
              </button>

              <button
                onClick={() => setActiveTab("created")}
                style={activeTab === "created" ? activeTabStyle : tabStyle}
              >
                Created Requests
              </button>

              <button
                onClick={() => setActiveTab("assigned")}
                style={activeTab === "assigned" ? activeTabStyle : tabStyle}
              >
                Assigned Tasks
              </button>
            </div>
          )}

          {user.role === "MANAGER" && (
            <div style={tabContainer}>
              <button
                onClick={() => setActiveTab("tasks")}
                style={activeTab === "tasks" ? activeTabStyle : tabStyle}
              >
                Tasks
              </button>
            </div>
          )}

          <hr />

          {user.role === "EMPLOYEE" && activeTab === "create" && (
            <CreateRequest token={token} />
          )}


          {user.role === "EMPLOYEE" && activeTab === "created" && (
            <RequestList token={token} user={user} filter="created" />
          )}

          {user.role === "EMPLOYEE" && activeTab === "assigned" && (
            <AssignedList token={token} user={user} filter="assigned" />
          )}

          {user.role === "MANAGER" && activeTab === "tasks" && (
            <RequestList token={token} user={user} filter="manager" />
          )}
        </>
      )}
    </div>
  );
}

export default App;

const centerWrapper = {
  display: "flex",
  justifyContent: "center",
  marginTop: 40,
};

const centerCard = {
  width: 350,
  padding: 25,
  background: "#f9f9f9",
  borderRadius: 10,
  border: "1px solid #ddd",
};

const switchBtn = {
  width: "100%",
  marginTop: 10,
  padding: 10,
  background: "#17a2b8",
  color: "white",
  border: "none",
  borderRadius: 5,
};

const logoutBtn = {
  padding: "8px 12px",
  background: "#dc3545",
  color: "#fff",
  borderRadius: 5,
  border: "none",
  marginBottom: 15,
};

const tabContainer = {
  display: "flex",
  gap: 10,
  marginBottom: 10,
};

const tabStyle = {
  padding: "8px 15px",
  background: "#e2e3e5",
  borderRadius: 5,
  cursor: "pointer",
};

const activeTabStyle = {
  padding: "8px 15px",
  background: "#007bff",
  color: "white",
  borderRadius: 5,
};
