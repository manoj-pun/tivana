import React, { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { assets, homeData } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Sidebar = () => {
  const {
    setShowSearch,
    showSearch,
    setShowNotifications,
    setShowMenu,
    showMenu,
    activeNavLink,
    setActiveNavLink,
    userData,
  } = useContext(AppContext);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.substring(1); // Remove leading '/'

    if (path === "" || path === "home") {
      setActiveNavLink("home");
    } else if (path === "explore") {
      setActiveNavLink("explore");
    } else if (path === "messages") {
      setActiveNavLink("messages");
    } else if (path === "notifications") {
      setActiveNavLink("notifications");
    } else if (path === "upload-post"){
      setActiveNavLink("upload-post")
    } else if (path === "menu") {
      setActiveNavLink("menu");
    } else {
      setActiveNavLink("profile");
    }
  }, [location.pathname, setActiveNavLink]);

  // Function to handle NavLink clicks
  const handleNavLinkClick = (navLink, path) => {
    setActiveNavLink(navLink);
    setShowSearch(false);
    setShowNotifications(false);
    setShowMenu(false);
    navigate(path);
  };

  // Function to handle Search div click
  const handleSearchClick = () => {
    setActiveNavLink("search");
    setShowSearch(!showSearch);
    setShowNotifications(false);
    setShowMenu(false);
  };

  // Function to handle Notifications div click
  const handleNotificationsClick = () => {
    setActiveNavLink("notifications");
    setShowSearch(false);
    setShowNotifications(true);
    setShowMenu(false);
  };

  // Function to handle Menu div click
  const handleMenuClick = () => {
    setActiveNavLink("menu");
    setShowSearch(false);
    setShowNotifications(false);
    setShowMenu(!showMenu);
  };

  // Function to handle Profile div click
  const handleProfileClick = (username) => {
    setActiveNavLink("profile");
    setShowSearch(false);
    setShowNotifications(false);
    setShowMenu(false);
    navigate(`/${username}`);
  };

  return (
    <div className="flex items-start fixed bg-[#212121]">
      <div className="inline-block min-h-screen border-r-[#262626] border-r-1 w-[250px] max-sm:w-[70px]">
        <ul className="flex flex-col items-start p-2 space-y-2">
          <div className="flex items-center p-3 max-sm:p-0 max-sm:flex max-sm:justify-center gap-2 w-full mt-6 mb-2 h-20">
            <img onClick={() => navigate("/home")}
              src={assets.logo}
              alt=""
              className="w-10 h-8 sm:hidden rounded cursor-pointer"
            />
            <img src={assets.logoMain} alt="" onClick={() => navigate("/home")} className="max-sm:hidden pl-11 cursor-pointer w-40 h-20"/>
          </div>

          {/* Home Div */}
          <div
            className={`flex items-center p-3 gap-2 w-full hover:bg-[#2e2d2d] rounded cursor-pointer ${
              activeNavLink === "home"
                ? "text-[#32CD32] font-semibold"
                : "text-white"
            }`}
            onClick={() => handleNavLinkClick("home", "/home")}
          >
            <img
              src={activeNavLink === "home" ? assets.homeFilled : assets.home}
              alt=""
              className="w-6 h-6"
            />
            <p className="max-sm:hidden ml-2">Home</p>
          </div>

          {/* Search Div */}
          <div
            onClick={handleSearchClick}
            className={`flex items-center p-3 gap-2 w-full hover:bg-[#2e2d2d] cursor-pointer rounded ${
              activeNavLink === "search"
                ? "text-[#32CD32] font-semibold"
                : "text-white"
            }`}
          >
            <img
              src={
                activeNavLink === "search" ? assets.searchFilled : assets.search
              }
              alt=""
              className="w-6 h-6"
            />
            <p className="max-sm:hidden ml-2">Search</p>
          </div>

          {/* Explore Div */}
          <div
            className={`flex items-center p-3 gap-2 w-full hover:bg-[#2e2d2d] rounded cursor-pointer ${
              activeNavLink === "explore"
                ? "text-[#32CD32] font-semibold"
                : "text-white"
            }`}
            onClick={() => handleNavLinkClick("explore", "/explore")}
          >
            <img
              src={
                activeNavLink === "explore"
                  ? assets.compassFilled
                  : assets.compass
              }
              alt=""
              className="w-6 h-6"
            />
            <p className="max-sm:hidden ml-2">Explore</p>
          </div>

          {/* Messages Div */}
          <div
            className={`flex items-center p-3 gap-2 w-full hover:bg-[#2e2d2d] rounded cursor-pointer ${
              activeNavLink === "messages"
                ? "text-[#32CD32] font-semibold"
                : "text-white"
            }`}
            onClick={() => handleNavLinkClick("messages", "/messages")}
          >
            <img
              src={
                activeNavLink === "messages" ? assets.chatFilled : assets.chat
              }
              alt=""
              className="w-6 h-6"
            />
            <p className="max-sm:hidden ml-2">Messages</p>
          </div>

          {/* Notifications Div */}
          <div
            onClick={handleNotificationsClick}
            className={`flex items-center p-3 gap-2 w-full hover:bg-[#2e2d2d] cursor-pointer rounded ${
              activeNavLink === "notifications"
                ? "text-[#32CD32] font-semibold"
                : "text-white"
            }`}
          >
            <img
              src={
                activeNavLink === "notifications"
                  ? assets.heartFilled
                  : assets.heart
              }
              alt=""
              className="w-6 h-6"
            />
            <p className="max-sm:hidden ml-2">Notifications</p>
          </div>

          {/* Create post div */}
          <div
            className={`flex items-center p-3 gap-2 w-full hover:bg-[#2e2d2d] rounded cursor-pointer ${
              activeNavLink === "upload-post"
                ? "text-[#32CD32] font-semibold"
                : "text-white"
            }`}
            onClick={() => handleNavLinkClick("upload-post", "/upload-post")}
          >
            <img
              src={
                activeNavLink === "upload-post" ? assets.createFilled : assets.create
              }
              alt=""
              className="w-6 h-6"
            />
            <p className="max-sm:hidden ml-2">Create</p>
          </div>

          {/* Profile Div */}
          <div className={`flex items-center p-3 gap-2 w-full hover:bg-[#2e2d2d] rounded cursor-pointer ${
              activeNavLink === "profile"
                ? "text-[#32CD32] font-semibold"
                : "text-white"}`} onClick={() => handleProfileClick(userData?.username)}>
            <img src={userData?.profileImage || assets.defaultprofile} alt="Profile" className="w-8 h-8 rounded-full object-cover max-sm:w-7 max-sm:h-7"/>
            <p className="max-sm:hidden">{userData?.username}</p>
          </div>

          {/* Menu Div */}
          <div
            onClick={handleMenuClick}
            className={`flex items-center p-3 gap-2 w-full hover:bg-[#2e2d2d] cursor-pointer rounded mt-16 ${
              activeNavLink === "menu"
                ? "text-[#32CD32] font-semibold"
                : "text-white"
            }`}
          >
            <img
              src={activeNavLink === "menu" ? assets.menuFilled : assets.menu}
              alt=""
              className="w-6 h-6"
            />
            <p className="max-sm:hidden ml-2">Menu</p>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;