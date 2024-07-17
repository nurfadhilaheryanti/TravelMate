import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Toastify from "toastify-js";

export default function Login({ url }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const {data} = await axios.post(`${url}/login`, { email, password });
      localStorage.setItem("access_token", data.token);
      localStorage.setItem("user_id", data.id);
      navigate('/');
    } catch (error) {
      console.log(error);
      // Handle login error
      Toastify({
        text: error.response.data.message,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h1 className="text-xl font-semibold text-gray-700 dark:text-white text-center">
          Log In to Your Account
        </h1>
        {/* Body */}
        <div className="mt-4 space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1"
          />
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={handleLogin}
              className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full"
            >
              Log In
            </button>
          </div>
          <div className="text-center text-gray-600 dark:text-gray-400 text-sm mt-4">
            Don't have an account yet?{" "}
            <button
              className="text-primary"
              onClick={() => navigate('/register')}
            >
              Register Now!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
