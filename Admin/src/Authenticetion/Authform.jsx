import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Authform() {
  const navigate = useNavigate();
  const [currentForm, setCurrentForm] = useState('signup');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });

  // ✅ Signup Handler
  async function HandleSignup(e) {
    e.preventDefault();
    setLoading(true);
    setAlert({ type: '', message: '' });

    const SignupData = {
      firstname: e.target.firstname.value,
      lastname: e.target.lastname.value,
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const Res = await axios.post(
        'https://kirana-kart.onrender.com/Admin/User/Signup',
        SignupData
      );

      localStorage.setItem('admin', JSON.stringify(Res.data));
      localStorage.setItem('token', Res.data.token);

      setAlert({ type: 'success', message: 'Signup successful!' });
      navigate('/');
      window.location.reload();
    } catch (err) {
      console.error('Signup Error:', err);
      if (err.response?.status === 409) {
        setAlert({ type: 'error', message: 'Email already exists!' });
      } else {
        setAlert({ type: 'error', message: 'Signup failed. Try again.' });
      }
    } finally {
      setLoading(false);
    }
  }

  // ✅ Login Handler
  async function HandleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setAlert({ type: '', message: '' });

    const logindata = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const Res = await axios.post(
        'https://kirana-kart.onrender.com/Admin/User/Login',
        logindata
      );

      localStorage.setItem('admin', JSON.stringify(Res.data));
      localStorage.setItem('token', Res.data.token);

      setAlert({ type: 'success', message: 'Login successful!' });
      navigate('/');
      window.location.reload();
    } catch (err) {
      console.error('Login Error:', err);
      if (err.response?.status === 404) {
        setAlert({ type: 'error', message: 'Admin not found!' });
      } else if (err.response?.status === 401) {
        setAlert({ type: 'error', message: 'Invalid password!' });
      } else {
        setAlert({ type: 'error', message: 'Login failed. Try again.' });
      }
    } finally {
      setLoading(false);
    }
  }

  // ✅ Alert Component
  const AlertBox = () =>
    alert.message && (
      <div
        className={`mb-4 text-center py-2 rounded-md ${
          alert.type === 'error'
            ? 'bg-red-100 text-red-700 border border-red-400'
            : 'bg-green-100 text-green-700 border border-green-400'
        }`}
      >
        {alert.message}
      </div>
    );

  // ✅ Loader Component
  const Loader = () => (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></div>
      <span className="ml-2 text-blue-600">Processing...</span>
    </div>
  );

  // ✅ Login Form
  const LoginForm = () => (
    <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

      {AlertBox()}
      {loading && Loader()}

      <form className="space-y-4" onSubmit={HandleLogin}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter password"
          />
          <p className="text-xs text-gray-500 px-1">Maximum 8 Characters</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Logging in...' : 'Login'}
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

      {AlertBox()}
      {loading && Loader()}

      <form className="space-y-4" onSubmit={HandleSignup}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter first name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter last name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter username"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter password"
          />
          <p className="text-xs text-gray-500 px-1">Maximum 8 Characters</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
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
