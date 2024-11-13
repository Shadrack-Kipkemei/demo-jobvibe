import React, { useState } from "react";
import LoginForm from "./components/LoginForm/LoginForm";
import SignupForm from "./components/SignupForm/SignupForm";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isSignupVisible, setIsSignupVisible] = useState(false);

  function handleLogin(loggedInUser) {
    setUser(loggedInUser);
    setIsLoginVisible(false); // Close the login form after login
  }

  function handleSignup(newUser) {
    setUser(newUser);
    setIsSignupVisible(false); // Close the signup form after signup
  }

  function toggleLoginForm() {
    setIsLoginVisible(!isLoginVisible);
  }

  function toggleSignupForm() {
    console.log("Toggling signup form")
    setIsSignupVisible(!isSignupVisible);
  }

  return (
    <div className="app">
      <Navbar onLoginClick={toggleLoginForm} onSignupClick={toggleSignupForm} />
      {user ? (
        <div>Welcome, {user.name}!</div>
      ) : (
        <div>{/* Empty div for spacing */}</div>
      )}
      {isLoginVisible && (
        <div className="login-overlay">
          <div className="login-modal">
            <button className="close-button" onClick={toggleLoginForm}>x</button>
            <LoginForm onLogin={handleLogin} />
          </div>
        </div>
      )}
      {isSignupVisible && (
        <div className="overlay">
          <div className="modal">
            <button className="close-button" onClick={toggleSignupForm}>x</button>
            <SignupForm onSignup={handleSignup} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
