import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sidebar from './Componants/Sidebar.jsx'
import Products from './Pages/Products.jsx'
import Categories from './Pages/Categories.jsx'
import Authform from './Authenticetion/Authform.jsx'

export default function App() {

  const admin = localStorage.getItem("admin");

  return (
    <BrowserRouter>
      {admin ? (
        <>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/Categories" element={<Categories />} />
          </Routes>
        </>
      ) : (
        <Authform />
      )}
    </BrowserRouter>
  )
}
