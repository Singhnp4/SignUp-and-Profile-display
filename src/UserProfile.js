// src/UserProfile.js
import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    // Fetch user profiles from localStorage on component mount
    const storedUserProfiles = localStorage.getItem('users');
    setUserProfiles(storedUserProfiles ? JSON.parse(storedUserProfiles) : []);
  }, []);

  return (
    <div className="user-profiles">
      <div className="user-profiles-container">
      <h1>User Profiles</h1>
      <div className="user-profiles-grid">
      {userProfiles.map((user, index) => (
        <div key={index} className="user-profile-card">
          <img src="placeholder-image.jpg" alt="User-image" className="user-image" />
          <div className="user-details">
          {/* Render user details */}
          <h3>{user.name}</h3>
          <p>Mobile: {user.mobile}</p>
          <p>DOB: {user.dob}</p>
          <p>Email: {user.email}</p>
          </div>
        </div>
      ))}
      </div>
      </div>
    </div>
  );
};

export default UserProfile;

