import React, { useContext, useEffect, useState } from "react";
import { assets, fakeComments } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Comment = ({ isModal = true }) => {
  const {
    setShowComment,
    selectedPost,
    postData,
    userData,
    likePost,
    unlikePost,
    savePost,
    unsavePost,
  } = useContext(AppContext);
  const [postDetails, setPostDetails] = useState(null);

  // Fetch post details
  useEffect(() => {
    if (selectedPost && postData) {
      const foundPost = postData.find((post) => post._id === selectedPost._id);
      setPostDetails(foundPost || selectedPost);
    }
  }, [selectedPost, postData]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModal) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isModal]);

  if (!postDetails) {
    return (
      <div className="text-white text-center">
        No post selected or post not found
      </div>
    );
  }

  const isLiked = userData?.likedPosts.includes(postDetails._id);
  const isSaved = userData?.savedPosts.includes(postDetails._id);

  return (
    <div
      className={`${
        isModal
          ? "fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg"
          : "relative"
      }`}
      role="dialog"
      aria-labelledby="comment-modal-title"
    >
      <div
        className={`${
          isModal ? "w-[500px]" : "w-full"
        } bg-[#171717] p-4 rounded-2xl shadow-lg max-h-[80vh] flex flex-col`}
      >
        {/* Profile Info */}
        <div className="flex items-center gap-3 mb-3">
          <img
            src={fakeComments.userProfile.user}
            alt="Profile"
            className="w-9 rounded-full"
          />
          <span className="font-semibold text-white">
            {fakeComments.userProfile.username}
          </span>
        </div>

        <hr className="border-gray-600 w-full" />

        {/* Scrollable Container (User Post + Comments) */}
        <div className="max-h-[37vh] overflow-y-auto space-y-4 pt-2 flex-1">
          {/* User Post */}
          <div className="mb-3">
            <div className="flex gap-3 items-start">
              <img
                src={fakeComments.userProfile.user}
                alt="Profile"
                className="w-9 rounded-full"
              />
              <p className="text-sm">
                <span className="font-semibold text-white">
                  {fakeComments.userProfile.username}
                </span>
                <span className="text-gray-300 ml-1">
                  {fakeComments.userProfile.text}
                </span>
              </p>
            </div>
          </div>

          {/* Comments List */}
          {fakeComments.Comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 items-start">
              <img
                src={comment.user}
                className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                alt="Commenter Profile"
              />
              <div className="text-sm flex-1">
                <span className="font-semibold text-white">
                  {comment.username}
                </span>{" "}
                <span className="text-gray-300 ml-1">{comment.text}</span>
              </div>
            </div>
          ))}
        </div>

        <hr className="border-gray-600 mt-4" />

        {/* Actions */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-3">
            <img
              src={isLiked ? assets.heartFilled : assets.heart}
              className="w-6 h-6 cursor-pointer"
              onClick={() =>
                isLiked ? unlikePost(postDetails._id) : likePost(postDetails._id)
              }
              alt={isLiked ? "Unlike" : "Like"}
              aria-label={isLiked ? "Unlike post" : "Like post"}
            />
            <img
              src={assets.send}
              alt="Share"
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          <img
            src={isSaved ? assets.saveFilled : assets.save}
            alt={isSaved ? "Unsave" : "Save"}
            className="w-6 h-6 cursor-pointer"
            onClick={() =>
              isSaved ? unsavePost(postDetails._id) : savePost(postDetails._id)
            }
            aria-label={isSaved ? "Unsave post" : "Save post"}
          />
        </div>

        {/* Like/Save Counts */}
        <div className="mt-2 text-sm text-gray-400">
          <p className="font-semibold mb-3">{postDetails.likeCount || postDetails.likedBy?.length || 0} likes</p>
          <p>
            {fakeComments.Comments.length
              ? fakeComments.Comments[0].timestamp
              : "Just now"}
          </p>
        </div>

        <hr className="border-gray-600 mt-4" />

        {/* Add Comment (Placeholder) */}
        <div className="flex items-center mt-3">
          <input
            type="text"
            className="w-full text-white p-1.5 bg-transparent outline-none placeholder-[#b3afaf]"
            placeholder="Add a comment..."
          />
          <span className="text-blue-400 cursor-pointer hover:opacity-80 ml-2">
            Post
          </span>
        </div>
      </div>

      {isModal && (
        <div className="absolute top-10 right-20">
          <img
            src={assets.cross_icon}
            alt="Close"
            className="w-5 cursor-pointer"
            onClick={() => setShowComment(false)}
            aria-label="Close comment modal"
          />
        </div>
      )}
    </div>
  );
};

export default Comment;