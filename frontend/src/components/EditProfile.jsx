import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const EditProfile = () => {
  const {
    setShowUploadProfilePicture,
    setIsLoading,
    backendUrl,
    userData,
    setUserData,
  } = useContext(AppContext);

  const { state } = useLocation();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [userBio, setUserBio] = useState("");

  useEffect(() => {
    if (state) {
      setUsername(state.username || "");
      setFullname(state.fullname || "");
      setUserBio(state.userBio || "");
    }
  }, [state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await axios.put(backendUrl + "/api/user/edit-profile", {
        username,
        fullname,
        userBio,
        profileImage: userData.profileImage,
      });

      setUserData({
        ...userData,
        username: data.user.username,
        fullname: data.user.fullname,
        userBio: data.user.userBio,
        profileImage: data.user.profileImage,
      });

      toast.success(data.message);
      navigate(-1);
    } catch (error) {
      if (error.response && error.response.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex flex-col items-center mt-14 gap-6 p-6 bg-zinc-900 rounded-xl shadow-md max-w-md mx-auto"
    >
      {/* Cross icon fixed at top-right within the form box */}
      <img
        src={assets.cross_icon}
        onClick={() => navigate(-1)}
        className="absolute top-4 right-4 w-5 h-5 cursor-pointer hover:scale-110 transition"
      />

      <img
        onClick={() => setShowUploadProfilePicture(true)}
        src={userData?.profileImage || assets.defaultprofile}
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
          onChange={(e) => setFullname(e.target.value)}
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
