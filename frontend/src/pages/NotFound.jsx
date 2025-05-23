import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import notfound from "../assets/404.svg"; // Update the path to your actual image file

const NotFound = () => {
  const { isLoggedIn } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#212121] text-white">
      <img src={notfound} alt="Page not found" className="mb-4 w-64" />
      <h1 className="text-2xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-green-600 mb-4">The page you're looking for doesn't exist.</p>
      <Link
        to={isLoggedIn ? "/home" : "/"}
        className="text-white bg-green-600 rounded p-2 font-semibold hover:bg-green-700 transition-colors"
      >
        {isLoggedIn ? "Go To Home" : "Go Back"}
      </Link>
    </div>
  );
};

export default NotFound;