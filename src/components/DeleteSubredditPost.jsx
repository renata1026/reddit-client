import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useOutletContext, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { API } from '../lib';
import PostCard from './PostCard'; // Import the PostCard component from the correct path

const DeleteRedditPost = () => {
  const { subredditId } = useParams();
  const { token, fetchSubreddits, user } = useOutletContext();
  const navigate = useNavigate();

  const [isDeletingReddit, setIsDeletingReddit] = useState(false);
  const [error, setError] = useState('');
  const isMounted = useRef(false);

  const canDeleteReddit = (post) => {
    // Check if the user is the author of the post
    return subredditId === post.subredditId;
  };

  const handleDeleteRedditPost = async () => {
    setIsDeletingReddit(true);
    setError('');

    try {
      const res = await fetch(`${API}/subreddits/${subredditId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const info = await res.json();
      if (!info.success) {
        setError('An error occurred while deleting the subreddit.');
      } else {
        Swal.fire({
          title: 'Success!',
          text: 'The subreddit has been deleted.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          fetchSubreddits();
          navigate('/');
        });
      }
    } catch (error) {
      setError('An error occurred while deleting the subreddit.');
    }

    setIsDeletingReddit(false);
  };

  useEffect(() => {
    // Trigger SweetAlert when the component mounts
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this subreddit!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e53e3e',
      cancelButtonColor: '#63b3ed',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteRedditPost();
      } else {
        setError('Subreddit deletion cancelled.');
        // Add a back button to the home page
        navigate('/');
      }
    });
  }, [subredditId, token, fetchSubreddits, navigate, user]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold mb-4">Delete Post</h1>
      {isDeletingReddit && <p className="text-gray-600 mb-4">Deleting...</p>}
      {error && (
        <div>
          <div className="text-center">
            <p className="text-red-500 mt-4">{error}</p>
            <button
              onClick={() => {
                navigate('/');
              }}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-center"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
      <PostCard
        handleDeleteRedditPost={handleDeleteRedditPost}
        subredditId={subredditId}
      />
    </div>
  );
};

export default DeleteRedditPost;
