import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    success: false,
    error: '',
  });

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
      if (formData.password !== formData.confirmPassword) {
        setFormData({ ...formData, error: 'Passwords do not match' });
        return;
      }

      const response = await axios.post("http://localhost:3000/api/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 201) {
        setFormData({ ...formData, success: true });
      } else {
        setFormData({ ...formData, error: response.data.error });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormData({ ...formData, error: error.response?.data?.error || 'Error submitting form' });
    }
    
  };

  if (formData.success) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="alert alert-success" role="alert">
              User created successfully! Please <Link to="/signin">sign in</Link>.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h1 className="text-center mb-4">PlayFusion</h1>
              <h3 className="text-center">Sign Up</h3>
            </div>
            <div className="card-body">
              {formData.error && <div className="alert alert-danger">{formData.error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input type="password" className="form-control" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
              </form>
            </div>
            <div className="card-footer text-center">
              <p className="mb-0">Already have an account? <Link to="/signin">Sign in</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
