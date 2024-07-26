import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Submitting login form:", credentials);

    const response = await fetch('http://localhost:5000/api/loginuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    });

    const json = await response.json();
    console.log("Login response:", json);
    setIsSubmitting(false);

    if (!json.success) {
      alert('Enter valid Credentials');
    } else {
      localStorage.setItem('userEmail', credentials.email);
      localStorage.setItem('authToken', json.authToken);
      navigate('/');
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div style={{ backgroundColor: '#ebebf0', minHeight: '100vh', display: 'flex' }}>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={credentials.email}
                      onChange={onChange}
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={credentials.password}
                      onChange={onChange}
                      id="exampleInputPassword1"
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </form>
                <div className="text-center mt-3">
                  <Link to="/signup" className="btn btn-link">
                    New User? Signup
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
