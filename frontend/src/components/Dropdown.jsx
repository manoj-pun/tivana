import React, { useState, useRef, useEffect } from "react";
import { assets } from "../assets/assets";

const Dropdown = ({ dropdowns }) => {
  const [openDropdown, setOpenDropdown] = useState(null); // Track which dropdown is open
  const [currentImageIndices, setCurrentImageIndices] = useState({}); // Track image index for each dropdown
  const dropdownRefs = useRef([]); // Array of refs for each dropdown

  // Toggle dropdown visibility and reset image index for the opened dropdown
  const toggleDropdown = (index) => {
    if (openDropdown === index) {
      setOpenDropdown(null); // Close if already open
    } else {
      setOpenDropdown(index);
      setCurrentImageIndices((prev) => ({ ...prev, [index]: 0 })); // Reset image index
    }
  };

  // Navigate to next image
  const nextImage = (index, imagesLength) => {
    setCurrentImageIndices((prev) => ({
      ...prev,
      [index]: Math.min(prev[index] + 1, imagesLength - 1), // Stop at the last image
    }));
  };

  // Navigate to previous image
  const prevImage = (index) => {
    setCurrentImageIndices((prev) => ({
      ...prev,
      [index]: Math.max(prev[index] - 1, 0), // Stop at the first image
    }));
  };

  // Scroll to the open dropdown
  useEffect(() => {
    if (openDropdown !== null && dropdownRefs.current[openDropdown]) {
      dropdownRefs.current[openDropdown].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [openDropdown]);

  return (
    <div className="p-2 mt-2 relative z-0 max-h-[510px] overflow-y-auto transition-all duration-300 ease-in-out rounded-lg">
      {dropdowns.map((item, index) => (
        <div
          key={index}
          className="mb-4"
          ref={(el) => (dropdownRefs.current[index] = el)}
        >
          {/* Dropdown Header */}
          <div
            className="flex items-center justify-between bg-[#333333] p-2 cursor-pointer rounded-md"
            onClick={() => toggleDropdown(index)}
          >
            <div>
              <h1 className="font-semibold text-white">{item.title}</h1>
              <p className="text-sm text-gray-400">{item.subTitle}</p>
            </div>
            <img
              src={openDropdown === index ? assets.upArrow : assets.downArrow}
              className="w-5 h-5"
              alt="Toggle"
            />
          </div>

          {/* Dropdown Content */}
          {openDropdown === index && (
            <div className="p-2">
              {/* Image Slider */}
              {item.dropdownImages.length > 0 && (
                <div className="relative w-full mx-auto overflow-hidden">
                  <div
                    className="relative flex transition-transform duration-700 ease-in-out"
                    style={{
                      transform: `translateX(-${
                        currentImageIndices[index] * 100
                      }%)`,
                    }}
                  >
                    {item.dropdownImages.map((img, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={img}
                        className="w-full h-[250px] object-contain rounded-lg flex-shrink-0"
                        alt="Dropdown"
                      />
                    ))}
                  </div>

                  {/* Left Arrow */}
                  {item.dropdownImages.length > 1 &&
                    currentImageIndices[index] > 0 && (
                      <button
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-1 rounded-full z-10 cursor-pointer"
                        onClick={() => prevImage(index)}
                      >
                        <img
                          src={assets.leftArrow}
                          alt="Prev"
                          className="w-4 h-4"
                        />
                      </button>
                    )}

                  {/* Right Arrow */}
                  {item.dropdownImages.length > 1 &&
                    currentImageIndices[index] <
                      item.dropdownImages.length - 1 && (
                      <button
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-1 rounded-full z-10 cursor-pointer"
                        onClick={() =>
                          nextImage(index, item.dropdownImages.length)
                        }
                      >
                        <img
                          src={assets.rightArrow}
                          alt="Next"
                          className="w-4 h-4"
                        />
                      </button>
                    )}

                  {/* Image Indicators (dots) */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 transition-all duration-300 ease-in-out">
                    {item.dropdownImages.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ease-in-out ${
                          currentImageIndices[index] === idx
                            ? "bg-white"
                            : "bg-gray-500"
                        }`}
                        onClick={() =>
                          setCurrentImageIndices((prev) => ({
                            ...prev,
                            [index]: idx,
                          }))
                        }
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <p className="mt-2 text-white text-sm">{item.description}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Dropdown;
