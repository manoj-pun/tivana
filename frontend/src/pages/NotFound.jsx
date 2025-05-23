import React from "react";
import { Link } from "react-router-dom";
import notfound from "../assets/404.svg"; // Update the path to your actual image file

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <img src={notfound} alt="Page not found" className="mb-4 w-64" />
      <h1 className="text-2xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-green-600 mb-4">The page you're looking for doesn't exist.</p>
      <Link to="/home" className="text-white bg-green-600 rounded p-2 font-semibold">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
