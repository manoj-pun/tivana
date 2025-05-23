import React, { useContext } from "react";
import { Routes, Route, Navigate, replace } from "react-router-dom";
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
import { ToastContainer } from "react-toastify";
import UploadPosts from "./pages/UploadPosts";
import UploadProfilePicture from "./components/UploadProfilePicture";
import EditProfile from "./components/EditProfile";
import Loading from "./components/Loading";
import DeletePost from "./components/DeletePost";
import NotFound from "./pages/NotFound";

const App = () => {
  const {
    isLoggedIn,
    showSearch,
    showNotifications,
    showMenu,
    showSend,
    showFollowers,
    showFollowing,
    showComment,
    showUserUploadedPosts,
    showUserSavedPosts,
    showUploadProfilePicture,
    isLoading,
    showDeletePost,
  } = useContext(AppContext);

  return (
    <>
      <ToastContainer />
      {isLoading && <Loading />}

      {isLoggedIn ? (
        <div className="flex">
          <Sidebar />
          <div className="flex-1 ml-[250px] max-sm:ml-[70px]">
            {showSearch && <Search />}
            {showNotifications && <Notifications />}
            {showMenu && <Menu />}
            {showSend && <Send />}
            {showFollowers && <Followers />}
            {showFollowing && <Following />}
            {showComment && <Comment />}
            {showUserUploadedPosts && <UserUploadedPosts />}
            {showUserSavedPosts && <UserSavedPosts />}
            {showUploadProfilePicture && <UploadProfilePicture />}
            {showDeletePost && <DeletePost />}

            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/upload-post" element={<UploadPosts />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/:username" element={<Profile />} />
              <Route path="*" element={<NotFound />} /> {/* Catch-all for logged-in users */}
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<NotFound/>} /> {/* Catch-all for non-logged-in users */}
        </Routes>
      )}
    </>
  );
};

export default App;