import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, homeData } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Profile = () => {
  const { setShowFollowers, setShowFollowing, setCurrentUser, setShowUserUploadedPosts,setShowUserSavedPosts, setSelectedPost,setShowUploadProfilePicture } = useContext(AppContext);
  const { username } = useParams();
  const [activeTab, setActiveTab] = useState("posts");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const foundUser = homeData.find((user) => user.username === username);
    if (foundUser) {
      setUser(foundUser);
      setCurrentUser(foundUser);
    }
  }, [username, setCurrentUser]);

  if (!user) {
    return <div className="text-white text-center pt-10">User not found</div>;
  }

  return (
    <div className="text-white pt-10 flex flex-col items-center">
      {/* Profile Header */}
      <div className="border-b-2 pb-8 flex flex-col items-center w-full max-w-4xl">
        <div className="flex gap-16 items-start">
          <div className="shrink-0" onClick={() => setShowUploadProfilePicture(true)}>
            <img
              src={user.profileImage || assets.profile}
              className="w-44 h-44 rounded-full object-cover cursor-pointer"
              alt="Profile"
            />
          </div>

          <div className="flex flex-col gap-y-3 flex-1">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-[18px]">{user.username}</span>
              <button className="bg-[#808080] px-[12px] py-[6px] font-medium text-[14px] rounded cursor-pointer">
                Edit profile
              </button>
            </div>

            <div className="flex gap-4 text-sm">
              <span className="font-semibold">
                {user.userPosts?.length || 0}{" "}
                <span className="text-[#808080]">posts</span>
              </span>
              <span
                className="font-semibold cursor-pointer"
                onClick={() => setShowFollowers(true)}
              >
                {user.profileSection?.followersCount || 0}{" "}
                <span className="text-[#808080]">followers</span>
              </span>
              <span
                className="font-semibold cursor-pointer"
                onClick={() => setShowFollowing(true)}
              >
                {user.profileSection?.followingCount || 0}{" "}
                <span className="text-[#808080]">following</span>
              </span>
            </div>

            <div>
              <span className="font-semibold">{user.name}</span>
            </div>

            <div className="w-[400px]">
              <p className="text-[14px] leading-relaxed">
                {user.profileSection?.bio || "No bio yet"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="flex w-fit m-auto items-center justify-center gap-4 mt-8">
        <div
          className={`flex gap-2 cursor-pointer items-center pb-2 ${
            activeTab === "posts" ? "border-b border-[#32CD32]" : ""
          }`}
          onClick={() => setActiveTab("posts")}
        >
          <img
            src={activeTab === "posts" ? assets.gridFilled : assets.grid}
            className="w-4 h-4 inline-block"
            alt="Posts"
          />
          <p
            className={
              activeTab === "posts"
                ? "text-[#32CD32] text-[13px] font-semibold"
                : "text-white text-[13px]"
            }
          >
            POSTS
          </p>
        </div>

        <div
          className={`flex gap-1 cursor-pointer items-center pb-2 ${
            activeTab === "saved" ? "border-b border-[#32CD32]" : ""
          }`}
          onClick={() => setActiveTab("saved")}
        >
          <img
            src={activeTab === "saved" ? assets.saveFilled : assets.save}
            className="w-4 h-4 inline-block"
            alt="Saved"
          />
          <p
            className={
              activeTab === "saved"
                ? "text-[#32CD32] text-[13px] font-semibold"
                : "text-white text-[13px]"
            }
          >
            SAVED
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-8 w-full max-w-4xl px-4">
        {activeTab === "posts" ? (
          user.userPosts && user.userPosts.length > 0 ? (
            <div className="grid grid-cols-3 gap-4">
              {user.userPosts.map((post, index) => (
                <div
                  key={index}
                  className="w-full aspect-square bg-gray-800 rounded-lg cursor-pointer overflow-hidden"
                >
                  <img
                    src={post}
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                    onClick={() => {
                      setShowUserUploadedPosts(true);
                      setSelectedPost(post); // Set the clicked post
                    }}
                    alt={`Post ${index}`}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-400">No posts yet</div>
          )
        ) : user.savedPosts && user.savedPosts.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {user.savedPosts.map((post, index) => (
              <div
                key={index}
                className="w-full aspect-square bg-gray-800 rounded-lg cursor-pointer overflow-hidden"
              >
                <img
                  src={post}
                  className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                  onClick={() => {
                    setShowUserSavedPosts(true);
                    setSelectedPost(post); // Set the clicked post
                  }}
                  alt={`Saved post ${index}`}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-400">
            No saved posts yet
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;