// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupForm from './SignupForm';
import UserProfile from './UserProfile';
import './App.css';

function App() {
  const [userProfiles, setUserProfiles] = useState([]);

  const handleSignup = (userData) => {
    setUserProfiles([...userProfiles, userData]);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<SignupForm onSignup={handleSignup} />}
          />
          <Route
            path="/user-profile"
            element={<UserProfile userProfiles={userProfiles} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

