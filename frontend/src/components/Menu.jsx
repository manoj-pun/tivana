import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../assets/assets';

const Menu = () => {

  const navigate = useNavigate();

  const {backendUrl,setUserData,setIsLoggedIn,setShowMenu} = useContext(AppContext)

  const logout = async() => {
    try{
      axios.defaults.withCredentials = true

      const {data} = await axios.post(backendUrl + "/api/auth/logout-user")

      if (data.success) {
        setIsLoggedIn(false);
        setUserData(false);
        setShowMenu(false);
        navigate("/");
      }
    }catch(error){
      toast.error(error.message)
    }
  }

  return (
    <div onClick={logout} className='flex text-white fixed left-0 right-0 bottom-37'>
      <span oncli className='max-sm:hidden px-3 bg-[#393939] py-3 w-[230px] h-[50px] rounded ml-2.5 cursor-pointer'>Logout</span>

      <img src={assets.logout} className='w-10 h-10 sm:hidden bg-[#393939] p-2 fixed left-4 bottom-38 cursor-pointer rounded'/>
    </div>
  )
}

export default Menu
