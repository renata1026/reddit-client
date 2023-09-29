import React, { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import PostCard from './PostCard';

const SubredditPost = () => {
  const { token, fetchPosts, posts } = useOutletContext();
  const { subredditId } = useParams();
  console.log(posts);
  const [filteredPosts, setFilteredPosts] = useState([]);
  useEffect(() => {
    setFilteredPosts(
      posts.filter((post) => {
        return post.subredditId === subredditId;
      })
    );
  }, [filteredPosts]);
  return (
    <div className="relative h-32">
      {filteredPosts.map((filteredPost) => {
        return (
          <div>
            <PostCard title={filteredPost.title} text={filteredPost.text} />
          </div>
        );
      })}
    </div>
  );
};

export default SubredditPost;
