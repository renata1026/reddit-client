import React, { useState } from 'react';
import { API } from '../lib/index';
import { useOutletContext, useNavigate } from 'react-router-dom';

const Register = () => {
  const { user, setUser } = useOutletContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegister, setRegister] = useState(false);

  const { setToken } = useOutletContext();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setUser(`You are now registered ${user}`);

    const res = await fetch(`${API}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
    // Redirect the user to the home page
    navigate('/');
    setRegister(true);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        {isRegister ? (
          <div>
            <h5 className="text-2xl font-bold text-green-600 mb-4">
              Registration Successful
            </h5>
            <p className="text-green-600">You are now registered!</p>
          </div>
        ) : (
          <form onSubmit={handleRegister}>
            <h1 className="text-2xl font-bold mb-4">Register</h1>
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
              className="w-full bg-red-500 text-white py-2 rounded-full hover:bg-red-600"
            >
              Register
            </button>
          </form>
        )}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Register;
