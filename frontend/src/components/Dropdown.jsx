import React, { useState, useRef, useEffect } from "react";
import { assets } from "../assets/assets";

const Dropdown = ({ dropdowns }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [currentImageIndices, setCurrentImageIndices] = useState({});
  const dropdownRefs = useRef([]);

  // Initialize image indices
  useEffect(() => {
    const initialIndices = {};
    dropdowns.forEach((_, index) => {
      initialIndices[index] = 0;
    });
    setCurrentImageIndices(initialIndices);
  }, [dropdowns]);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const nextImage = (index, imagesLength) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [index]: Math.min(prev[index] + 1, imagesLength - 1)
    }));
  };

  const prevImage = (index) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [index]: Math.max(prev[index] - 1, 0)
    }));
  };

  useEffect(() => {
    if (openDropdown !== null && dropdownRefs.current[openDropdown]) {
      dropdownRefs.current[openDropdown].scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, [openDropdown]);

  return (
    <div className="p-2 mt-2 relative z-0 max-h-[510px] overflow-y-auto transition-all duration-300 ease-in-out rounded-lg">
      {dropdowns.map((item, index) => (
        <div key={item._id} className="mb-4" ref={el => (dropdownRefs.current[index] = el)}>
          {/* Dropdown Header */}
          <div className="flex items-center justify-between bg-[#333333] p-2 cursor-pointer rounded-md"
            onClick={() => toggleDropdown(index)}>
            <div>
              <h1 className="font-semibold text-white">{item.title}</h1>
              <p className="text-sm text-gray-400">{item.subTitle}</p>
            </div>
            <img src={openDropdown === index ? assets.upArrow : assets.downArrow} className="w-5 h-5" alt="Toggle"/>
          </div>

          {/* Dropdown Content */}
          {openDropdown === index && (
            <div className="p-2">
              {/* Image Slider */}
              {item.images && item.images.length > 0 && (
                <div className="relative w-full mx-auto overflow-hidden">
                  <div className="relative flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${currentImageIndices[index] * 100}%)`,}}>
                    {item.images.map((img, imgIndex) => (
                      <img key={img._id} src={img.url} className="w-full h-[250px] object-contain rounded-lg flex-shrink-0" alt="Dropdown"/>
                    ))}
                  </div>

                  {/* Navigation Arrows */}
                  {item.images.length > 1 && (
                    <>
                      {currentImageIndices[index] > 0 && (
                        <button className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-1 rounded-full z-10 cursor-pointer" onClick={() => prevImage(index)}>
                          <img src={assets.leftArrow} alt="Prev" className="w-4 h-4"/>
                        </button>
                      )}
                      {currentImageIndices[index] < item.images.length - 1 && (
                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-1 rounded-full z-10 cursor-pointer" onClick={() => nextImage(index, item.images.length)}>
                          <img src={assets.rightArrow} alt="Next" className="w-4 h-4"/>
                        </button>
                      )}
                    </>
                  )}

                  {/* Image Indicators */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {item.images.map((_, idx) => (
                      <div key={idx} className={`w-2 h-2 rounded-full cursor-pointer ${currentImageIndices[index] === idx
                            ? "bg-white"
                            : "bg-gray-500"
                        }`}
                        onClick={() => setCurrentImageIndices(prev => ({...prev,[index]: idx}))}
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