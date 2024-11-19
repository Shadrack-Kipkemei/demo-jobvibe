import React, { useState } from "react";
import Styles from "./LoginForm.module.css";

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

    // Log the input values for debugging
    console.log("Logging in with:", { email, password });

    // Fetch users from the server
    fetch("https://json-server-template-5ash.onrender.com/users")
      .then((response) => response.json())
      .then((users) => {
        const user = users.find(
          (user) => user.email === email && user.password === password
        );

        if (user) {
          // Call the onLogin callback with the user data
          onLogin(user);  // Pass the logged-in user to the parent (App.js)
        } else {
          setError("Invalid email or password");
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError("Something went wrong. Please try again.");
      });
  }

  return (
    <form className={Styles["login-form"]} onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p className={Styles.error}>{error}</p>}
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
