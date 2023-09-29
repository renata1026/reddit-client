import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import CreatePost from './components/CreatePost.jsx';
import Home from './components/Home.jsx';
import EditPost from './components/EditPost.jsx';
import DeletePost from './components/DeletePost.jsx';
import Subreddit from './components/Subreddit.jsx';
import SubredditPost from './components/SubredditPost.jsx';
import DeleteRedditPost from './components/DeleteRedditPost.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'create-post', element: <CreatePost /> },
      { path: 'edit-post/:postId', element: <EditPost /> },
      { path: 'delete-post/:postId', element: <DeletePost /> },
      { path: 'subreddit/:subredditId', element: <SubredditPost /> },
      { path: 'delete-subreddit/:postId', element: <DeleteRedditPost /> },
      //   { path: 'post', element: <Post /> },
      //   { path: 'posts:userId', element: <User /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
