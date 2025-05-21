import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import Comment from "./Comment";
import Dropdown from "./Dropdown";
import DeletePost from "./DeletePost";

const UserUploadedPosts = () => {
  const { currentUser, selectedPost, setShowUserUploadedPosts, postData,showDeletePost, setShowDeletePost } =
    useContext(AppContext);
  const [activeTab, setActiveTab] = useState("comments");
  const [postDetails, setPostDetails] = useState(null);

  useEffect(() => {
    if (selectedPost) {
      const foundPost = postData.find((post) => post._id === selectedPost._id);
      setPostDetails(foundPost || selectedPost);
    }
  }, [selectedPost, postData]);

  // Check if the current user is the post owner
  const isPostOwner = currentUser && selectedPost && currentUser._id === (selectedPost.userId?._id || selectedPost.userId);
  // console.log(
  //   'isPostOwner:', isPostOwner,
  //   'currentUser:', currentUser?._id,
  //   'selectedPost.userId:', selectedPost?.userId,
  //   'selectedPost.userId._id:', selectedPost?.userId?._id
  // );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div
        className="bg-[#1a1a1a] rounded-lg w-full max-w-5xl flex relative"
        style={{ height: "85vh", maxHeight: "85vh" }}
      >
        {/* Left: Image Section */}
        <div className="w-1/2 h-full flex items-center justify-center overflow-hidden bg-black border border-[#262626] relative">
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={ selectedPost?.thumbnail}
              alt="User Post"
              className="max-w-full max-h-full object-contain p-1"
            />
          </div>
          {/* Show "More" icon only if the current user is the post owner */}
          {isPostOwner && (
            <div
              onClick={() => setShowDeletePost(!showDeletePost)}
              className="absolute top-2 right-2 z-60"
            >
              <img
                src={assets.more}
                alt="More options"
                className="w-8 h-8 cursor-pointer"
              />
            </div>
          )}
        </div>

        {/* Right: Content Area */}
        <div className="w-1/2 flex flex-col h-full">
          {/* Tab Buttons */}
          <div className="flex border-b border-gray-700 sticky top-0 bg-[#1a1a1a] z-10">
            <button
              className={`flex-1 py-4 font-medium cursor-pointer ${
                activeTab === "comments"
                  ? "text-[#32CD32] border-b-2 border-[#32CD32]"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("comments")}
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

        {/* Close button (always visible) */}
        <div className="absolute -top-0 -right-8 z-60">
          <img
            src={assets.cross_icon}
            alt="Close"
            className="w-5 cursor-pointer"
            onClick={() => {setShowUserUploadedPosts(false);setShowDeletePost(false)}}
          />
        </div>

        {/* DeletePost component - toggled by the more icon */}
        {showDeletePost && isPostOwner && (
          <div className="absolute top-12 right-12 z-50">
            <DeletePost />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserUploadedPosts;