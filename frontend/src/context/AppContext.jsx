import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;

  const [activeNavLink, setActiveNavLink] = useState(
    localStorage.getItem("activeNavLink") || "home"
  );
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
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [postData, setPostData] = useState(null);

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
      // console.log(data)
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

  useEffect(() => {
    getAuthState();
  }, []);

  const getPostdata = async () => {
  try {
    setIsLoading(true);
    const { data } = await axios.get(backendUrl + "/api/posts/get-all-posts");
    console.log(data)
    if (data.success) {
      setPostData(data.posts)
    } else {
      toast.error("Failed to fetch posts");
    }
  } catch (error) {
    toast.error("Error fetching posts");
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};

useEffect(() => {
  getPostdata();
}, []);

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
    showUploadProfilePicture,
    setShowUploadProfilePicture,
    isLoading,
    setIsLoading,
    postData,setPostData,
    getPostdata
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
