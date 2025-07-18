import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../Redux/CategorySlice.js";
import { useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  Layers,
  Sparkles,
  ChevronRight,
  Info,
} from "lucide-react";

export default function Categories({ search }) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const [Searchdata, setSearchdata] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const filtered = categories.filter((category) =>
        category.CategorieName.toLowerCase().includes(search.toLowerCase())
      );
      setSearchdata(filtered);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, categories]);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-10">
        <LayoutGrid className="text-indigo-600" size={28} />
        <h1 className="text-3xl font-bold text-gray-800">Explore Categories</h1>
      </div>

      {Searchdata.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-500">
          <div className="relative w-16 h-16 mb-4">
            <div className="absolute inset-0 border-4 border-blue-400 border-dashed rounded-full animate-spin" />
            <div className="absolute inset-3 border-4 border-blue-600 border-t-transparent rounded-full animate-spin-slow" />
          </div>
          <p>No categories found.</p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {Searchdata.map((category, index) => (
            <div
              key={index}
              onClick={() => navigate(`/category/${category._id}/products`)}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:scale-[1.01] transition-transform cursor-pointer overflow-hidden"
            >
              <div className="relative h-48 bg-gray-50">
                {category.CategoriePoster ? (
                  <img
                    src={category.CategoriePoster}
                    alt={category.CategorieName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600">
                    <Layers size={48} className="text-white opacity-80" />
                  </div>
                )}
              </div>

              <div className="p-5">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <Sparkles size={18} className="text-indigo-500" />
                    {category.CategorieName || "Untitled Category"}
                  </h2>
                  <div className="bg-indigo-100 p-1 rounded-full hover:bg-indigo-200 transition">
                    <Info size={16} className="text-indigo-600" />
                  </div>
                </div>

                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                  {category.CategorieDiscriptions ||
                    "No description available for this category."}
                </p>

                <button className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition">
                  View Details <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
