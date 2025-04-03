import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import Comment from './Comment';
import Dropdown from './Dropdown';

const UserUploadedPosts = () => {
  const { currentUser, selectedPost, setShowUserUploadedPosts } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('comments');

  if (!currentUser) {
    return <div className="text-white text-center">Loading user data...</div>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a1a] rounded-lg w-full max-w-5xl flex" style={{ height: '85vh', maxHeight: '85vh' }}>
        {/* Left: Image Section */}
        <div className="w-1/2 h-full flex items-center justify-center overflow-hidden bg-black border border-[#262626]">
          <img
            src={selectedPost || currentUser.userPosts?.[0] || assets.pokhara}
            alt="User Post"
            className="max-w-full max-h-full object-contain p-1"
          />
        </div>

        {/* Right: Content Area */}
        <div className="w-1/2 flex flex-col h-full">
          {/* Tab Buttons */}
          <div className="flex border-b border-gray-700 sticky top-0 bg-[#1a1a1a] z-10">
            <button
              className={`flex-1 py-4 font-medium cursor-pointer ${
                activeTab === 'comments' 
                  ? 'text-[#32CD32] border-b-2 border-[#32CD32]' 
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('comments')}
            >
              Comments
            </button>
            <button
              className={`flex-1 py-4 font-medium cursor-pointer ${
                activeTab === 'dropdowns' 
                  ? 'text-[#32CD32] border-b-2 border-[#32CD32]' 
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('dropdowns')}
            >
              Details
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden">
            {/* Comments Section */}
            <div className={`h-full ${activeTab === 'comments' ? 'block' : 'hidden'}`}>
              <div className="h-full overflow-y-auto">
                <Comment isModal={false} />
              </div>
            </div>
            
            {/* Dropdowns Section */}
            <div className={`h-full ${activeTab === 'dropdowns' ? 'block' : 'hidden'}`}>
              {currentUser.dropdowns?.length > 0 ? (
                <Dropdown dropdowns={currentUser.dropdowns} />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  No details available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='absolute top-10 right-20'>
        <img src={assets.cross_icon} alt="" className='w-5 cursor-pointer' onClick={() => setShowUserUploadedPosts(false)}/>
      </div>
    </div>
  );
};

export default UserUploadedPosts;