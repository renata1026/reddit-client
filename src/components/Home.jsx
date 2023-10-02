import React, { useState, useEffect } from 'react';
import { useOutletContext, Link, useNavigate } from 'react-router-dom';
import { FaComment, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { API } from '../lib';
import Comments from './Comments';
import Vote from './Vote';
import PostCard from './PostCard';

const Home = () => {
  const navigate = useNavigate();
  const { posts, token, fetchPosts } = useOutletContext();
  const [isCommentExpanded, setIsCommentExpanded] = useState(false);
  const toggleCommentSection = () => {
    setIsCommentExpanded(!isCommentExpanded);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleVote = (postId, voteValue) => {
    console.log(`Vote received for post ${postId} with value ${voteValue}`);
  };

  return (
    <div className="container mx-auto p-4 overflow-hidden">
      <div className="flex justify-center">
        <div className="md:w-1/2">
          <div className="posts-container">
            {posts.map((post) => {
              return (
                <div
                  className="mb-4" // Add margin-bottom for gap between cards
                  key={post.id}
                >
                  <div className="rounded-xl border p-5 shadow-md bg-white">
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
                          <button
                            className="flex cursor-pointer items-center transition hover:text-slate-600"
                            onClick={() => {
                              toggleCommentSection();
                            }}
                          >
                            <FaComment className="w-4 h-4 md:w-5 md:h-5 mr-2" />{' '}
                            {/* Adjusted icon size */}
                            <span>Comment</span>
                          </button>
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
                          <FaPencilAlt className="w-4 h-4 md:w-5 md:h-5 cursor-pointer hover:text-slate-600" />{' '}
                          {/* Adjusted icon size */}
                        </Link>
                        <Link
                          to={`/delete-post/${post.id}`}
                          className="border-none outline-none bg-none"
                        >
                          <FaTrashAlt className="w-4 h-4 md:w-5 md:h-5 cursor-pointer hover:text-slate-600" />{' '}
                          {/* Adjusted icon size */}
                        </Link>
                      </div>
                    </div>
                    <div className="">
                      {isCommentExpanded ? (
                        <div>
                          <Comments postId={post.postId} />
                          <PostCard postId={post.postId} />
                        </div>
                      ) : (
                        ''
                      )}
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
