import React from 'react';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#f2f2f5', // Change the background color
    color: '#ffffff', // Change the text color
    position: 'fixed', // Position the footer at the bottom of the viewport
    left: 0,
    bottom: 0,
    width: '100%',
    zIndex: '999', // Ensure it appears above other content
  };

  const centerContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: '100%', // Center vertically within the footer
    width: '100%',
  };

  return (
    <footer style={footerStyle}>
      <div className="container p-6">
        <div style={centerContainerStyle}>
          <p className="mb-4">
            <span className="mr-4  text-gray-800">Register for free</span>
            <button
              type="button"
              className="bg-red-500 text-white py-2 px-8 rounded-full hover:bg-red-600"
            >
              Sign up!
            </button>
          </p>
        </div>
      </div>

      {/* Copyright section */}
      <div className="w-full p-4 text-center bg #f2f2f5 text-gray-800">
        © 2023 Copyright:
        <a className="text-gray-800" href="https://tailwind-elements.com/">
          Reddit Clone - Renata Reinartz
        </a>
      </div>
    </footer>
  );
};

export default Footer;
