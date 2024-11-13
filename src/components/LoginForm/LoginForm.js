import React, { useState } from "react";
// import styles from './Login.module.css';

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    // Fetch users from the server
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((users) => {
        // Find the user with the entered email and password
        const user = users.find(
          (user) => user.email === email && user.password === password
        );

        if (user) {
          // Call the onLogin callback with the user data
          onLogin(user);
        } else {
          // Set an error message if credentials are invalid
          setError("Invalid email or password");
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError("Something went wrong. Please try again.");
      });
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;






