import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

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
    <div onClick={logout} className='text-white fixed left-0 right-0 bottom-37 px-3 bg-[#393939] py-3 w-[230px] h-[50px] rounded ml-2.5 cursor-pointer'>
      Logout
    </div>
  )
}

export default Menu
