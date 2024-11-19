import React, { useState } from "react";
import styles from "./SignupForm.module.css";

function SignupForm({ onSignup }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Create a new user object
    const newUser = {
      name,
      email,
      password,
      profile: {
        location: "",
        skills: [],
        experience: "",
        appliedJobs: [],
        savedJobs: [],
      },
    };

    // Check if the email is already taken
    fetch("https://json-server-template-5ash.onrender.com/users")
      .then((r) => r.json())
      .then((users) => {
        const userExists = users.some((user) => user.email === email);

        if (userExists) {
          setError("Email is already taken.");
        } else {
          // Post the new user to the server
          fetch("https://json-server-template-5ash.onrender.com/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          })
            .then((r) => r.json())
            .then((data) => {
              onSignup(data);  // Pass the new user to the parent (App.js)
            })
            .catch((error) => {
              console.error("Error creating user:", error);
              setError("Something went wrong. Please try again.");
            });
        }
      })
      .catch((error) => {
        console.error("Error creating users:", error);
        setError("Something went wrong. Please try again.");
      });
  }

  return (
    <form className={styles["signup-form"]} onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      {error && <p className={styles.error}>{error}</p>}
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={handleNameChange}
      />
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
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupForm;
