import React, { useContext,useEffect } from 'react';
import { assets, homeData } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Following = () => {
  const { setShowFollowing, currentUser } = useContext(AppContext);

  useEffect(() => {
    document.body.style.overflow = "hidden"

    return() => {
      document.body.style.overflow = "unset"
    }
  },[])
  
  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black flex justify-center items-center'>
      <div className='bg-[black] border-2 border-[#262626] rounded-lg w-96 max-h-[60vh] flex flex-col'> {/* Added max-h and flex-col */}
        <div className='flex items-center p-4 justify-between border-b-2 border-b-[#262626] pb-4'>
          <p className='font-semibold text-white'>Following</p>
          <img
            src={assets.cross_icon}
            alt="Close"
            className='w-4 h-4 cursor-pointer'
            onClick={() => setShowFollowing(false)}
          />
        </div>

        <div className='px-4 py-2 overflow-y-auto'> {/* Added overflow-y-auto */}
          {currentUser?.profileSection?.following?.map((following, index) => (
            <div key={index} className='flex items-center gap-3 mb-3'>
              <img
                src={following.followingImage}
                alt="Profile"
                className='w-10 h-10 rounded-full'
              />
              <div className='cursor-pointer'>
                <p className='text-white font-medium'>{following.followingUsername}</p>
                <p className='text-[#808080] text-sm'>{following.followingName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Following;