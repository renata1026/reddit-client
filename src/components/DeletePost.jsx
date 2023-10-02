import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useOutletContext, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { API } from '../lib';

const DeletePost = () => {
  const { postId } = useParams();
  const { token, fetchPosts, userId } = useOutletContext();
  const navigate = useNavigate();

  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');
  const isMounted = useRef(false);

  const canDelete = (post) => {
    // Check if the user is the author of the post
    return userId === post.userId;
  };

  useEffect(() => {
    const handleDeletePost = async () => {
      setIsDeleting(true);
      setError('');

      try {
        const res = await fetch(`${API}/posts/${postId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const info = await res.json();
        if (!info.success) {
          setError('An error occurred while deleting the post.');
        } else {
          Swal.fire({
            title: 'Success!',
            text: 'The post has been deleted.',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            fetchPosts();
            navigate('/');
          });
        }
      } catch (error) {
        setError('An error occurred while deleting the post.');
      }

      setIsDeleting(false);
    };

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this post!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e53e3e',
      cancelButtonColor: '#63b3ed',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeletePost();
      } else {
        setError('Post deletion cancelled.');
        // Add a back button to the home page
        navigate('/');
      }
    });
    /*} else {
      isMounted.current = true;
    }*/
  }, [postId, token, userId, fetchPosts, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold mb-4">Delete Post</h1>
      {isDeleting && <p className="text-gray-600 mb-4">Deleting...</p>}
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
    </div>
  );
};

export default DeletePost;
