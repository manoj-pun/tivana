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

  const getPostData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(backendUrl + "/api/posts/get-all-posts");
      if (data.success) {
        setPostData(data.posts);
      } else {
        toast.error("Failed to fetch posts");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Like a post
  const likePost = async (postId) => {
    try {
      const { data } = await axios.post(backendUrl + `/api/user/like-post/${postId}`);
      if (data.message === "Post liked successfully") {
        toast.success(data.message);
        // Update postData to reflect the new like
        setPostData((prev) =>
          prev.map((post) =>
            post._id === postId
              ? { ...post, likedBy: [...post.likedBy, userData._id], likeCount: data.likeCount }
              : post
          )
        );
        // Update userData to reflect the liked post
        setUserData((prev) => ({
          ...prev,
          likedPosts: [...prev.likedPosts, postId],
        }));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error liking post");
    }
  };

  // Unlike a post
  const unlikePost = async (postId) => {
    try {
      const { data } = await axios.post(backendUrl + `/api/user/unlike-post/${postId}`);
      if (data.message === "Post unliked successfully") {
        toast.success(data.message);
        // Update postData to reflect the unlike
        setPostData((prev) =>
          prev.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  likedBy: post.likedBy.filter((id) => id !== userData._id),
                  likeCount: data.likeCount,
                }
              : post
          )
        );
        // Update userData to remove the unliked post
        setUserData((prev) => ({
          ...prev,
          likedPosts: prev.likedPosts.filter((id) => id !== postId),
        }));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error unliking post");
    }
  };

  // Save a post
  const savePost = async (postId) => {
    try {
      const { data } = await axios.post(backendUrl + `/api/user/save-post/${postId}`);
      if (data.message === "Post saved successfully") {
        toast.success(data.message);
        // Update postData to reflect the save
        setPostData((prev) =>
          prev.map((post) =>
            post._id === postId
              ? { ...post, savedBy: [...post.savedBy, userData._id], saveCount: data.saveCount }
              : post
          )
        );
        // Update userData to reflect the saved post
        setUserData((prev) => ({
          ...prev,
          savedPosts: [...prev.savedPosts, postId],
        }));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error saving post");
    }
  };

  // Unsave a post
  const unsavePost = async (postId) => {
    try {
      const { data } = await axios.post(backendUrl + `/api/user/unsave-post/${postId}`);
      if (data.message === "Post unsaved successfully") {
        toast.success(data.message);
        // Update postData to reflect the unsave
        setPostData((prev) =>
          prev.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  savedBy: post.savedBy.filter((id) => id !== userData._id),
                  saveCount: data.saveCount,
                }
              : post
          )
        );
        // Update userData to remove the unsaved post
        setUserData((prev) => ({
          ...prev,
          savedPosts: prev.savedPosts.filter((id) => id !== postId),
        }));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error unsaving post");
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getPostData();
    }
  }, [isLoggedIn]);

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
    postData,
    setPostData,
    getPostData,
    likePost,
    unlikePost,
    savePost,
    unsavePost,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};