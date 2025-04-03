import React, { useContext, useState } from "react";
import { assets, homeData } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import Comment from "./Comment";

const HomeCard = () => {
  const { setShowSend, showComment, setShowComment } = useContext(AppContext);
  const navigate = useNavigate();
  const [showDropdownMap, setShowDropdownMap] = useState({});

  const toggleDropdown = (postId) => {
    setShowDropdownMap((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-10 w-full max-sm:w-[90%] max-sm:ml-5">
      {homeData.map((item) => (
        <div key={item._id} className="mx-auto max-w-xl mb-10">
          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <img
              src={item.profileImage}
              alt="profile"
              className="w-8 h-8 rounded-full cursor-pointer"
              onClick={() => {
                navigate(`/${item.username}`);
                scrollTo(0, 0);
              }}
            />
            <p className="flex gap-2 text-sm text-white">
              <span
                className="font-semibold cursor-pointer"
                onClick={() => {
                  navigate(`/${item.username}`);
                  scrollTo(0, 0);
                }}
              >
                {item.username}
              </span>
              <span>&#183;</span>
              <span className="text-[#808080]">{item.timestamp}</span>
            </p>
          </div>

          {/* Thumbnail */}
          <div>
            <img src={item.thumbnail} alt="post" className="w-full rounded-lg" />
          </div>

          {/* Icons */}
          <div className="flex items-center justify-between mt-3 mb-2">
            <div className="flex gap-4">
              <img src={assets.heart} className="w-6 h-6 cursor-pointer" />
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
            <img
              src={assets.save}
              alt="save"
              className="w-6 h-6 cursor-pointer"
            />
          </div>

          {/* Info + Inline Toggle */}
          <div className="flex gap-2 mb-2 text-sm leading-snug">
            <p>
              <span className="font-bold text-white">{item.username}</span>{" "}
              <span className="text-white">{item.info} </span>
              {item.dropdowns && item.dropdowns.length > 0 && (
                <span
                  className="cursor-pointer text-[#b3afaf]"
                  onClick={() => toggleDropdown(item._id)}
                >
                  {showDropdownMap[item._id] ? "less..." : "more..."}
                </span>
              )}
            </p>
          </div>

          {/* Dropdown */}
          <div
            className={`dropdown-content ${
              showDropdownMap[item._id] ? "open" : ""
            }`}
          >
            {showDropdownMap[item._id] &&
              item.dropdowns &&
              item.dropdowns.length > 0 && (
                <Dropdown dropdowns={item.dropdowns} />
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