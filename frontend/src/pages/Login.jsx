import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);
  const [state, setState] = useState('Login');
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;

      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/auth/register-user', {
          username,
          fullname,
          email,
          password,
        });

        if (data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate('/home');
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/auth/login-user', {
          email,
          password,
        });

        if (data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate('/home');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black px-4 sm:px-6 lg:px-8">
      {/* Logo */}
      <div className={`absolute top-8 left-8 sm:left-16 flex items-center gap-3 group ${state === 'Sign Up' ? 'max-sm:hidden' : ''}`}>
        <img
          src={assets.logo}
          alt="Tivana Logo"
          className="w-10 h-10 rounded cursor-pointer transition-all duration-300 group-hover:scale-110"
        />
        <img src={assets.logoMain} alt="" className="hidden sm:block cursor-pointer w-24 h-20"/>
      </div>

      {/* Image Side */}
      <div className="hidden md:flex w-1/2 justify-center items-center p-12">
        <img
          src={assets.loginCover}
          alt="Login Cover"
          className="max-h-[80vh] rounded-2xl shadow-2xl object-cover transform transition-all duration-500 hover:scale-105"
        />
      </div>

      {/* Form Side */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-700 backdrop-blur-sm">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">
            {state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-gray-400 text-sm">
            {state === 'Sign Up' ? 'Join our community today' : 'Login to continue your journey'}
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-6">
          {state === 'Sign Up' && (
            <>
              <div className="relative">
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  className="w-full px-5 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  type="text"
                  placeholder="Username"
                />
              </div>
              <div className="relative">
                <input
                  onChange={(e) => setFullname(e.target.value)}
                  value={fullname}
                  className="w-full px-5 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  type="text"
                  placeholder="Full Name"
                />
              </div>
            </>
          )}
          <div className="relative">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full px-5 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="relative">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full px-5 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              type="password"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-medium cursor-pointer hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-green-500/30"
          >
            {state === 'Sign Up' ? 'Create Account' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          {state === 'Sign Up' ? (
            <p className="text-gray-400 text-sm">
              Already have an account?{' '}
              <span
                onClick={() => setState('Login')}
                className="text-green-400 cursor-pointer hover:text-green-300 underline transition-colors"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-gray-400 text-sm">
              Don't have an account?{' '}
              <span
                onClick={() => setState('Sign Up')}
                className="text-green-400 cursor-pointer hover:text-green-300 underline transition-colors"
              >
                Sign up
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;