import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-gray-700 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-gray-500 mb-6">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
      </div>
      <Link
        to="/"
        className="px-6 py-3 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-700 transition"
      >
        Go Back to Homepage
      </Link>
    </div>
  );
};

export default Error;
