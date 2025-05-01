import React, { useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { AppContext } from "./context/AppContext";
import Search from "./components/Search";
import Notifications from "./components/Notifications";
import Menu from "./components/Menu";
import Send from "./components/Send";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Followers from "./components/Followers";
import Following from "./components/Following";
import Comment from "./components/Comment";
import UserUploadedPosts from "./components/UserUploadedPosts";
import UserSavedPosts from "./components/UserSavedPosts";
import Login from "./pages/Login";
import {ToastContainer} from "react-toastify"

const App = () => {
  const location = useLocation();
  const { pathname } = location;
  const { showSearch,showNotifications,showMenu,showSend,showFollowers,showFollowing,showComment,showUserUploadedPosts,showUserSavedPosts,} = useContext(AppContext);

  const isLoginPage = pathname === "/login";

  return (
    <div className="flex">

      <ToastContainer/>

      {!isLoginPage && <Sidebar />}

      <div className={`flex-1 ${!isLoginPage ? "ml-[250px] max-sm:ml-[70px]" : ""}`}>
        {showSearch && <Search />}
        {showNotifications && <Notifications />}
        {showMenu && <Menu />}
        {showSend && <Send />}
        {showFollowers && <Followers />}
        {showFollowing && <Following />}
        {showComment && <Comment />}
        {showUserUploadedPosts && <UserUploadedPosts />}
        {showUserSavedPosts && <UserSavedPosts />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/:username" element={<Profile />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
