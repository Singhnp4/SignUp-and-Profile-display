// src/SignupForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupForm = ({ onSignup }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    dob: '',
    email: '',
    password: '',
  });

  // State variables for field validity
  const [nameValid, setNameValid] = useState(false);
  const [mobileValid, setMobileValid] = useState(false);
  const [dobValid, setDobValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const navigate = useNavigate();

  const handleValidation = () => {
    setNameValid(!!formData.name);
    setMobileValid(!!formData.mobile && /^\d{10}$/.test(formData.mobile));
    setDobValid(!!formData.dob);
    setEmailValid(!!formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email));
    setPasswordValid(!!formData.password && formData.password.length >= 6);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    handleValidation();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nameValid && mobileValid && dobValid && emailValid && passwordValid) {
      // Save user details to localStorage
      const user = {
        name: formData.name,
        mobile: formData.mobile,
        dob: formData.dob,
        email: formData.email,
        password: formData.password,
      };
       // Retrieve existing users from localStorage
       const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

       // Save the new user
       localStorage.setItem('users', JSON.stringify([...existingUsers, user]));
 
    onSignup(formData);
    setFormData({
      name: '',
      mobile: '',
      dob: '',
      email: '',
      password: '',
    });
    // Redirect to user profile page after form submission
    navigate('/user-profile');
  }
  };

  return (
    <div className="signup-form">
      <h1>Signup Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        {!nameValid && <p className="error-message">Name is required</p>}

        <label htmlFor="mobile">Mobile Number:</label>
        <input type="tel" id="mobile" name="mobile" pattern="[0-9]{10}" value={formData.mobile} onChange={handleChange} required />
        {!mobileValid && <p className="error-message">Enter a valid 10-digit mobile number</p>}

        <label htmlFor="dob">Date of Birth:</label>
        <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required />
        {!dobValid && <p className="error-message">Date of Birth is required</p>}

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        {!emailValid && <p className="error-message">Enter a valid email address</p>}

        <label htmlFor="password">Password (min. 6 characters):</label>
        <input type="password" id="password" name="password" minLength="6" value={formData.password} onChange={handleChange} required />
        {!passwordValid && <p className="error-message">Password must be at least 6 characters long</p>}

        <button type="submit" disabled={!nameValid || !mobileValid || !dobValid || !emailValid || !passwordValid}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignupForm;



