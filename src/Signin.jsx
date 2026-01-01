import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Token from './token';
import { withApi } from './apiConfig';
import './Signin.css';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const call = async () => {
    const raw = JSON.stringify({ email, password });

    try {
      const response = await fetch(withApi('/api/users/login'), {
        method: "POST",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: raw
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Login failed');
      }

      if (result.token) {
        Token.setToken(result.token);
      }
      if (result.user) {
        Token.setUser(result.user);
      }

      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    call();
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <input
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default Signin;
