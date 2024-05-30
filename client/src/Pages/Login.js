import React, { useState } from 'react';
import '../css/Login.css';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from "react-toastify";

//login page
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

    // console.log(process.env.REACT_APP_API_URL)

    const successNotify = () => {
        toast.success("Login Successful", {
            position: "top-right",
            autoClose: 2000,
          });
    }

    const errorNotify = () => {
        toast.error("Login Failed", {
            position: "top-right",
            autoClose: 2000,
          });
    }

  const handleLogin = async(e) => {
    e.preventDefault();
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if(data.success){
            console.log(data)
            const userData = {
              token: data.token,
              userId: data.user
            };
            
            localStorage.setItem('user-data', JSON.stringify(userData));
            
            successNotify()
            setEmail('')
            setPassword('')
            navigate('/')
        
        } else {
            console.log(data.message)
            errorNotify()
        }
    } catch (error) {
        console.log("Error while login :",error)
        errorNotify()
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="signup-link">
          <p>Doesn't have an account? <Link to="/register">Create</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
