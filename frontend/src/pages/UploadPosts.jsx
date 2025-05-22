import React, { useState, useRef, useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UploadPosts = () => {
  const { backendUrl, setIsLoading,userData,getPostData } = useContext(AppContext);
  const navigate = useNavigate()

  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [description, setDescription] = useState("");
  const [dropdowns, setDropdowns] = useState([]);
  const [currentImageIndices, setCurrentImageIndices] = useState({});
  const fileInputRefs = useRef([]);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(URL.createObjectURL(file));
      setThumbnailFile(file);
    }
  };

  const handleAddDropdown = () => {
    setDropdowns([
      ...dropdowns,
      {
        title: "",
        subtitle: "",
        description: "",
        dropdownImages: [],
        dropdownImageFiles: [],
      },
    ]);
    fileInputRefs.current.push(React.createRef());
  };

  const handleRemoveDropdown = () => {
    if (dropdowns.length === 0) return;

    const updatedDropdowns = [...dropdowns];
    updatedDropdowns.pop(); // remove the last dropdown

    const updatedRefs = [...fileInputRefs.current];
    updatedRefs.pop(); // also remove corresponding file input ref

    setDropdowns(updatedDropdowns);
    fileInputRefs.current = updatedRefs;
  };

  const handleDropdownChange = (index, field, value) => {
    const updated = [...dropdowns];
    updated[index][field] = value;
    setDropdowns(updated);
  };

  const handleDropdownImageChange = (index, files) => {
    if (files.length === 0) return;
    const updated = [...dropdowns];
    const newImageUrl = URL.createObjectURL(files[0]);
    updated[index].dropdownImages = [
      ...updated[index].dropdownImages,
      newImageUrl,
    ];
    updated[index].dropdownImageFiles = [
      ...updated[index].dropdownImageFiles,
      files[0],
    ];
    setDropdowns(updated);
    setCurrentImageIndices((prev) => ({ ...prev, [index]: prev[index] || 0 }));
  };

  const triggerFileInput = (index) => {
    fileInputRefs.current[index]?.current?.click();
  };

  const nextImage = (index, imagesLength) => {
    setCurrentImageIndices((prev) => ({
      ...prev,
      [index]: Math.min(prev[index] + 1, imagesLength - 1),
    }));
  };

  const prevImage = (index) => {
    setCurrentImageIndices((prev) => ({
      ...prev,
      [index]: Math.max(prev[index] - 1, 0),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!thumbnailFile) {
    //   toast.error("Please upload a thumbnail image.");
    // }

    // if (!description.trim()) {
    //   toast.error("Description is required.");
    // }

    if (dropdowns.length > 0) {
      for (const [index, dropdown] of dropdowns.entries()) {
        if (!dropdown.title.trim()) {
          toast.error(`Title missing for Dropdown ${index + 1}`);
        }
        if (dropdown.dropdownImageFiles.length === 0) {
          toast.error(
            `At least one image is required for Dropdown ${index + 1}`
          );
        }
        if (!dropdown.description.trim()) {
          toast.error(`Description is required for Dropdown ${index + 1}`);
        }
      }
    }

    try {

      setIsLoading(true)

      const formData = new FormData();
      formData.append("description", description);
      formData.append("thumbnailImage", thumbnailFile);

      const dropdownData = dropdowns.map((dropdown) => ({
        title: dropdown.title,
        subtitle: dropdown.subtitle,
        description: dropdown.description,
        imageCount: dropdown.dropdownImageFiles.length,
      }));

      formData.append("dropdown", JSON.stringify(dropdownData));

      dropdowns.forEach((dropdown) => {
        dropdown.dropdownImageFiles.forEach((file) => {
          formData.append("dropdownImages", file);
        });
      });

      const { data } = await axios.post(
        backendUrl + "/api/posts/upload-post",
        formData
      );

      toast.success(data.message);

      await getPostData();
      navigate(`/${userData.username}`);
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message || "Failed to upload post");
      }
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="flex items-center justify-center p-10 gap-2">
      <div className="bg-[#212121] p-6 rounded-lg w-full max-w-md shadow-lg">
        <h1 className="text-xl font-semibold mb-4 text-center text-white">
          Create new post
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Primary Image Upload */}
          <div className="mb-4">
            <p className="font-medium mb-2 text-white">Upload Image</p>
            <label htmlFor="file-input"
              className="block rounded-lg cursor-pointer text-center border-2 border-pink-400 hover:border-[#32CD32] transition duration-200 p-2 bg-black"
            >
              <img src={thumbnail || assets.uploadArea} alt="Upload" className="mx-auto object-contain rounded-md"/>
              <input type="file" accept="image/*" id="file-input" onChange={handleThumbnailChange} className="hidden"/>
            </label>
          </div>

          {/* Description */}
          <div className="mb-4">
            <textarea className="w-full p-2 border-2 border-pink-400 outline-none rounded-lg resize-y overflow-auto placeholder-gray-500 hover:border-[#32CD32] transition duration-200 bg-black text-white mb-4"
              placeholder="Description..."
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {/* Render All Dropdown Sections */}
          <div className="flex flex-col gap-6">
            {dropdowns.map((dropdown, index) => (
              <div key={index} className="border-t pt-4 border-white">
                <input
                  className="p-2 w-full border-2 border-pink-400 outline-none rounded hover:border-[#32CD32] transition duration-200 mb-4 placeholder-gray-500 bg-black text-white"
                  type="text"
                  placeholder="Add the title..."
                  value={dropdown.title}
                  onChange={(e) =>
                    handleDropdownChange(index, "title", e.target.value)
                  }
                />

                <input
                  className="p-2 w-full border-2 border-pink-400 outline-none rounded hover:border-[#32CD32] transition duration-200 mb-4 placeholder-gray-500 bg-black text-white"
                  type="text"
                  placeholder="Add the subtitle..."
                  value={dropdown.subtitle}
                  onChange={(e) =>
                    handleDropdownChange(index, "subtitle", e.target.value)
                  }
                />

                {/* Image Upload with Preview */}
                <label
                  htmlFor={`dropdown-image-${index}`}
                  className="block rounded-lg cursor-pointer text-center border-2 border-pink-400 hover:border-[#32CD32] transition duration-200 p-2 mb-4 bg-black"
                >
                  {dropdown.dropdownImages.length > 0 ? (
                    <div className="relative w-full mx-auto overflow-hidden">
                      <div
                        className="relative flex transition-transform duration-700 ease-in-out"
                        style={{
                          transform: `translateX(-${
                            currentImageIndices[index] * 100
                          }%)`,
                        }}
                      >
                        {dropdown.dropdownImages.map((img, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={img}
                            className="w-full h-[250px] object-contain rounded-lg flex-shrink-0"
                            alt="Dropdown"
                          />
                        ))}
                      </div>

                      {dropdown.dropdownImages.length > 1 &&
                        currentImageIndices[index] > 0 && (
                          <button
                            type="button"
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-1 rounded-full z-10 cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault();
                              prevImage(index);
                            }}
                          >
                            <img
                              src={assets.leftArrow}
                              alt="Prev"
                              className="w-4 h-4"
                            />
                          </button>
                        )}

                      {dropdown.dropdownImages.length > 1 &&
                        currentImageIndices[index] <
                          dropdown.dropdownImages.length - 1 && (
                          <button
                            type="button"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-1 rounded-full z-10 cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault();
                              nextImage(index, dropdown.dropdownImages.length);
                            }}
                          >
                            <img
                              src={assets.rightArrow}
                              alt="Next"
                              className="w-4 h-4"
                            />
                          </button>
                        )}

                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 transition-all duration-300 ease-in-out">
                        {dropdown.dropdownImages.map((_, idx) => (
                          <div
                            key={idx}
                            className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ease-in-out ${
                              currentImageIndices[index] === idx
                                ? "bg-white"
                                : "bg-gray-500"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentImageIndices((prev) => ({
                                ...prev,
                                [index]: idx,
                              }));
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <img
                      src={assets.uploadArea}
                      alt="Upload"
                      className="mx-auto object-contain rounded-md"
                    />
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    id={`dropdown-image-${index}`}
                    ref={fileInputRefs.current[index]}
                    onChange={(e) =>
                      handleDropdownImageChange(index, e.target.files)
                    }
                    className="hidden"
                  />
                </label>

                {/* Conditionally render "Add Other Images" button after first image is added */}
                {dropdown.dropdownImages.length > 0 && (
                  <button
                    type="button"
                    onClick={() => triggerFileInput(index)}
                    className="w-full bg-[#E64359] text-white px-4 py-2 rounded hover:bg-pink-700 transition duration-200 cursor-pointer mb-4"
                  >
                    Add Other Images
                  </button>
                )}

                <textarea
                  className="w-full p-2 border-2 border-pink-400 outline-none rounded-lg resize-y overflow-auto placeholder-gray-500 text-white hover:border-[#32CD32] transition duration-200 mb-4 bg-black"
                  placeholder="Description..."
                  rows={3}
                  value={dropdown.description}
                  onChange={(e) =>
                    handleDropdownChange(index, "description", e.target.value)
                  }
                ></textarea>
              </div>
            ))}
          </div>

          {/* Add Dropdown Button */}
          <div className="flex justify-end mb-4">
            <button
              type="button"
              onClick={handleAddDropdown}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-200 cursor-pointer mb-2"
            >
              Add Dropdowns
            </button>
          </div>

          {dropdowns.length > 0 && (
            <div className="flex justify-end mb-4">
              <button
                type="button"
                onClick={handleRemoveDropdown}
                className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 transition duration-200 cursor-pointer mb-2"
              >
                Remove Dropdowns
              </button>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="text-white bg-green-500 w-full p-2 font-medium text-xl cursor-pointer rounded hover:bg-green-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadPosts;
