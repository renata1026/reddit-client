import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { API } from '../lib';

const Vote = ({ postId }) => {
  const { token, user, posts } = useOutletContext();
  const [voteCount, setVoteCount] = useState(0);

  useEffect(() => {
    calculateVoteCount();
  }, [postId, posts]);

  const calculateVoteCount = () => {
    const post = posts.find((p) => p.id === postId);
    if (post) {
      const upvotes = post.upvotes ? post.upvotes.length : 0;
      const downvotes = post.downvotes ? post.downvotes.length : 0;
      setVoteCount(upvotes - downvotes);
    }
  };

  const handleVote = async (voteType) => {
    try {
      const postToUpdate = posts.find((p) => p.id === postId);

      if (!postToUpdate) {
        console.error('Post not found');
        return;
      }

      const isUpvote = voteType === 'upvote';
      const isDownvote = voteType === 'downvote';

      if (isUpvote || isDownvote) {
        const response = await fetch(
          `${API}/votes/${isUpvote ? 'upvotes' : 'downvotes'}/${postId}`,
          {
            method: isUpvote ? 'POST' : 'DELETE',
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              postId: postToUpdate.id,
            }),
          }
        );

        const data = await response.json();
        console.log(data);

        if (isUpvote) {
          if (!postToUpdate.upvotes) postToUpdate.upvotes = [];
          postToUpdate.upvotes.push({ userId: user.id });
        } else if (isDownvote) {
          if (!postToUpdate.downvotes) postToUpdate.downvotes = [];
          postToUpdate.downvotes.push({ userId: user.id });
        }

        calculateVoteCount();
      }
    } catch (error) {
      console.error(`Error handling ${voteType}:`, error);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        className="p-2 border rounded-full hover:bg-gray-100"
        onClick={() => handleVote('upvote')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
      <span className="text-2xl font-bold">{voteCount}</span>
      <button
        className="p-2 border rounded-full hover:bg-gray-100"
        onClick={() => handleVote('downvote')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </div>
  );
};

export default Vote;
