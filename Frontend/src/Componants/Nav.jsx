import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  UserPlus,
  Home,
  ShoppingBag,
  Store,
  ShoppingCart,
  MessageCircle,
  HelpCircle,
  Menu,
  X,
} from "lucide-react";

export default function Nav({ setsearch }) {
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setsearch(searchInput);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchInput, setsearch]);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-green-700">KiranaKart</div>

        {/* Hamburger - mobile only */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-600 hover:text-green-600">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Search bar - desktop only */}
        {isloggedIn && (
          <div className="hidden md:block flex-1 mx-6">
            <div className="relative">
              <input
                onChange={handleInputChange}
                value={searchInput}
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>
        )}

        {/* Navigation Links - desktop */}
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-700 font-medium">
          {isloggedIn ? (
            <>
              <NavLink to="/" icon={<Home size={16} />} label="Home" />
              <NavLink to="/Categories" icon={<ShoppingBag size={16} />} label="Categories" />
              <NavLink to="/Products" icon={<Store size={16} />} label="Products" />
              <NavLink to="/Cart" icon={<ShoppingCart size={16} />} label="Cart" />
              <NavLink to="/Contact" icon={<MessageCircle size={16} />} label="Contact" />
              <NavLink to="/Help" icon={<HelpCircle size={16} />} label="Help" />
              <button
                onClick={handleLogout}
                className="bg-green-600 text-white px-4 py-1.5 rounded hover:bg-green-700"
              >
                Log Out
              </button>
            </>
          ) : (
            <Link to="/SignUp" className="flex items-center gap-1 hover:text-green-600">
              <UserPlus size={16} /> Sign Up
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && isloggedIn && (
        <div className="md:hidden px-4 pb-4 space-y-3 text-sm font-medium text-gray-700 bg-white border-t">
          <MobileLink to="/" label="Home" />
          <MobileLink to="/Categories" label="Categories" />
          <MobileLink to="/Products" label="Products" />
          <MobileLink to="/Cart" label="Cart" />
          <MobileLink to="/Contact" label="Contact" />
          <MobileLink to="/Help" label="Help" />
          <button
            onClick={handleLogout}
            className="block w-full text-left bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Log Out
          </button>
        </div>
      )}
    </nav>
  );
}

// Reusable components
function NavLink({ to, icon, label }) {
  return (
    <Link to={to} className="flex items-center gap-1 hover:text-green-600 transition">
      {icon} <span>{label}</span>
    </Link>
  );
}

function MobileLink({ to, label }) {
  return (
    <Link to={to} className="block hover:text-green-600">
      {label}
    </Link>
  );
}
