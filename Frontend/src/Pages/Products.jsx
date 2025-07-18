import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Redux/ProductSlice.js";
import { Star, Info, PackageSearch, IndianRupee } from "lucide-react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function Products({ search }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products);
  const [Searchdata, setSearchdata] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"))?.User;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      let filtered = products;

      if (id) {
        filtered = products.filter((product) =>
          product.ProductCetagorie?.some((cat) => cat._id === id)
        );
      } else if (search) {
        filtered = products.filter((product) =>
          product.ProductName?.toLowerCase().includes(search.toLowerCase())
        );
      }

      setSearchdata(filtered);
    }, 500);

    return () => clearTimeout(timer);
  }, [search, products, id]);

  const handleAddToCart = async (productId) => {
    try {
      await axios.post("http://localhost:5500/api/cart", {
        userId: user?.id,
        product: productId,
      });
   
      alert("🛒 Product added to cart!");
    } catch (err) {
      console.error("Error adding to cart", err);
      alert("❌ Failed to add to cart.");
    }
  };

  const handleBuyNow = (productId) => {
    navigate(`/checkout/${productId}`);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10 tracking-tight flex justify-center items-center gap-2">
        <PackageSearch className="text-indigo-600" size={28} />
        {id ? "Category Products" : "All Products"}
      </h1>

      {Searchdata.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-500">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
            <div className="absolute inset-3 border-4 border-blue-600 border-t-transparent rounded-full animate-spin-slow"></div>
          </div>
          <p className="mt-6 text-lg">No products found.</p>
        </div>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {Searchdata.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100"
            >
              <div className="h-48 overflow-hidden">
                {product.ProductPhoto ? (
                  <img
                    src={product.ProductPhoto}
                    alt={product.ProductName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
                    <PackageSearch size={48} className="text-white opacity-80" />
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col h-full">
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  {product.ProductName || "Untitled Product"}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-1">{product.ProductDetails}</p>
                <p className="text-sm text-gray-600 line-clamp-2">{product.ProductDiscriptions}</p>

                <div className="flex justify-between items-center text-sm mt-4 mb-2">
                  <span className="flex items-center gap-1 text-green-600 font-semibold">
                    <IndianRupee size={16} /> {product.ProductPrice}
                  </span>
                  <span className="flex items-center gap-1 text-yellow-500">
                    <Star size={16} /> {product.ProductReating || "N/A"}
                  </span>
                </div>

                <button
                  onClick={() => handleBuyNow(product._id)}
                  className="bg-green-600 text-white py-2 rounded-md hover:bg-green-700 mb-2 transition"
                >
                  Buy Now
                </button>

                <button
                  onClick={() => handleAddToCart(product._id)}
                  className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
