import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cartdata, setCartData] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")).User;
  const navigate = useNavigate();

  const getCart = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/api/cart/${user.id}`
      );
      setCartData(response.data);
    } catch (error) {
      console.error("Error fetching cart data", error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const total = cartdata.reduce((sum, item) => sum + item.ProductPrice, 0);

  const handleBuyNow = (productId) => {
    navigate(`/checkout/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 py-8 px-4 md:px-10">
      <h1 className="text-4xl font-extrabold text-center text-green-700 mb-10">
        🛒 Your Shopping Cart
      </h1>

      {cartdata.length === 0 ? (
        <div className="flex justify-center items-center h-96 bg-white rounded-xl shadow text-gray-500 text-lg">
          Your cart is empty.
        </div>
      ) : (
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {cartdata.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col h-full"
              >
                <img
                  src={item.ProductPhoto}
                  alt={item.ProductName}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <h2 className="text-lg font-bold text-gray-800 mb-1">
                    {item.ProductName}
                  </h2>
                  <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                    {item.ProductDiscriptions}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-700 mt-auto">
                    <span className="text-green-600 font-semibold text-lg">
                      ₹{item.ProductPrice}
                    </span>
                    <span className="text-yellow-500">
                      ⭐ {item.ProductReating}
                    </span>
                  </div>
                  <button
                    onClick={() => handleBuyNow(item._id)}
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg w-full transition"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl shadow p-6 h-fit sticky top-24 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                🧾 Summary
              </h3>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Total Items:</span>{" "}
                {cartdata.length}
              </p>
              <p className="text-gray-600 mb-6">
                <span className="font-medium">Total Payment:</span>
                <span className="text-green-700 font-bold text-lg ml-2">
                  ₹{total}
                </span>
              </p>
            </div>
            <button
              onClick={() => navigate("/checkout/" + cartdata[0]?._id)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
