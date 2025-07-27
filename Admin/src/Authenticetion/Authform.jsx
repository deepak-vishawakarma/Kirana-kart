import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Authform() {
  const navigate = useNavigate();
  const [currentForm, setCurrentForm] = useState('signup');

  // ✅ Signup Handler
  async function HandleSignup(e) {
    e.preventDefault();
    const SignupData = {
      firstname: e.target.firstname.value,
      lastname: e.target.lastname.value,
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const Res = await axios.post('https://kirana-kart.onrender.com/Admin/User/Signup', SignupData);
      console.log("Signup Success:", Res.data);
      localStorage.setItem("admin", JSON.stringify(Res.data));
      localStorage.setItem("token", Res.data.token);
      navigate("/");
      window.location.reload();
      alert("Signup Succecfull")
    } catch (err) {
      console.error("Signup Error:", err);
      alert("Signup Faield")
    }
  }

  // ✅ Login Handler
  async function HandleLogin(e) {
    e.preventDefault();
    const logindata = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const Res = await axios.post('https://kirana-kart.onrender.com/Admin/User/Login', logindata);
      console.log("Login Success:", Res.data);
      localStorage.setItem("admin", JSON.stringify(Res.data));
      localStorage.setItem("token", Res.data.token);
      navigate("/");
      window.location.reload();
      alert("Login Succecfull")
    } catch (err) {
      console.error("Login Error:", err);
      alert("Login Faield")
    }
  }

  // ✅ Login Form
  const LoginForm = () => (
    <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

      <form className="space-y-4" onSubmit={HandleLogin}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter password"
          />
           <p className='w-full px-3 py-2'>Maximum 8 Characters</p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => setCurrentForm('signup')}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          Don't have an account? Sign up
        </button>
      </div>
    </div>
  );

  // ✅ Signup Form
  const SignupForm = () => (
    <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Admin Signup</h2>

      <form className="space-y-4" onSubmit={HandleSignup}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input
            type="text"
            name="firstname"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter first name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input
            type="text"
            name="lastname"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter last name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            type="text"
            name="username"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter username"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter password"
          />
           <p className='w-full px-3 py-2'>Maximum 8 Characters</p>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Sign Up
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => setCurrentForm('login')}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {currentForm === 'login' ? <LoginForm /> : <SignupForm />}
    </div>
  );
}
