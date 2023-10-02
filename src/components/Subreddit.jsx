import React, { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import PostCard from './PostCard';
import { FaTrashAlt } from 'react-icons/fa';

const Subreddit = ({ deleteSubredditPost }) => {
  const { token, fetchPosts, posts, user } = useOutletContext(); // Assume you have user information
  const { subredditId } = useParams();
  console.log(posts);
  const [filteredPosts, setFilteredPosts] = useState([]);
  useEffect(() => {
    setFilteredPosts(
      posts.filter((post) => {
        return post.subredditId === subredditId;
      })
    );
  }, [posts, subredditId]);

  const handleDeletePost = (postId) => {
    deleteSubredditPost(postId);
  };

  return (
    <div className="relative h-32">
      {filteredPosts.map((filteredPost) => {
        return (
          <div key={filteredPost.id}>
            <PostCard
              title={filteredPost.title}
              text={filteredPost.text}
              name={filteredPost.subreddit.name}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Subreddit;
