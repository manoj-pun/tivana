import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const UploadProfilePicture = () => {
  const {
    setShowUploadProfilePicture,
    backendUrl,
    userData,
    setUserData,
    setIsLoading,
  } = useContext(AppContext);

  //checking if the profileImage is empty or not
  const isDefaultImage = !userData.profileImage;

  const handleFileChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      uploadProfileImage(selectedImage);
    }
  };

  const uploadProfileImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("profileImage", imageFile);

    try {
      setIsLoading(true);
      const { data } = await axios.post(
        backendUrl + "/api/user/upload-profile-image",
        formData,
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message);
        setUserData((prev) => ({ ...prev, profileImage: data.profileImage }));
        setShowUploadProfilePicture(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const removeProfileImage = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.delete(
        backendUrl + "/api/user/remove-profile-image",
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message);
        setUserData((prev) => ({ ...prev, profileImage: "" }));
        setShowUploadProfilePicture(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove photo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-md bg-black/30 flex justify-center items-center">
      <div className="bg-[#212121] px-4 flex flex-col text-center gap-3 w-96 rounded-xl">
        <h1 className="text-white mt-6 mb-3 cursor-default font-semibold">
          Change Profile Photo
        </h1>
        <hr className="text-gray-300" />

        <div className="relative cursor-pointer">
          <input
            type="file"
            id="file-upload"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center"
          >
            <h1 className="text-[#32CD32] font-semibold">Upload Photo</h1>
          </label>
        </div>

        <hr className="text-gray-300" />

        {!isDefaultImage && (
          <>
            <div className="cursor-pointer" onClick={removeProfileImage}>
              <h1 className="text-red-600 font-semibold">
                {" "}
                Remove Current Photo
              </h1>
            </div>
            <hr className="text-gray-300" />
          </>
        )}

        <p
          onClick={() => setShowUploadProfilePicture(false)}
          className="mb-3 text-white cursor-pointer"
        >
          Cancel
        </p>
      </div>
    </div>
  );
};

export default UploadProfilePicture;
