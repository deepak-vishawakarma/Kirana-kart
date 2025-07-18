import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"))?.User;
  const [product, setProduct] = useState([]);
  const [address, setAddress] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(`http://localhost:5500/api/product/data/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
    fetchProduct();
  }, [id]);

  const handlePlaceOrder = async () => {
    if (!user) return alert("Please login first");

    try {
      const res = await axios.post("http://localhost:5500/api/order", {
        userId: user.id,
        productId: product._id,
        address: address || "Default Address",
      });


      if (res.status === 200) {
        alert("🎉 Order Placed Successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("Order Error", error);
      alert("❌ Failed to place order");
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-700">Checkout</h1>

      {product ? (
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-5">
          <img
            src={product.ProductPhoto}
            alt={product.ProductName}
            className="w-full h-60 object-cover rounded-md mb-4"
          />
          <h2 className="text-xl font-bold text-gray-800">{product.ProductName}</h2>
          <p className="text-gray-700 text-sm">{product.ProductDetails}</p>
          <p className="text-gray-500 text-sm">{product.ProductDiscriptions}</p>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
            <textarea
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Place Order
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading product details...</p>
      )}
    </div>
  );
}
