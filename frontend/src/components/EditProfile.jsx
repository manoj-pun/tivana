import { useLocation } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const EditProfile = () => {
   
  const {setShowUploadProfilePicture} = useContext(AppContext);

  const { state } = useLocation();

  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [userBio, setUserBio] = useState("");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    if (state) {
      setUsername(state.username || "");
      setFullname(state.fullname || "");
      setUserBio(state.userBio || "");
      setProfileImage(state.profileImage || "");
    }
  }, [state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🔧 Replace this with actual API call or update logic
    console.log("Profile updated:", { username, name, bio });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center mt-14 gap-6 p-6 bg-zinc-900 rounded-xl shadow-md max-w-md mx-auto"
    >
      <img onClick={() => setShowUploadProfilePicture(true)}
        src={profileImage || assets.profile}
        alt="Profile"
        className="w-32 h-32 rounded-full object-cover cursor-pointer"
      />

      <div className="w-full flex flex-col gap-4 text-white">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 outline-none rounded-lg resize-y overflow-auto placeholder-gray-500 border-2 border-zinc-900 hover:border-[#32CD32] transition duration-200 bg-black text-white"
          placeholder="Username"
        />
        <input
          type="text"
          value={fullname}
          onChange={(e) => setName(e.target.value)}
          className="p-2 outline-none rounded-lg resize-y overflow-auto placeholder-gray-500 border-2 border-zinc-900 hover:border-[#32CD32] transition duration-200 bg-black text-white"
          placeholder="Full Name"
        />
        <textarea
          value={userBio}
          onChange={(e) => setUserBio(e.target.value)}
          className="p-2 outline-none rounded-lg resize-y overflow-auto placeholder-gray-500 border-2 border-zinc-900 hover:border-[#32CD32] transition duration-200 bg-black text-white"
          placeholder="Bio"
          rows={3}
        />
      </div>

      <div className="w-full flex justify-end">
        <button
          type="submit"
          className="text-white bg-green-500 p-2 px-15 font-medium text-lg rounded hover:bg-green-600 transition-all cursor-pointer"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default EditProfile;
