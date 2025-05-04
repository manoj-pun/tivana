import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const UploadProfilePicture = () => {

    const {setShowUploadProfilePicture} = useContext(AppContext)

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-md bg-black/30 flex justify-center items-center">
      <div className="bg-[#212121] px-4 flex flex-col text-center gap-3 w-96 rounded-xl">
        <h1 className="text-white mt-3 cursor-default font-semibold">Change Profile Photo</h1>
        <hr className="text-gray-300" />

        <div className="relative cursor-pointer">
          <input type="file" id="file-upload" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
          <label htmlFor="file-upload" className="flex flex-col items-center justify-center">
            <h1 className="text-[#32CD32] font-semibold">Upload Photo</h1>
          </label>
        </div>

        <hr className="text-gray-300" />
        <div className="cursor-pointer">
          <h1 className="text-red-600 font-semibold">Remove Current Photo</h1>
        </div>
        <hr className="text-gray-300" />
        <p onClick={() => setShowUploadProfilePicture(false)} className="mb-3 text-white cursor-pointer">Cancel</p>
      </div>
    </div>
  );
};

export default UploadProfilePicture;
