import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
//const {url} = require("../config.json")[process.env.NODE_ENV];

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login/validate`, {
        employeeEmail: username,
        employeePassword: password,
      });

      if (response.status === 200) {
        const { role } = response.data; // Assuming you get role in the response
        if (role === 'admin') {
          navigate.push('/admin-dashboard'); // Redirect to admin dashboard
        } else {
          navigate.push('/routes/members'); // Redirect to member dashboard
        }
      }
    } catch (e) {
      if (e.response && e.response.status === 401) {
        alert("Invalid Username and Password");
      } else {
        console.error(e);
      }
    }
  };

  return (
    <main className="flex items-center justify-center h-screen bg-[#165e229e] ">
      <div className="bg-white rounded-lg shadow-lg px-24 py-28">
        <h1 className=" text-[#333] font-bold text-xl text-center">Login</h1>

        <form onSubmit={handleLogin} className="flex-col items-center ">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 mb-4 border border-[#165e229e] rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password" // Change to password for security
            placeholder="Password"
            className="w-full p-2 mb-4 border border-[#165e229e] rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="flex items-center justify-center bg-[#165e229e] hover:bg-green-800 px-4 py-2 w-full"
          >
            Login
          </button>

          <div className="flex items-center justify-center mt-4 mb-2">
            <div className="border-t border-[#165e229e] flex-grow"></div>
            <p className="px-2 text-[#333]">Don't have an account?</p>
            <div className="border-t border-[#165e229e] flex-grow"></div>
          </div>

          <Link to="/signup">
            <button className="flex items-center justify-center bg-[#165e229e] hover:bg-green-800 px-4 py-2 w-full">
              Sign Up
            </button>
          </Link>

          <Link to="/AdminLogin"> {/* Link to Admin Login */}
            <button className="flex items-center justify-center bg-[#165e229e] hover:bg-green-800 px-4 py-2 w-full mt-2">
              Admin Login
            </button>
          </Link>
        </form>
      </div>
    </main>
  );
}

export default Login;