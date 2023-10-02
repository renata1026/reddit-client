import React, { useState, useEffect } from 'react';
import { API } from '../lib';
import { useOutletContext, useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
  const { token, fetchPosts, posts } = useOutletContext();
  const { postId } = useParams();

  const post = posts.find((_post) => _post.id === postId);

  const [title, setTitle] = useState(post.title);
  const [text, setText] = useState(post.text);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  async function handleEditPost(e) {
    e.preventDefault();
    setError('');

    // Make a PUT request to update the post
    const res = await fetch(`${API}/posts/${postId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        text,
      }),
    });
    // Handle errors here
    const info = await res.json();
    if (!info.success) {
      return setError(info.error);
    }

    setText('');
    setTitle('');

    // Fetch all posts again to update the UI
    fetchPosts();

    // Navigate to the home page
    navigate('/');
  }

  return (
    <div className="container mx-auto p-4  mt-5" style={{ marginLeft: '20em' }}>
      <form
        className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        style={{ width: '60%' }}
        onSubmit={handleEditPost}
      >
        <div className="mb-6 flex justify-end"></div>

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
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            type="submit"
          >
            Edit
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default EditPost;
