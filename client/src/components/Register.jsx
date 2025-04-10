import React, { useState } from 'react';
import axios from "axios";
import { AUTH_API_END_POINT } from "../utils/constant";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${AUTH_API_END_POINT}/api/auth/register`, { username, email, password });
      if (res.data.success) {
        console.log("User registered successfully");
        navigate("/login");
      } else {
        console.log("User registration failed");
      }
    } catch (error) {
      console.log("Registration error", error);
    }
  };
  
  return (
    <div className='flex justify-center items-center w-full'>
      <div className="bg-white p-12 rounded-lg shadow-md w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center mb-4 text-gray-800 font-bold text-2xl">Register</h2>
          <div className="mb-4">
            <label htmlFor='username' className='mb-2 font-bold text-xl block text-gray-500'>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="exampleInputName"
              placeholder="Enter your Name"
              className='border border-gray-300 rounded-md p-2 w-full'
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor='email' className='mb-2 font-bold text-xl block text-gray-500'>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="exampleInputEmail"
              placeholder="Enter email"
              className='border border-gray-300 rounded-md p-2 w-full'
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor='password' className='mb-2 font-bold text-xl block text-gray-500'>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="exampleInputPassword"
              placeholder="Enter password"
              className='border border-gray-300 rounded-md p-2 w-full'
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300 mt-4">
            Register
          </button>
          <p className='text-sm text-gray-400'>Already Have an account. </p>
          <button className="text-blue-500 text-md" onClick={() => navigate("/login")}>Please Login</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
