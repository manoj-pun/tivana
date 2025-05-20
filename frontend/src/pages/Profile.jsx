import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const Profile = () => {
  const {
    setShowFollowers,
    setShowFollowing,
    setCurrentUser,
    setShowUserUploadedPosts,
    setShowUserSavedPosts,
    setSelectedPost,
    setShowUploadProfilePicture,
    userData,
    postData,
    backendUrl,
  } = useContext(AppContext);

  const { username } = useParams();
  const [activeTab, setActiveTab] = useState("posts");
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch profile data when username changes
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${backendUrl}/api/user/${username}`);

        if (data) {
          setProfileData(data);
          // If viewing own profile, update current user
          if (userData && userData.username === username) {
            setCurrentUser(data);
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [username, userData, setCurrentUser, backendUrl]);

  if (isLoading) {
    return <div className="text-white text-center pt-10">Loading...</div>;
  }

  if (!profileData) {
    return <div className="text-white text-center pt-10">User not found</div>;
  }

  const isCurrentUser = userData && userData.username === username;
  const profileSection = profileData.profileSection || {};

  const handlePostClick = (post, isSaved = false) => {
    setSelectedPost(post);
    isSaved ? setShowUserSavedPosts(true) : setShowUserUploadedPosts(true);
  };

  const userPosts =
    postData?.filter((post) => post.userId?.username === username) || [];
  // Map saved post IDs to actual post objects from postData
  const savedPosts = profileData.savedPosts
    ? postData?.filter((post) => profileData.savedPosts.includes(post._id)) ||
      []
    : [];

  return (
    <div className="text-white pt-10 flex flex-col items-center">
      {/* Profile Header */}
      <div className="border-b-2 pb-8 flex flex-col items-center w-full max-w-4xl">
        <div className="flex gap-16 items-start">
          <div className="shrink-0">
            {/* Only make profile image clickable for current user */}
            {isCurrentUser ? (
              <div onClick={() => setShowUploadProfilePicture(true)}>
                <img
                  src={profileData.profileImage || assets.defaultprofile}
                  className="w-44 h-44 rounded-full object-cover cursor-pointer"
                  alt="Profile"
                />
              </div>
            ) : (
              <img
                src={profileData.profileImage || assets.defaultprofile}
                className="w-44 h-44 rounded-full object-cover"
                alt="Profile"
              />
            )}
          </div>

          <div className="flex flex-col gap-y-3 flex-1">
            <div className="flex items-center gap-4 mb-2">
              <div className="flex gap-1 items-center">
                <span className="text-[18px]">{profileData.username}</span>
                {profileData.isVerified && (
                  <img
                    src={assets.verified}
                    alt="Verified"
                    className="w-6 h-6"
                    title="Verified account"
                  />
                )}
              </div>
              {isCurrentUser ? (
                <button
                  onClick={() =>
                    navigate("/edit-profile", {
                      state: {
                        username: profileData.username,
                        fullname: profileData.fullname,
                        userBio: profileData.userBio,
                        profileImage: profileData.profileImage,
                      },
                    })
                  }
                  className="bg-[#808080] px-[12px] py-[6px] font-medium text-[14px] rounded cursor-pointer"
                >
                  Edit profile
                </button>
              ) : (
                <button className="bg-[#334fda] px-[12px] py-[6px] font-medium text-[14px] rounded cursor-pointer">
                  Follow
                </button>
              )}
            </div>

            <div className="flex gap-4 text-sm">
              <span className="font-semibold">
                {userPosts.length} <span className="text-[#808080]">posts</span>
              </span>
              <span
                className="font-semibold cursor-pointer"
                onClick={() => setShowFollowers(true)}
              >
                {profileData.followersCount || 0}{" "}
                <span className="text-[#808080]">followers</span>
              </span>
              <span
                className="font-semibold cursor-pointer"
                onClick={() => setShowFollowing(true)}
              >
                {profileData.followingCount || 0}{" "}
                <span className="text-[#808080]">following</span>
              </span>
            </div>

            {profileData?.fullname && (
              <div>
                <span className="font-semibold">{profileData.fullname}</span>
              </div>
            )}

            <div className="w-[400px]">
              <p className="text-[14px] leading-relaxed">
                {profileData.userBio || "No bio yet."}
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

        {isCurrentUser && (
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
        )}
      </div>

      {/* Content Section */}
      <div className="mt-8 w-full max-w-4xl px-4">
        {activeTab === "posts" ? (
          userPosts.length > 0 ? (
            <div className="grid grid-cols-3 gap-4">
              {userPosts.map((post, index) => (
                <div
                  key={index}
                  className="w-full aspect-square bg-gray-800 rounded-lg cursor-pointer overflow-hidden"
                >
                  <img
                    src={post.thumbnail}
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                    onClick={() => handlePostClick(post)}
                    alt={`Post ${index}`}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-gray-400">
              {isCurrentUser ? (
                <>
                  <img
                    onClick={() => navigate("/upload-post")}
                    src={assets.Upload}
                    alt="No posts"
                    className="w-20 mb-4 cursor-pointer"
                  />
                  <div>
                    When you share posts, they will appear on your profile.
                  </div>
                  <p
                    className="mt-4 text-[#4193EF] text-xl font-semibold cursor-pointer"
                    onClick={() => navigate("/upload-post")}
                  >
                    Share your first post
                  </p>
                </>
              ) : (
                <div>This user hasn't posted anything yet.</div>
              )}
            </div>
          )
        ) : isCurrentUser && savedPosts.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {savedPosts.map((post, index) => (
              <div
                key={index}
                className="w-full aspect-square bg-gray-800 rounded-lg cursor-pointer overflow-hidden"
              >
                <img
                  src={post.thumbnail}
                  className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                  onClick={() => handlePostClick(post, true)}
                  alt={`Saved post ${index}`}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-400">
            {isCurrentUser ? "When you save posts, they will appear here." : ""}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
