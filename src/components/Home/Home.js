import React from 'react';
import "./Home.module.css"

const Home = () => {
  return (
    <div className="home">  {/* Add the "home" class to the div */}
      <h1>Welcome to JobVibe!</h1>
      <p>Your job search starts here.</p>
      <img src='https://img.freepik.com/free-photo/man-working-desk-top-view_23-2149762496.jpg?t=st=1731607527~exp=1731611127~hmac=c990d46c9a34fa903ce2553a4a48a9e36205e26cbb6a8ed9a5daacd36eadc0dc&w=740'/> {/* Add the button with cta-button class */}
    </div>
  );
};

export default Home;
