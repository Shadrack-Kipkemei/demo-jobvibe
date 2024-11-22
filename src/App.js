import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Contact from './components/Contact/Contact';
import Navbar from "./components/Navbar/Navbar";
import About from './components/About/About';
import Home from './components/Home/Home';
import SignupForm from './components/SignupForm/SignupForm';  
import LoginForm from './components/LoginForm/LoginForm'; 
import Jobs from './components/Jobs/Jobs';  

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [users, setUsers] = useState([]);  // Users data
  const [jobs, setJobs] = useState([]);    // Jobs data
  
  const navigate = useNavigate(); // Hook to navigate programmatically


  // Fetch jobs and users data from an API or local storage
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobsResponse = await fetch('https://json-server-template-5ash.onrender.com/jobs');
        const jobsData = await jobsResponse.json();
        setJobs(jobsData);

        const usersResponse = await fetch('https://json-server-template-5ash.onrender.com/users');
        const usersData = await usersResponse.json();
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching jobs or users data:", error);
      }
    };
    fetchData();
  }, []);


  const handleLogin = (user) => {
    setLoggedInUser(user);
    console.log('User logged in:', user);
    navigate("/jobs"); // redirect to jobs page after successful login
  };

  const handleSignup = (newUser) => {
    setLoggedInUser(newUser); 
    console.log('New user signed up:', newUser);
    navigate("/"); // Redirect to home page after successful signup
  };



  return (
    
    <div className="App">
      <h1>Welcome to JobVibe</h1>
      <Navbar/>

      <Routes>
       <Route path="/" element={<Home/>} />
       <Route path="/about" element={<About/>} />
       <Route path="/contact" element={<Contact/>} />
      
      {/* Add route for SignupForm */}
      <Route 
      path="/signup"
      element={<SignupForm onSignup={handleSignup}/>}
      />

      {/* Add route for LoginForm */}
      <Route 
      path='/login'
      element={<LoginForm onLogin={handleLogin}/>}
      />

      {/* Add route for jobs */}
      <Route 
      path='/jobs'
      element={<Jobs loggedInUser={loggedInUser} users={users} jobs={jobs} />}
      />
      </Routes>
      
     
     
      
     
    </div>
    
  );
}

export default App;
