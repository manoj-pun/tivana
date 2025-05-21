import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import Comment from "./Comment";
import Dropdown from "./Dropdown";
import { useNavigate } from "react-router-dom";

const UserSavedPosts = () => {
  const {
    currentUser,
    selectedPost,
    setShowUserSavedPosts,
    postData,
    userData,
    likePost,
    unlikePost,
    savePost,
    unsavePost,
  } = useContext(AppContext);

  const [activeTab, setActiveTab] = useState("comments");
  const [postDetails, setPostDetails] = useState(null);
  const [savedPosts, setSavedPosts] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get all saved posts from postData
  useEffect(() => {
    if (userData?.savedPosts && postData) {
      const userSavedPosts = postData.filter((post) =>
        userData.savedPosts.includes(post._id)
      );
      setSavedPosts(userSavedPosts);
    }
  }, [userData, postData]);

  // Set post details when selectedPost changes
  useEffect(() => {
    if (selectedPost && postData) {
      const foundPost = postData.find((post) => post._id === selectedPost._id) || selectedPost;
      setPostDetails(foundPost);
    }
  }, [selectedPost, postData]);

  if (!currentUser || !userData) {
    return <div className="text-white text-center">Loading user data...</div>;
  }

  if (!postDetails) {
    return (
      <div className="text-white text-center">
        No saved post selected or post not found
      </div>
    );
  }

  const isLiked = userData?.likedPosts?.includes(postDetails._id) || false;
  const isSaved = userData?.savedPosts?.includes(postDetails._id) || false;
  const userProfileImage = postDetails.userId?.profileImage || assets.defaultprofile;
  const username = postDetails.userId?.username || "Unknown User";

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-2 md:p-4"
      role="dialog"
      aria-labelledby="saved-post-modal-title"
    >
      <div
        className="bg-[#1a1a1a] rounded-lg w-full h-full md:w-full md:max-w-5xl md:h-[85vh] md:max-h-[85vh] flex flex-col md:flex-row"
      >
        {/* Left: Image Section */}
        <div className={`${isMobile ? 'h-1/2' : 'w-1/2 h-full'} flex items-center justify-center overflow-hidden bg-black border border-[#262626]`}>
          <img
            src={postDetails.thumbnail || assets.pokhara}
            alt="Saved Post"
            className="max-w-full max-h-full object-contain p-1"
          />
        </div>

        {/* Right: Content Area */}
        <div className={`${isMobile ? 'h-1/2' : 'w-1/2 h-full'} flex flex-col`}>
          {/* Tab Buttons */}
          <div className="flex border-b border-gray-700 bg-[#1a1a1a] z-10">
            <button
              className={`flex-1 py-4 font-medium cursor-pointer ${
                activeTab === "comments"
                  ? "text-[#32CD32] border-b-2 border-[#32CD32]"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("comments")}
              aria-selected={activeTab === "comments"}
            >
              Comments
            </button>
            <button
              className={`flex-1 py-4 font-medium cursor-pointer ${
                activeTab === "dropdowns"
                  ? "text-[#32CD32] border-b-2 border-[#32CD32]"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("dropdowns")}
              aria-selected={activeTab === "dropdowns"}
            >
              Details
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden">
            {/* Comments Section */}
            <div
              className={`h-full ${activeTab === "comments" ? "block" : "hidden"}`}
            >
              <div className="h-full overflow-y-auto">
                <Comment isModal={false} />
              </div>
            </div>

            {/* Dropdowns Section */}
            <div
              className={`h-full flex flex-col ${
                activeTab === "dropdowns" ? "block" : "hidden"
              }`}
            >
              {/* Sticky Post Description */}
              {postDetails?.description && (
                <div className="sticky top-0 bg-[#1a1a1a] z-10 p-2">
                  <p className="text-white">{postDetails.description}</p>
                </div>
              )}

              {/* Scrollable Dropdowns */}
              <div className="flex-1 overflow-y-auto">
                {postDetails?.dropdowns?.length > 0 ? (
                  <Dropdown dropdowns={postDetails.dropdowns} />
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    {postDetails?.description
                      ? "No dropdowns available"
                      : "No details available"}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Close button */}
        <div className={`absolute ${isMobile ? 'top-2 right-2' : 'top-13 right-44'}`}>
          <img
            src={assets.cross_icon}
            alt="Close"
            className="w-5 cursor-pointer"
            onClick={() => setShowUserSavedPosts(false)}
            aria-label="Close modal"
          />
        </div>
      </div>
    </div>
  );
};

export default UserSavedPosts;