import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
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
    activeNavLink, setActiveNavLink,
    showSearch, setShowSearch,
    showNotifications, setShowNotifications,
    showMenu, setShowMenu,
    showSend, setShowSend,
    showFollowers, setShowFollowers,
    showFollowing, setShowFollowing,
    currentUser, setCurrentUser,
    showComment, setShowComment,
    showUserUploadedPosts, setShowUserUploadedPosts,
    showUserSavedPosts,setShowUserSavedPosts,
    selectedPost, setSelectedPost,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};