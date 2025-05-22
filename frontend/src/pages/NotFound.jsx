import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <img src={assets.notfound} alt="Page not found" className="mb-4" />
      <h1 className="text-2xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-green-600 mb-4">The page you're looking for doesn't exist.</p>
      <Link to="/home" className="text-white bg-green-600 rounded p-2 font-semibold">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;