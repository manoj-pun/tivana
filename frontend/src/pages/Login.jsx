import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from "axios";
import { toast } from 'react-toastify';

const Login = () => {

    const navigate = useNavigate();

    const {backendUrl,setIsLoggedIn,getUserData} = useContext(AppContext)

    const [state,setState] = useState("Login");
    const [username,setUsername] = useState("")
    const [fullname,setFullname] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const onSubmitHandler = async (e) => {
        try {
          e.preventDefault();

          axios.defaults.withCredentials = true;
      
          if (state === "Sign Up") {
            const { data } = await axios.post(backendUrl + "/api/auth/register-user", {
              username, fullname, email, password,
            });
      
            if (data.success) {
              setIsLoggedIn(true);
              getUserData()
              navigate("/");
            } else {
              toast.error(data.message);
            }
      
          } else {
            const { data } = await axios.post(backendUrl + "/api/auth/login-user", {
              email, password,
            });
      
            if (data.success) {
              setIsLoggedIn(true);
              getUserData()
              navigate("/");
            } else {
              toast.error(data.message);
            }
          }
        } catch (error) {
          toast.error(error.response?.data?.message);
        }
      };
      

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-black'>
        <div onClick={() => navigate("/")} className="absolute top-5 left-5 sm:left-20 flex items-center gap-2">
            <img src={assets.logo} alt="" className="w-10 h-10 rounded cursor-pointer sm:hidden" />
            <p className="hidden sm:block font-serif italic text-2xl cursor-pointer max-sm:hidden text-white">Tivana</p>
        </div>

        <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
            <h2 className='text-3xl font-semibold text-white text-center mb-3'>{state === "Sign Up" ? "Create Account" : "Login"}</h2>
            <p className='text-center text-sm mb-6'>{state === "Sign Up" ? "Create your account" : "Login to your account"}</p>
            <form onSubmit={onSubmitHandler}>
                {state === "Sign Up" && (
                    <>
                        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                            <input onChange={e => setUsername(e.target.value)} value={username} className='bg-transparent outline-none' type="text" placeholder='username' required/>
                        </div>

                        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                            <input onChange={e => setFullname(e.target.value)} value={fullname} className='bg-transparent outline-none' type="text" placeholder='Full Name' required/>
                        </div>
                    </>
                )}
                
                <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                    <input onChange={e => setEmail(e.target.value)} value={email} className='bg-transparent outline-none' type="email" placeholder='Email' required/>
                </div>

                <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                    <input onChange={e => setPassword(e.target.value)} value={password} className='bg-transparent outline-none' type="password" placeholder='Password' required/>
                </div>

                {/* <p onClick={() => navigate("/reset-password")} className='mb-4 text-indigo-500 cursor-pointer'>Forgot Password ?</p> */}

                <button className='w-full py-2.5 rounded-full bg-[#32CD32] text-white font-medium cursor-pointer'>{state}</button>
            </form>

            {state === "Sign Up" ? (
                <p className='text-gray-400 text-center text-xs mt-4'>Already have an account?{" "}
                <span onClick={() => setState("Login")} className='text-[#32CD32] cursor-pointer underline'>Login here</span>
                </p>
            ) : (
                <p className='text-gray-400 text-center text-xs mt-4'>Don't have an account?{" "}
                <span onClick={() => setState("Sign Up")} className='text-[#32CD32] cursor-pointer underline'>Sign up</span>
                </p>
            )}   
        </div>
    </div>
  )
}

export default Login