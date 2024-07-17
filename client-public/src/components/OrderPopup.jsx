import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { GoogleLogin } from '@react-oauth/google';

const OrderPopup = ({ orderPopup, setOrderPopup }) => {
  const [registerPopup, setRegisterPopup] = useState(true); // Initially show the registration popup
  const [loginPopup, setLoginPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function googleLogin(codeResponse) {
    try {
        console.log(codeResponse);
        const { data } = await axios.post(
            `http://localhost:3000/google-login`, null, {
            headers: {
                token: codeResponse.credential
            }
        });
        localStorage.setItem("access_token", data.access_token)
        setRegisterPopup(false);
        setLoginPopup(false);
        navigate('/')
    } catch (error) {
        console.log(error);
    }
}


  const openRegisterPopup = () => {
    setRegisterPopup(true);
    setLoginPopup(false); // Ensure login popup is closed when opening register popup
  };

  const closeRegisterPopup = () => {
    setRegisterPopup(false);
    setOrderPopup(false); // Close the main order popup when closing register popup
  };

  const openLoginPopup = () => {
    setLoginPopup(true);
    setRegisterPopup(false); // Ensure register popup is closed when opening login popup
  };

  const closeLoginPopup = () => {
    setLoginPopup(false);
    setOrderPopup(false); // Close the main order popup when closing login popup
  };

  

  return (
    <>
      {orderPopup && (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-50 bg-black/50 backdrop-blur-sm">
          {registerPopup && (
            <div className="bg-white dark:bg-gray-900 shadow-md rounded-md w-[300px] p-4 duration-200">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-gray-700 dark:text-white">
                  Register Your Account
                </h1>
                <IoCloseOutline
                  className="text-2xl cursor-pointer text-gray-400 dark:text-gray-300"
                  onClick={closeRegisterPopup}
                />
              </div>
              {/* Body */}
              <div className="mt-4 space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1"
                />
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1"
                />
                <div className="flex items-center space-x-4">
                  <label htmlFor="male" className="flex items-center">
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      className="mr-2"
                    />
                    Male
                  </label>
                  <label htmlFor="female" className="flex items-center">
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      className="mr-2"
                    />
                    Female
                  </label>
                </div>
                <input
                  type="date"
                  placeholder="Birth Date"
                  className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1"
                />
                <div className="flex justify-center items-center space-x-2">
                  <button className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full">
                    Register
                  </button>
                  <div>
                  <GoogleLogin onSuccess={googleLogin} />
                  </div>
                </div>
                <div className="text-center text-gray-600 dark:text-gray-400 text-sm mt-4">
                  Already have an account?{" "}
                  <button className="text-primary" onClick={openLoginPopup}>
                    Log In!
                  </button>
                </div>
              </div>
            </div>
          )}
          {loginPopup && (
            <div className="bg-white dark:bg-gray-900 shadow-md rounded-md w-[300px] p-4 duration-200">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-gray-700 dark:text-white">
                  Log In to Your Account
                </h1>
                <IoCloseOutline
                  className="text-2xl cursor-pointer text-gray-400 dark:text-gray-300"
                  onClick={closeLoginPopup}
                />
              </div>
              {/* Body */}
              <div className="mt-4 space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1"
                />
                <div className="flex justify-center items-center space-x-2">
                  <button className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full">
                    Log In
                  </button>
                </div>
                <div className="text-center text-gray-600 dark:text-gray-400 text-sm mt-4">
                  Don't have an account yet?{" "}
                  <button className="text-primary" onClick={openRegisterPopup}>
                    Register Now!
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default OrderPopup;