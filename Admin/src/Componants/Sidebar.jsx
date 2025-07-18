import React from 'react';
import { Link } from 'react-router-dom';


export default function Sidebar() {
  const handleLogout = () => {
    localStorage.removeItem("admin","token");
    window.location.reload();
  };

  return (
    <aside className="w-64 h-screen fixed bg-gray-900 text-white flex flex-col">
      <nav className="p-4">
        <h2 className="text-lg font-semibold mb-4">Admin Panel</h2>
        <ul className="space-y-2">
          <li>
            <Link to="/" className="hover:underline block">Products</Link>
          </li>
          <li>
            <Link to="/Categories" className="hover:underline block">Categories</Link>
          </li>
        </ul>
      </nav>
      <div className="mt-auto p-4 border-t border-gray-700">
        <button 
          onClick={handleLogout}
          className="text-red-400 hover:text-red-600 font-medium"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}