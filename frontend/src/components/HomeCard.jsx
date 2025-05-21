import React, { useContext, useEffect, useState } from "react";
import { format } from "timeago.js";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import Comment from "./Comment";
import Loading from "./Loading";

const HomeCard = () => {
  const {
    setShowSend,
    showComment,
    setShowComment,
    postData,
    isLoading,
    userData,
    likePost,
    unlikePost,
    savePost,
    unsavePost,
    setSelectedPost,
    addComment, 
  } = useContext(AppContext);

  const navigate = useNavigate();
  const [showDropdownMap, setShowDropdownMap] = useState({});
  const [commentTextMap, setCommentTextMap] = useState({}); // State for comment inputs

  const toggleDropdown = (postId) => {
    setShowDropdownMap((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleCommentChange = (postId, value) => {
    setCommentTextMap((prev) => ({
      ...prev,
      [postId]: value,
    }));
  };

  const handleAddComment = async (postId) => {
    const text = commentTextMap[postId]?.trim();
    if (!text) return;
    const newComment = await addComment(postId, text);
    if (newComment) {
      setCommentTextMap((prev) => ({ ...prev, [postId]: "" })); // Clear input
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!postData || postData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pt-10">
        <p className="text-white">No posts available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-10 w-full max-sm:w-[90%] max-sm:ml-5">
      {postData.map((post) => {
        const isLiked = userData?.likedPosts.includes(post._id);
        const isSaved = userData?.savedPosts.includes(post._id);

        return (
          <div key={post._id} className="mx-auto max-w-xl mb-10">
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <img
                src={post.userId.profileImage || assets.defaultprofile}
                alt="profile"
                className="w-8 h-8 rounded-full cursor-pointer"
                onClick={() => {
                  navigate(`/${post.userId.username}`);
                  window.scrollTo(0, 0);
                }}
              />
              <p className="flex gap-2 items-center text-sm text-white">
                <span
                  className="font-semibold cursor-pointer"
                  onClick={() => {
                    navigate(`/${post.userId.username}`);
                    window.scrollTo(0, 0);
                  }}
                >
                  {post.userId.username}
                </span>
                <span className="-ml-1.5">
                  {post.userId.isVerified && <img src={assets.verified} alt="Verified" className="w-4 h-4" />}
                </span>
                <span>·</span>
                <span className="text-[#808080]">{format(post.createdAt)}</span>
              </p>
            </div>

            {/* Thumbnail */}
            <div>
              <img src={post.thumbnail} alt="post" className="w-full rounded-lg" />
            </div>

            {/* Icons */}
            <div className="flex items-center justify-between mt-3 mb-2">
              <div className="flex gap-4">
                <img
                  src={isLiked ? assets.heartFilled : assets.heart}
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => (isLiked ? unlikePost(post._id) : likePost(post._id))}
                  alt={isLiked ? "Unlike" : "Like"}
                />
                <img
                  src={assets.comment}
                  className="w-[23px] h-[23px] cursor-pointer"
                  onClick={() => {
                    console.log("Setting selectedPost:", post);
                    setSelectedPost(post);
                    setShowComment(true);
                  }}
                  alt="Comment"
                />
                <img
                  src={assets.send}
                  alt="send"
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => setShowSend(true)}
                />
              </div>
              <img
                src={isSaved ? assets.saveFilled : assets.save}
                alt={isSaved ? "Unsave" : "Save"}
                className="w-6 h-6 cursor-pointer"
                onClick={() => (isSaved ? unsavePost(post._id) : savePost(post._id))}
              />
            </div>

            {/* Like/Save Counts */}
            <div className="text-sm text-white mb-2">
              <p className="font-semibold">{post.likeCount || post.likedBy.length} likes</p>
            </div>

            {/* Info + Inline Toggle */}
            <div className="flex gap-2 mb-2 text-sm leading-snug">
              <p>
                <span className="font-bold text-white">{post.userId.username}</span>{" "}
                <span className="text-white">{post.description} </span>
                {post.dropdowns && post.dropdowns.length > 0 && (
                  <span
                    className="cursor-pointer text-[#b3afaf]"
                    onClick={() => toggleDropdown(post._id)}
                  >
                    {showDropdownMap[post._id] ? "less..." : "more..."}
                  </span>
                )}
              </p>
            </div>

            {/* Dropdown */}
            <div className={`dropdown-content ${showDropdownMap[post._id] ? "open" : ""}`}>
              {showDropdownMap[post._id] && post.dropdowns && post.dropdowns.length > 0 && (
                <Dropdown dropdowns={post.dropdowns} />
              )}
            </div>

            {/* Comment Input */}
            <div className="flex items-center">
              <input
                type="text"
                className="w-full text-white p-1.5 bg-transparent outline-none placeholder-[#b3afaf]"
                placeholder="Add a comment..."
                value={commentTextMap[post._id] || ""}
                onChange={(e) => handleCommentChange(post._id, e.target.value)}
              />
              <span
                className="text-blue-400 cursor-pointer hover:opacity-80 ml-2"
                onClick={() => handleAddComment(post._id)}
              >
                Post
              </span>
            </div>
          </div>
        );
      })}
      {showComment && <Comment isModal={true} />}
    </div>
  );
};

export default HomeCard;