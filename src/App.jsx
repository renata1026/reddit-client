import React, { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import { API } from './lib/index';
// import Post from './components/Post';

import Footer from './components/Footer';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [subreddits, setSubreddits] = useState([]);
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  const [children, setChildren] = useState([]);

  async function fetchUser() {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      setToken(localToken);
    }
    if (!token) {
      return;
    }
    const res = await fetch(`${API}/users/token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await res.json();
    if (info.success) {
      setUser(info.user);
    }
  }
  async function fetchPosts() {
    const res = await fetch(`${API}/posts`);
    const info = await res.json();
    if (info.success) {
      setPosts(info.posts);
    }
  }

  async function fetchSubreddits() {
    const res = await fetch(`${API}/subreddits`);
    const info = await res.json();
    if (info.success) {
      setSubreddits(info.subreddits);
    }
  }

  useEffect(() => {
    fetchUser();
    fetchPosts();
    fetchSubreddits();
  }, [token]);

  const { postId } = useParams();

  const findPost = posts.find((_post) => _post.id === postId);

  return (
    <div>
      <Navbar
        user={user}
        setUser={setUser}
        setToken={setToken}
        subreddits={subreddits}
      />
      <Outlet
        context={{
          posts,
          setPosts,
          token,
          fetchPosts,
          setToken,
          user,
          setUser,
          subreddits,
          fetchSubreddits,
          //   fetchChildren,
          children,
        }}
      />
      {/* <Post /> */}
      <Footer />
    </div>
  );
};

export default App;
