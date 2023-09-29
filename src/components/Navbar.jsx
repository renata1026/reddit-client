import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaReddit, FaBars, FaSearch, FaPlus } from 'react-icons/fa';
import Sidebar from './Sidebar'; // Import the Sidebar component
import { useNavigate } from 'react-router-dom';

export default function Navbar({ user, setToken, setUser, subreddits }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Set initial state to true for desktop
  const navigate = useNavigate();

  function handleLogout() {
    setToken('');
    setUser({});
    localStorage.removeItem('token');
  }

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    // Handle search functionality here
    console.log('Search query:', searchQuery);
  };

  // Function to toggle the Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClick = () => {
    navigate('/create-post');
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);

      // Open the sidebar by default on desktop screens
      setIsSidebarOpen(width > 768);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <div className="nav-menu bg-white shadow-md relative z-10">
        <div className="px-4 py-2 mx-auto md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="relative flex items-center justify-between">
            {screenWidth <= 768 && ( // Only show the sidebar toggle button on mobile
              <button
                onClick={toggleSidebar}
                className={`p-2 focus:outline-none`}
              >
                <FaBars className="w-6 h-6 text-gray-800 cursor-pointer" />
              </button>
            )}
            <Link
              to="/"
              aria-label="Reddit"
              title="Reddit"
              className="flex items-center text-gray-800"
            >
              <FaReddit className="w-8 h-8 text-red-500" />
              <span className="text-2xl font-semibold ml-2">reddit</span>
            </Link>
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search Reddit"
                className="w-80 p-2 text-gray-800 border border-gray-300 focus:ring focus:ring-red-500 rounded-full bg-search-input  text-center"
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
              <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                <FaSearch
                  onClick={handleSearchSubmit}
                  className="text-gray-500 cursor-pointer"
                />
              </div>
            </div>
            <button
              onClick={handleClick}
              className="flex items-center space-x-8"
            >
              <FaPlus className="text-xl" />
              <span>Create a Post</span>
            </button>
            <ul className="flex items-center space-x-8">
              {!user?.id ? (
                <>
                  <li>
                    <Link
                      to="/login"
                      aria-label="Login"
                      title="Login"
                      className="font-medium tracking-wide text-gray-300 hover:text-red-500 rounded-full p-2"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded-full bg-red-500 hover:bg-red-600 focus:shadow-outline focus:outline-none"
                      aria-label="Sign up"
                      title="Sign up"
                    >
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="text-black">Welcome {user.username}</li>
                  <li>
                    <Link
                      onClick={handleLogout}
                      to="/"
                      className="font-medium tracking-wide text-gray-300 hover:text-red-500 rounded-full p-2"
                    >
                      Logout
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      {isSidebarOpen && <Sidebar subreddits={subreddits} />}
    </div>
  );
}