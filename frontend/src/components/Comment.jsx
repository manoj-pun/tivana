import React, { useContext, useEffect, useState } from "react";
import { format } from "timeago.js";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

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
    addComment,
    isLoading,
    setSelectedPost,
  } = useContext(AppContext);
  const [postDetails, setPostDetails] = useState(selectedPost || null);
  const [commentText, setCommentText] = useState("");
  const navigate = useNavigate();

  // Sync postDetails with postData when available
  useEffect(() => {
    if (selectedPost && postData && !isLoading) {
      const foundPost = postData.find((post) => post._id === selectedPost._id);
      setPostDetails(foundPost || selectedPost);
    }
  }, [selectedPost, postData, isLoading]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModal) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isModal]);

  // Handle comment submission
  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    const newComment = await addComment(postDetails._id, commentText);
    if (newComment) {
      setCommentText("");
    }
  };

  // Handle navigation to user profile
  const handleUserClick = (username) => {
    navigate(`/${username}`);
    if (isModal) {
      setShowComment(false);
      setSelectedPost(null);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!postDetails) {
    return (
      <div className="text-white text-center">
        No post selected or post not found
      </div>
    );
  }

  const isLiked = userData?.likedPosts.includes(postDetails._id);
  const isSaved = userData?.savedPosts.includes(postDetails._id);

  // Sort comments by createdAt in descending order (newest first)
  const sortedComments = postDetails.comments
    ? [...postDetails.comments].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    : [];

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
        } bg-[#171717] p-4 rounded-2xl shadow-lg max-h-[76vh] flex flex-col`}
      >
        {/* Profile Info */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex gap-2">
            <img
              src={postDetails.userId.profileImage || assets.defaultprofile}
              alt="Profile"
              className="w-9 rounded-full cursor-pointer"
              onClick={() => handleUserClick(postDetails.userId.username)}
            />
            <div className="flex items-center gap-[1px]">
              <span
                className="font-semibold text-white cursor-pointer"
                onClick={() => handleUserClick(postDetails.userId.username)}
              >
                {postDetails.userId.username}
              </span>
              <span>
                {postDetails.userId.isVerified && (
                  <img
                    src={assets.verified}
                    alt="Verified"
                    className="w-4 h-4"
                  />
                )}
              </span>
            </div>
          </div>

          {isModal && (
            <div>
              <img
                src={assets.cross_icon}
                alt="Close"
                className="w-5 cursor-pointer"
                onClick={() => {
                  setShowComment(false);
                  setSelectedPost(null);
                }}
                aria-label="Close comment modal"
              />
            </div>
          )}
        </div>

        <hr className="border-gray-600 w-full" />

        {/* Scrollable Container (User Post + Comments) */}
        <div className="h-[280px] overflow-y-auto pt-2">
          {/* Comments List - Sorted newest first */}
          {sortedComments.length > 0 ? (
            sortedComments.map((comment) => (
              <div key={comment._id} className="flex gap-3 items-start mb-4">
                <img
                  src={comment.userId.profileImage || assets.defaultprofile}
                  className="w-9 h-9 rounded-full object-cover flex-shrink-0 cursor-pointer"
                  alt="Commenter Profile"
                  onClick={() => handleUserClick(comment.userId.username)}
                />
                <div className="text-sm flex-1">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-[1px]">
                      <span
                        className="font-semibold text-white cursor-pointer"
                        onClick={() => handleUserClick(comment.userId.username)}
                      >
                        {comment.userId.username}
                      </span>
                      <span>
                        {comment.userId.isVerified && (
                          <img
                            src={assets.verified}
                            alt="Verified"
                            className="w-4 h-4"
                          />
                        )}
                      </span>
                    </div>
                    <span className="text-gray-300">{comment.comment}</span>
                  </div>
                  <span className="text-gray-400 text-xs">
                    {format(comment.createdAt)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm flex justify-center items-center h-[230px] font-semibold">
              Be the first one to comment
            </p>
          )}
        </div>

        <hr className="border-gray-600 mt-4" />

        {/* Actions */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-3">
            <img
              src={isLiked ? assets.heartFilled : assets.heart}
              className="w-6 h-6 cursor-pointer"
              onClick={() =>
                isLiked
                  ? unlikePost(postDetails._id)
                  : likePost(postDetails._id)
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
          <p className="font-semibold mb-3">
            {postDetails.likeCount || postDetails.likedBy?.length || 0} likes
          </p>
          <p>{format(postDetails.createdAt)}</p>
        </div>

        <hr className="border-gray-600 mt-4" />

        {/* Add Comment */}
        <div className="flex items-center mt-3">
          <input
            type="text"
            className="w-full text-white p-1.5 bg-transparent outline-none placeholder-[#b3afaf]"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleAddComment();
            }}
          />
          <span
            className="text-blue-400 cursor-pointer hover:opacity-80 ml-2"
            onClick={handleAddComment}
          >
            Post
          </span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
