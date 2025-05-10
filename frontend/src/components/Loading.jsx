import React from 'react'

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex justify-center items-center backdrop-blur-sm bg-black/30">
      <div className="w-16 h-16 border-8 border-t-8 border-solid border-gray-200 border-t-[#32CD32] rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;

