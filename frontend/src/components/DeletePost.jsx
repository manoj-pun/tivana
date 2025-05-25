import React, { useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import Loading from "./Loading";

const DeletePost = () => {
  const {
    backendUrl,
    selectedPost,
    setShowDeletePost,
    setShowUserUploadedPosts,
    postData,
    setPostData,
    userData,
    setUserData,
    isLoading,
    setIsLoading,
  } = useContext(AppContext);

  const handleDeletePost = async () => {
    if (!selectedPost?._id) {
      toast.error("No post selected for deletion");
      return;
    }

    if (isLoading) return; // Prevent multiple requests
    setIsLoading(true);

    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/posts/${selectedPost._id}`,
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        // Update userData to remove the deleted post
        if (userData && Array.isArray(userData.userPosts)) {
          setUserData((prev) => ({
            ...prev,
            userPosts: prev.userPosts.filter(
              (postId) => postId !== selectedPost._id
            ),
          }));
        }
        // Update postData locally
        if (Array.isArray(postData)) {
          setPostData((prev) =>
            prev.filter((post) => post._id !== selectedPost._id)
          );
        }
        toast.success(data.message || "Post deleted successfully");
      } else {
        toast.error(data.message || "Failed to delete post");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Unauthorized: Please log in to delete this post");
      } else if (error.response?.status === 404) {
        toast.error("Post not found");
      } else {
        toast.error(error.response?.data?.message || "Failed to delete post");
      }
    } finally {
      setIsLoading(false);
      setShowDeletePost(false);
      setShowUserUploadedPosts(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="fixed top-22 left-56 z-50">
        <div className="bg-[#212121] px-4 py-4 flex flex-col text-center gap-3 w-96 rounded-xl">
          <h1
            className="text-red-700 font-semibold cursor-pointer rounded"
            onClick={handleDeletePost}
          >
            Delete Post
          </h1>
          <div className="border-t border-[#333333]"></div>
          <h1
            className="text-white font-semibold cursor-pointer rounded"
            onClick={() => setShowDeletePost(false)}
          >
            Cancel
          </h1>
        </div>
      </div>
    </>
  );
};

export default DeletePost;
