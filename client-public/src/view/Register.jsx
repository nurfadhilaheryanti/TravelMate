import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import Toastify from "toastify-js"

export default function Register({ url }) {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const navigate = useNavigate();

  async function handleRegister() {
    try {
      const response = await axios.post(`${url}/register`, {
        fullName,
        username,
        email,
        password,
        gender,
        birthDate,
        imgUrl
      });
      
      Toastify({
        text: "Success Register",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#00B29F",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();

      // Handle successful registration (e.g., navigate to a different page or show a success message)
      // console.log("Registration successful:", response.data);
      navigate('/');
    } catch (error) {
      Toastify({
        text: error.response.data.message,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
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

  async function googleLogin(codeResponse) {
    try {
      console.log(codeResponse);
      const { data } = await axios.post(
        `${url}/google-login`, null, {
          headers: {
            token: codeResponse.credential
          }
        }
      );
      console.log(data);
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("id", data.id);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Register Your Account</h1>
      <div className="w-full max-w-xs">
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-full border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-primary"
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-full border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-primary"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-full border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-primary"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-full border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-primary"
        />
         <input
          type="imgUrl"
          placeholder="Image (URL)"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-full border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-primary"
        />
        <div className="flex items-center mb-4">
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            checked={gender === 'male'}
            onChange={(e) => setGender(e.target.value)}
            className="mr-2 cursor-pointer"
          />
          <label htmlFor="male" className="cursor-pointer">Male</label>
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={gender === 'female'}
            onChange={(e) => setGender(e.target.value)}
            className="ml-6 mr-2 cursor-pointer"
          />
          <label htmlFor="female" className="cursor-pointer">Female</label>
        </div>
        <input
          type="date"
          placeholder="Birth Date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-full border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-primary"
        />
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleRegister}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white py-3 rounded-full transition duration-300 focus:outline-none"
          >
            Register
          </button>
          <GoogleLogin onSuccess={googleLogin} className="w-full">
            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full transition duration-300 focus:outline-none">
              Sign in with Google
            </button>
          </GoogleLogin>
        </div>
        <div className="text-center mt-4 text-gray-600 text-sm">
          Already have an account?{" "}
          <button className="text-primary" onClick={() => navigate('/login')}>
            Log In!
          </button>
        </div>
      </div>
    </div>
  );
}
