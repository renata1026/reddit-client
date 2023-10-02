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
import Subreddit from './components/Subreddit.jsx'; // Updated component name
import CreateSubredditPost from './components/CreateSubredditPost.jsx';
import DeleteSubredditPost from './components/DeleteSubredditPost.jsx';
import Vote from './components/Vote.jsx';
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
      { path: 'vote/:postId', element: <Vote /> },
      {
        path: 'subreddit/:subredditId',
        element: <Subreddit />,
      },
      {
        path: 'subreddit/:subredditId/create-subreddit-post',
        element: <CreateSubredditPost />,
      },
      {
        path: 'subreddit/:subredditId/delete-subreddit-post/:postId',
        element: <DeleteSubredditPost />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
