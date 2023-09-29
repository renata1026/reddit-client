import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { API } from '../lib';
import { useOutletContext, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const DeletePost = () => {
  const { postId } = useParams();

  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');
  const { token, fetchPosts } = useOutletContext();

  const navigate = useNavigate();

  useEffect(() => {
    // Trigger SweetAlert when the component mounts
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
        // Redirect or handle cancel action here
        navigate('/');
      }
    });
  }, []); // Empty dependency array to ensure this effect runs only once when the component mounts

  const handleDeletePost = async () => {
    setIsDeleting(true);
    setError('');

    const res = await fetch(`${API}/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await res.json();
    if (!info.success) {
      setError(info.error);
    } else {
      fetchPosts();
      navigate('/');
    }

    setIsDeleting(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold mb-4">Delete Post</h1>
      <p className="text-gray-600 mb-4">
        Please wait while we process your request...
      </p>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};
export default DeletePost;
