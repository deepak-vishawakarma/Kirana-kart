import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from "./Componants/Nav.jsx";
import Home from "./Pages/Home.jsx";
import Categories from "./Pages/Categories.jsx";
import Products from "./Pages/Products.jsx";
import Cart from "./Pages/Cart.jsx";
import Contact from "./Pages/Contact.jsx";
import Help from "./Pages/Help.jsx";
import SignUp from "./Authenticetion/SignUp.jsx";
import Checkout from './Pages/Chakout.jsx'; // 👈 Make sure this file is named Chakout.jsx or fix import

export default function App() {
  const [search, setsearch] = useState("");
  const [isloggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user); // ✅ true if user exists
  }, []);

  return (
    <BrowserRouter>
      <Nav setsearch={setsearch} />
      <Routes>

        {/* Public Route */}
        <Route path="/SignUp" element={<SignUp />} />

        {/* Protected Routes */}
        <Route path="/" element={isloggedIn ? <Home /> : <SignUp />} />
        <Route path="/Categories" element={isloggedIn ? <Categories search={search} /> : <SignUp />} />
        <Route path="/Products" element={isloggedIn ? <Products search={search} /> : <SignUp />} />
        <Route path="/Cart" element={isloggedIn ? <Cart /> : <SignUp />} />
        <Route path="/Contact" element={isloggedIn ? <Contact /> : <SignUp />} />
        <Route path="/Help" element={isloggedIn ? <Help /> : <SignUp />} />
        <Route path="/category/:id/products" element={isloggedIn ? <Products search={search} /> : <SignUp />} />
        <Route path="/checkout/:id" element={isloggedIn ? <Checkout /> : <SignUp />} />

        {/* Fallback route for anything invalid */}
        <Route path="*" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}
