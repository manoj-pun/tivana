import React, { useContext, useState } from "react";
import { format } from 'timeago.js';
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
    isLoading
  } = useContext(AppContext);
  
  const navigate = useNavigate();
  const [showDropdownMap, setShowDropdownMap] = useState({});
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const toggleDropdown = (postId) => {
    setShowDropdownMap((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const toggleLike = () => {
    setLiked(prev => !prev);
  };

  const toggleSave = () => {
  setSaved(prev => !prev);
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
      {postData.map((post) => (
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
            <p className="flex gap-2 text-sm text-white">
              <span
                className="font-semibold cursor-pointer"
                onClick={() => {
                  navigate(`/${post.userId.username}`);
                  window.scrollTo(0, 0);
                }}
              >
                {post.userId.username}
              </span>
              <span>&#183;</span>
              <span className="text-[#808080]">
                {format(post.createdAt)}
              </span>
            </p>
          </div>

          {/* Thumbnail */}
          <div>
            <img 
              src={post.thumbnail} 
              alt="post" 
              className="w-full rounded-lg" 
            />
          </div>

          {/* Icons */}
          <div className="flex items-center justify-between mt-3 mb-2">
            <div className="flex gap-4">
              {liked ? (
          <img
            src={assets.heartFilled}
            className="w-6 h-6 cursor-pointer"
            onClick={toggleLike}
            alt="Unlike"
          />
        ) : (
          <img
            src={assets.heart}
            className="w-6 h-6 cursor-pointer"
            onClick={toggleLike}
            alt="Like"
          />
        )}
              <img
                src={assets.comment}
                className="w-[23px] h-[23px] cursor-pointer"
                onClick={() => setShowComment(true)}
              />
              <img
                src={assets.send}
                alt="send"
                className="w-6 h-6 cursor-pointer"
                onClick={() => setShowSend(true)}
              />
            </div>
            {saved ? (
  <img
    src={assets.saveFilled}
    alt="Unsave"
    className="w-6 h-6 cursor-pointer"
    onClick={toggleSave}
  />
) : (
  <img
    src={assets.save}
    alt="Save"
    className="w-6 h-6 cursor-pointer"
    onClick={toggleSave}
  />
)}

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
          <div
            className={`dropdown-content ${
              showDropdownMap[post._id] ? "open" : ""
            }`}
          >
            {showDropdownMap[post._id] &&
              post.dropdowns &&
              post.dropdowns.length > 0 && (
                <Dropdown dropdowns={post.dropdowns} />
              )}
          </div>

          {/* Input */}
          <div>
            <input
              type="text"
              className="w-full text-white p-1.5 bg-transparent outline-none placeholder-[#b3afaf]"
              placeholder="Add a comment..."
            />
          </div>
        </div>
      ))}
      {showComment && <Comment isModal={true} />}
    </div>
  );
};

export default HomeCard;