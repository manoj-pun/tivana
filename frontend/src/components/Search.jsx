import React, { useState } from 'react'
import { assets, searchData } from '../assets/assets'

const Search = () => {
  const [users, setUsers] = useState(searchData)

  const clearAllUsers = () => {
    setUsers([]) 
  }

  // Function to remove a specific user
  const removeUser = (userId) => {
    setUsers(users.filter(user => user._id !== userId))
  }

  return (
    <div className='w-90 max-sm:w-80 min-h-screen fixed top-0 bottom-0 border-r-[#262626] border-r-1 rounded-r-2xl bg-black'>
        <div className='pt-8 p-3'>
          <h1 className='text-white text-[25px] font-semibold mb-4'>Search</h1>
          <input type="text" placeholder='Search' className='p-1.5 w-full outline-none bg-[#212121] text-white rounded'/>
        </div>

        <hr className='mt-4 border-[#262626]'/>
        
        <div className='p-3 flex justify-between items-center'>
          <h1 className='text-white font-semibold'>Recent</h1>
          {users.length > 0 && (
            <span className='text-[#4193EF] cursor-pointer' onClick={clearAllUsers}>Clear all</span>
          )}
        </div>

        {users.length > 0 ? (
          <div>
            {users.map((user) => (
              <div key={user._id} className='flex items-center hover:bg-[#282828] p-2'>
                <img src={user.profileImage} alt={user.username} className='w-10 h-10 rounded-full mr-3 object-cover cursor-pointer'/>
                <div className='cursor-pointer'>
                  <p className='text-white font-medium'>{user.username}</p>
                  <p className='text-[#808080] text-sm'>{user.fullName}</p>
                </div>

                <div className='cursor-pointer ml-auto'onClick={() => removeUser(user._id)} >
                  <img src={assets.cross_icon} alt="Remove" className='w-4 h-4'/>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='text-[#808080] mt-10 flex items-center justify-around'>
            <p>Recent search will appear here.</p>
          </div>
        )}
    </div>
  )
}

export default Search
