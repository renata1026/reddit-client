import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useOutletContext, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { API } from '../lib';

const DeleteRedditPost = () => {
  const { subredditId } = useParams();
  const { token, fetchSubreddits, user } = useOutletContext();
  const navigate = useNavigate();

  const [isDeletingReddit, setIsDeletingReddit] = useState(false);
  const [error, setError] = useState('');
  const isMounted = useRef(false);

  useEffect(() => {
    const handleDeleteRedditPost = async () => {
      setIsDeletingReddit(true);
      setError('');

      try {
        if (subredditId !== user.subredditId) {
          setError('You are not authorized to delete this subreddit.');
          setIsDeletingReddit(false);
          return;
        }

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

    // Trigger SweetAlert when the component mounts
    if (isMounted.current) {
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
    } else {
      isMounted.current = true;
    }
  }, [subredditId, token, fetchSubreddits, navigate, user]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold mb-4">Delete Subreddit</h1>
      {isDeletingReddit && <p className="text-gray-600 mb-4">Deleting...</p>}
      {error && (
        <div>
          <p className="text-red-500 mt-4">{error}</p>
          <button
            onClick={() => {
              navigate('/');
            }}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Back to Home
          </button>
          <Subreddit deleteSubredditPost={deleteSubredditPost} />
        </div>
      )}
    </div>
  );
};

export default DeleteRedditPost;
