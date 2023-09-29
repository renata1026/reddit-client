import React, { useState } from 'react';
import { API } from '../lib';
import Button from './Button';
import { useOutletContext, useNavigate } from 'react-router-dom';
import Comments from './Comments';

const Subreddit = () => {
  const navigate = useNavigate();
  const { token, fetchSubreddits } = useOutletContext();
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    const res = await fetch(`${API}/subreddits`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
      }),
    });

    const info = await res.json();

    if (!info.success) {
      setError(info.error);
      setSuccessMessage('');
    } else {
      setName(''); // Clear input field
      fetchSubreddits();
      setSuccessMessage('Subreddit created successfully.');
    }
  }

  return (
    <div className="container mx-auto p-4 bg-gray-200 mt-5 ml-80">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        style={{ width: '60%' }}
        onSubmit={handleSubmit}
      >
        <div className="mb-4 mt-4">
          <input
            className="border rounded w-full py-2 px-3"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Subreddit Name"
          />
        </div>

        <div className="mb-6 flex justify-end">
          <Button />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
      </form>
      <Comments />
    </div>
  );
};

export default Subreddit;
