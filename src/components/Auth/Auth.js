import React, { useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import SignupForm from "../SignupForm/SignupForm";
import Styles from "./Auth.module.css"; 

function Auth() {
  const [user, setUser] = useState(null); // State to track the logged-in user
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isSignupVisible, setIsSignupVisible] = useState(false);

  // Handle login action
  function handleLogin(loggedInUser) {
    setUser(loggedInUser);  // Update user state
    setIsLoginVisible(false);  // Close login form after successful login
  }

  // Handle signup action
  function handleSignup(newUser) {
    setUser(newUser);  // Update user state
    setIsSignupVisible(false);  // Close signup form after successful signup
  }

  return (
    <div className={Styles["auth-container"]}>
      {user ? (
        <div id="message">Welcome, {user.name}!</div>
      ) : (
        <div>
          <button onClick={() => setIsLoginVisible(!isLoginVisible)}>Login</button>
          <button onClick={() => setIsSignupVisible(!isSignupVisible)}>Sign Up</button>

          {isLoginVisible && (
            <div className={Styles["form-container"]}>
              <div className={Styles["form-content"]}>
                <button className={Styles["close-button"]} onClick={() => setIsLoginVisible(false)}>x</button>
                <LoginForm onLogin={handleLogin} />
              </div>
            </div>
          )}

          {isSignupVisible && (
            <div className={Styles["form-container"]}>
              <div className={Styles["form-content"]}>
                <button className={Styles["close-button"]} onClick={() => setIsSignupVisible(false)}>x</button>
                <SignupForm onSignup={handleSignup} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Auth;
