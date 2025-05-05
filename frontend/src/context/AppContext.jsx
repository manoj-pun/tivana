import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [profileUser, setProfileUser] = useState(null); // New state for profile user data

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/is-auth");
      if (data.success) {
        setIsLoggedIn(true);
        await getUserData(); 
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/user-data");
      if (data.success) {
        setUserData(data.userData);
      } else {
        setIsLoggedIn(false);
        toast.error(data.message);
      }
    } catch (error) {
      setIsLoggedIn(false);
      toast.error(error.message);
    }
  };

  // New function to fetch profile data
  const fetchProfileData = async (username) => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/profile/${username}`);
      if (data.success) {
        setProfileUser(data.user);
        return data.user;
      } else {
        toast.error(data.message || "User not found");
        return null;
      }
    } catch (error) {
      toast.error("Failed to fetch profile. Please try again.");
      return null;
    }
  };

  const fetchPosts = async () => {
    try {
      setLoadingPosts(true);
      const { data } = await axios.get(backendUrl + "/api/post/get-posts");
      if (data.success) {
        setPosts(data.posts);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch posts");
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

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
  const [showUploadProfilePicture, setShowUploadProfilePicture] = useState(false);

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
    profileUser,
    setProfileUser,
    fetchProfileData, // Add the new function to context value
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
    showUploadProfilePicture, 
    setShowUploadProfilePicture,
    posts,
    setPosts,
    loadingPosts,
    setLoadingPosts,
    fetchPosts,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};