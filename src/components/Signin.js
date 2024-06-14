import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Signin() {
  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the sign-in data to the server
      const response = await axios.post("http://localhost:3000/api/signin", {
        name: formData.name,
        password: formData.password,
      });

      // Handle the response from the server
      if (response.status === 200) {
        // Sign-in was successful
        // Store the name in local storage
        localStorage.setItem('name', response.data.user.name);

        // Retrieve the stored name from local storage
        const storedName = localStorage.getItem('name');
        console.log('Stored name in local storage:', storedName);

        // Redirect to home page
        window.location.href = "/home";
      } else {
        // Sign-in failed
        // Display error message to the user
        setError("Sign-in failed. Please try again.");
      }
    } catch (error) {
      // Handle any errors that occur during the sign-in process
      console.error("Error signing in:", error);
      setError("Sign-in failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h1 className="text-center mb-4">PlayFusion</h1>
              <h3 className="text-center">Sign In</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} />
                </div>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <button type="submit" className="btn btn-primary btn-block">Sign In</button>
              </form>
            </div>
            <div className="card-footer text-center">
              <p className="mb-0">Don't have an account? <Link to="/">Sign up</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
