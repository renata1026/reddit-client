import React, { useState } from 'react';
import { API } from '../lib/index';
import { useOutletContext, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { setToken } = useOutletContext();

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    const res = await fetch(`${API}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const info = await res.json();
    if (!info.success) {
      return setError(info.error);
    }
    setToken(info.token);
    localStorage.setItem('token', info.token);
    navigate('/');
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96 h-auto">
        <form onSubmit={handleLogin}>
          <h1 className="text-2xl font-bold mb-4">Login</h1>
          <p className="text-sm text-gray-500 mb-4">
            By continuing, you agree to our User Agreement and Privacy Policy.
          </p>
          <div className="mb-4">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
              className="border rounded-full w-full p-3 bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="border rounded-full w-full p-3 bg-gray-100"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600"
          >
            Login
          </button>
          {error && <p className="text-sm text-red-500 mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
