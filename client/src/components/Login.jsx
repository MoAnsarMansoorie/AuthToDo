import React, { useState } from 'react';
import axios from "axios";
import { AUTH_API_END_POINT } from '../utils/constant';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/auth';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const {setAuth} = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${AUTH_API_END_POINT}/api/auth/login`, { email, password });
      if (res.data.success) {
        // setAuth({
        //   user: res.data.user,
        //   token: res.data.token
        // });
        console.log("User logged in successfully");
        localStorage.setItem("token", res.data.token || "true");
        navigate("/todo");

      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.log("Login error", error);
    }
  };

  return (
    <div className='flex justify-center items-center w-full'>
      <div className="bg-white p-12 rounded-lg shadow-md w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center mb-4 text-gray-800 font-bold text-2xl">Login</h2>
          <div className="mb-2 font-bold text-xl block text-gray-500">
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
            Login
          </button>          
          <p className='text-sm text-gray-400'>Dont have an account </p>
          <button className='text-blue-500 text-md' onClick={() => navigate("/")}>Please Register</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
