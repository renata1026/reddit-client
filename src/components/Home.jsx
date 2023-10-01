// Home.js
import React, { useEffect } from 'react';
import { useOutletContext, Link, useNavigate } from 'react-router-dom';
import { FaComment, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { API } from '../lib';
import Vote from './Vote'; // Import the Vote component

const Home = () => {
  const navigate = useNavigate();
  const { posts, token, fetchPosts } = useOutletContext();

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleVote = (postId, voteValue) => {
    // Handle the vote action here, e.g., update the vote count in the Home component's state
    // You can implement the logic to update the vote count as needed
    console.log(`Vote received for post ${postId} with value ${voteValue}`);
  };

  return (
    <div className="container mx-auto p-4 overflow-hidden">
      <div className="flex justify-center">
        <div className="w-3/4">
          <div className="posts-container">
            {posts.map((post) => {
              return (
                <div
                  className="flex items-center justify-center min-h-[22vh]"
                  key={post.id}
                >
                  <div className="rounded-xl border p-5 shadow-md w-9/12 bg-white">
                    <div className="flex w-full items-center justify-between border-b pb-3">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-slate-400 bg-[url('https://i.pravatar.cc/32')]"></div>
                        <div className="text-lg font-bold text-slate-700">
                          Posted by u/{post.user.username}
                        </div>
                      </div>
                      <div className="flex items-center space-x-8">
                        <button className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold">
                          Category
                        </button>
                        <div className="text-xs text-neutral-500">
                          2 hours ago
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 mb-6">
                      <div className="mb-3 text-xl font-bold">{post.title}</div>
                      <div className="text-sm text-neutral-600">
                        {post.text}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-slate-500">
                      <div className="flex space-x-4 md:space-x-8">
                        <div className="flex cursor-pointer items-center transition hover:text-slate-600">
                          <FaComment className="mr-4 w-5 h-5" />
                          <span>125</span>
                        </div>
                        <div className="flex cursor-pointer items-center transition hover:text-slate-600">
                          {/* Render the Vote component */}
                          <Vote postId={post.id} onVote={handleVote} />
                        </div>
                      </div>

                      <div className="flex space-x-4 md:space-x-8">
                        <Link
                          to={`/edit-post/${post.id}`}
                          className="border-none outline-none bg-none"
                        >
                          <FaPencilAlt className="w-5 h-5 cursor-pointer hover:text-slate-600" />
                        </Link>
                        <Link
                          to={`/delete-post/${post.id}`}
                          className="border-none outline-none bg-none"
                        >
                          <FaTrashAlt className="w-5 h-5 cursor-pointer hover:text-slate-600" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
