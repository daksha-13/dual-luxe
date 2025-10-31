import React, { useState, useEffect } from "react";
import usersData from "./Data/user.json";
import "./Login.css"; // ✅ Make sure this line exists

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loggedInCount, setLoggedInCount] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify(usersData));
    }
    if (!localStorage.getItem("loggedInUsers")) {
      localStorage.setItem("loggedInUsers", JSON.stringify([]));
    }

    const loggedInUsers = JSON.parse(localStorage.getItem("loggedInUsers"));
    setLoggedInCount(loggedInUsers.length);

    window.addEventListener("storage", () => {
      const updated = JSON.parse(localStorage.getItem("loggedInUsers")) || [];
      setLoggedInCount(updated.length);
    });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users"));
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      sessionStorage.setItem("currentUser", JSON.stringify(user));
      let loggedInUsers = JSON.parse(localStorage.getItem("loggedInUsers")) || [];

      if (!loggedInUsers.find((u) => u.username === user.username)) {
        loggedInUsers.push(user);
        localStorage.setItem("loggedInUsers", JSON.stringify(loggedInUsers));
      }

      setMessage(`Welcome, ${user.username}!`);
      setLoggedInCount(loggedInUsers.length);
    } else {
      setMessage("Invalid username or password");
    }
  };

  const handleLogout = () => {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    sessionStorage.removeItem("currentUser");

    let loggedInUsers = JSON.parse(localStorage.getItem("loggedInUsers")) || [];
    loggedInUsers = loggedInUsers.filter((u) => u.username !== currentUser.username);
    localStorage.setItem("loggedInUsers", JSON.stringify(loggedInUsers));

    setMessage("Logged out successfully");
    setUsername("");
    setPassword("");
    setLoggedInCount(loggedInUsers.length);
  };

  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  return (
    <div className="login-center">
      {currentUser ? (
        <div className="login-box">
          <h2>Welcome, {currentUser.username}</h2>
          <p>Currently logged in users: {loggedInCount}</p>
          <button onClick={handleLogout}>Logout</button>
          <p>{message}</p>
        </div>
      ) : (
        <form className="login-box" onSubmit={handleLogin}>
          <h2>Login</h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>

          <p>{message}</p>
          <p>Currently logged in users: {loggedInCount}</p>
        </form>
      )}
    </div>
  );
}
