import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedLoggedIn = localStorage.getItem("isLoggedIn");
    return storedLoggedIn === "true" || false;
  });
  const [userData, setUserData] = useState(null); // Initialize userData to null

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/user-data");
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
        setUserData(null); // Clear userData on failure
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      setIsLoggedIn(false);
      localStorage.removeItem("isLoggedIn");
      setUserData(null); // Clear userData on error
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      getUserData();
    } else {
      setUserData(null); // Clear userData if not logged in
    }
  }, [isLoggedIn]); // Fetch user data when isLoggedIn changes

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  const [activeNavLink, setActiveNavLink] = useState(localStorage.getItem("activeNavLink") || "home");
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSend, setShowSend] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showComment, setShowComment] = useState(false);
  const [showUserUploadedPosts, setShowUserUploadedPosts] = useState(false);
  const [showUserSavedPosts, setShowUserSavedPosts] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
    activeNavLink,
    setActiveNavLink,
    showSearch,
    setShowSearch,
    showNotifications,
    setShowNotifications,
    showMenu,
    setShowMenu,
    showSend,
    setShowSend,
    showFollowers,
    setShowFollowers,
    showFollowing,
    setShowFollowing,
    currentUser,
    setCurrentUser,
    showComment,
    setShowComment,
    showUserUploadedPosts,
    setShowUserUploadedPosts,
    showUserSavedPosts,
    setShowUserSavedPosts,
    selectedPost,
    setSelectedPost,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};