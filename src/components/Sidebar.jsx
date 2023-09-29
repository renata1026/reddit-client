import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaChevronDown,
  FaHome,
  FaFire,
  FaTags,
  FaBuilding,
  FaBullhorn,
  FaQuestionCircle,
  FaBriefcase,
  FaNewspaper,
} from 'react-icons/fa';

const Sidebar = ({ subreddits }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        className="fixed inset-y-0 left-0 w-64 bg-white text-rgb-15-26-28 opacity-70 border-r border-gray-300 mt-16 transition-transform ease-in-out duration-300 transform font-reddit-sans"
        style={{ zIndex: 9 }}
      >
        <nav>
          <ul className="space-y-2 mt-10">
            <li className="px-4 py-2 flex items-center text-base">
              <FaHome className="mr-2" />
              Home
            </li>
            <li className="px-4 py-2 flex items-center border-b border-gray-500 text-base">
              <FaFire className="mr-2" />
              Popular
            </li>
            <li
              className={`px-4 py-2 flex items-center justify-between cursor-pointer ${
                isOpen ? 'open' : ''
              } text-base`}
              onClick={toggleSection}
            >
              <span>Topics</span>
              <button className="text-sm text-rgb-15-26-28">
                <FaChevronDown />
              </button>
            </li>

            {isOpen && (
              <>
                {subreddits.map((subreddit) => (
                  <li
                    className="subreddit px-4 py-2 flex items-center text-base"
                    key={subreddit.id}
                  >
                    <Link to={`subreddit/${subreddit.id}`}>
                      <FaTags className="mr-2" />
                      {subreddit.name}
                    </Link>
                  </li>
                ))}
              </>
            )}
            <li
              className={`px-4 py-2 flex items-center justify-between cursor-pointer ${
                isOpen ? 'open' : ''
              } text-sm border-b border-gray-500`}
              onClick={toggleSection}
            >
              <span>See more</span>
              <button className="text-xs text-gray-500"></button>
            </li>
          </ul>
        </nav>
        <nav>
          <ul className="space-y-2">
            <li
              className={`px-4 py-2 flex items-center justify-between cursor-pointer ${
                isOpen ? 'open' : ''
              } text-base`}
              onClick={toggleSection}
            >
              <span>RESOURCES</span>
              <button className="text-sm text-rgb-15-26-28">
                <FaChevronDown />
              </button>
            </li>
            {isOpen && (
              <>
                <li className="px-4 py-2 flex items-center text-base">
                  <FaBuilding className="mr-2" />
                  About Reddit
                </li>
                <li className="px-4 py-2 flex items-center =text-base">
                  <FaBullhorn className="mr-2" />
                  Advertise
                </li>
                <li className="px-4 py-2 flex items-center text-base">
                  <FaQuestionCircle className="mr-2" />
                  Help
                </li>
                <li className="px-4 py-2 flex items-center text-base">
                  <FaBriefcase className="mr-2" />
                  Careers
                </li>
                <li className="px-4 py-2 flex items-center text-base">
                  <FaNewspaper className="mr-2" />
                  Press
                </li>
              </>
            )}
            <li
              className={`px-4 py-2 flex items-center justify-between cursor-pointer ${
                isOpen ? 'open' : ''
              } text-sm`}
              onClick={toggleSection}
            >
              <span>See more</span>
              <button className="text-xs text-gray-500">
                <FaChevronDown />
              </button>
            </li>
          </ul>
        </nav>
        <div className="mt-auto px-4 py-2 text-rgb-15-26-28 text-xs">
          © 2023 Reddit Clone
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
