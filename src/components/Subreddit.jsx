import React, { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import PostCard from './PostCard';
import DeleteRedditPost from './DeleteSubredditPost'; // Import the DeleteRedditPost component

const Subreddit = () => {
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

  const canDelete = (post) => {
    // Check if the user is the author of the post
    return user && user.id === post.authorId; // Adjust this condition based on your user data structure
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
            {canDelete(filteredPost) && (
              <DeleteRedditPost postId={filteredPost.id} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Subreddit;
