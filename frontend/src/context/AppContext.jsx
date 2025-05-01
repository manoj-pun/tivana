import React, { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios"

export const AppContext = createContext();

export const AppContextProvider = (props) => {

  axios.defaults.withCredentials = true;
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const [userData,setUserData] = useState(false)

  const getUserData = async() => {
    try{
      const {data} = await axios.get(backendUrl+"/api/user/user-data")
      console.log(data)
      data.success ? setUserData(data.userData) : toast.error(data.message)
    }catch(error){
      toast.error(data.message)
    }
  }

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
    isLoggedIn,setIsLoggedIn,
    userData,setUserData,
    getUserData,
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