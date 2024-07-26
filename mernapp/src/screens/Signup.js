import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', geolocation: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting signup form:", credentials);

    const response = await fetch('http://localhost:5000/api/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation
      })
    });

    const json = await response.json();
    console.log("Signup response:", json);

    if (!json.success) {
      alert('Enter valid Credentials');
    } else {
      navigate('/login');
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
                <h2 className="card-title text-center mb-4">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={credentials.name}
                      onChange={onChange}
                      required
                    />
                  </div>
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
                    <div id="emailHelp" className="form-text">
                      We'll never share your email with anyone else.
                    </div>
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
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="geolocation"
                      value={credentials.geolocation}
                      onChange={onChange}
                      id="exampleInputPassword1"
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-success w-100">
                    Submit
                  </button>
                </form>
                <div className="text-center mt-3">
                  <Link to="/login" className="btn btn-link">
                    Already a user
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
