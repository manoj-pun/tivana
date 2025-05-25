import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const Send = () => {
  const { setShowSend } = useContext(AppContext);
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="text-white bg-[#808080] w-fit h-20 p-6 flex items-center justify-between rounded-xl gap-4">
        <p>We are working on this feature!</p>
        <img
          src={assets.cross_icon}
          className="w-4 h-4 cursor-pointer"
          onClick={() => setShowSend(false)}
        />
      </div>
    </div>
  );
};

export default Send;
