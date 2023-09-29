import React, { useState } from 'react';
import { API } from '../lib';
import { FaImage, FaBook, FaLink, FaPoll } from 'react-icons/fa';
import Button from './Button';
import { useOutletContext, useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const navigate = useNavigate();
  const { token, fetchPosts, fetchSubreddits, subreddits } = useOutletContext();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [selectSubreddit, setSelectSubreddit] = useState('');
  const [error, setError] = useState('');

  // Function to create posts on the server
  async function handleSubmit(e) {
    e.preventDefault();
    setError(''); // Clear any previous errors

    if (!selectSubreddit) {
      setError('Please select a category.'); // Display an error if no subreddit is selected
      return;
    }

    const res = await fetch(`${API}/posts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        text,
        subredditId: selectSubreddit,
      }),
    });

    const info = await res.json();

    if (!info.success) {
      setError(info.error);
    } else {
      // Clear input fields
      setTitle('');
      setText('');
      // Call fetchPosts and fetchSubreddits here
      fetchPosts();
      fetchSubreddits();
      //Navigate to the home page
      navigate('/');
    }
  }

  return (
    <div
      className="container mx-auto p-4 bg-#DAE0E6"
      mt-5
      style={{ marginLeft: '20em' }}
    >
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        style={{ width: '60%' }}
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label htmlFor="subredditSelect">Select Subreddit:</label>
          <select
            id="subredditSelect"
            className="border rounded w-full py-2 px-3"
            onChange={(e) => setSelectSubreddit(e.target.value)}
            value={selectSubreddit}
          >
            <option value="">Select a Subreddit</option>
            {subreddits.map((_subreddit) => (
              <option key={_subreddit.id} value={_subreddit.id}>
                {_subreddit.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-around border border-gray-300 p-4">
          <button className="post flex items-center space-x-2">
            <i className="text-xl">
              <FaBook />
            </i>
            <span>Post</span>
          </button>
          <button className="Image & Video flex items-center space-x-2">
            <i className="text-xl">
              <FaImage />
            </i>
            <span>Image & Video</span>
          </button>
          <button className="Link flex items-center space-x-2">
            <i className="text-xl">
              <FaLink />
            </i>
            <span>Link</span>
          </button>
          <button className="Poll flex items-center space-x-2">
            <i className="text-xl">
              <FaPoll />
            </i>
            <span>Poll</span>
          </button>
        </div>

        <div className="mb-4 mt-4">
          <input
            className="border rounded w-full py-2 px-3"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Title"
          />
        </div>
        <div className="mb-4">
          <textarea
            className="border rounded w-full py-2 px-3"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Text"
          />
        </div>

        <div className="mb-6 flex justify-end">
          <Button />
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
