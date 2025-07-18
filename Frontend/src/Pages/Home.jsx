// ✅ Redesigned Home.jsx
import React from "react";
import { ShoppingCart, Truck, Star, ThumbsUp, ShieldCheck, Gift, Store, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-white to-green-50 text-gray-800 min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative">
        <div className="h-72 sm:h-96 bg-green-100 overflow-hidden">
          <img
            src="https://freepngimg.com/thumb/grocery/41630-3-groceries-picture-free-transparent-image-hd.png"
            alt="Groceries"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <h1 className="text-4xl font-bold text-green-900">Fresh Groceries Delivered Daily</h1>
            <p className="text-lg text-gray-800 mt-4 max-w-xl">
              Quality products at affordable prices delivered to your doorstep.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <button onClick={() => navigate("/Categories")} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full flex items-center">
                <Store className="mr-2" size={18} /> Visit Store
              </button>
              <button onClick={() => navigate("/Products")} className="bg-gray-900 hover:bg-gray-700 text-white px-6 py-2 rounded-full flex items-center">
                <Eye className="mr-2" size={18} /> Browse Products
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="bg-green-700 text-white text-center py-6">
        <p className="italic text-lg font-light">"Fresh food, delivered with care - because quality matters in every meal you prepare."</p>
      </div>

      {/* Features */}
      <section className="py-10 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[{
            icon: ShoppingCart,
            title: "Wide Range of Products",
            desc: "Explore thousands of daily essentials at one place."
          }, {
            icon: Truck,
            title: "Fast Delivery",
            desc: "Order before noon for same-day delivery."
          }, {
            icon: Star,
            title: "Trusted by Many",
            desc: "Rated highly by thousands of happy customers."
          }, {
            icon: ThumbsUp,
            title: "Quality Assurance",
            desc: "Freshness guaranteed or your money back."
          }, {
            icon: ShieldCheck,
            title: "Secure Payment",
            desc: "Multiple payment options. Transactions are safe."
          }, {
            icon: Gift,
            title: "Exciting Offers",
            desc: "Enjoy daily discounts and special deals."
          }].map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
              <item.icon size={40} className="text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-center mb-2">{item.title}</h3>
              <p className="text-gray-600 text-center">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-green-50 py-8 px-4 text-center">
        <h2 className="text-2xl font-bold text-green-700 mb-4">Subscribe for Offers</h2>
        <p className="text-gray-700 mb-6 max-w-lg mx-auto">Stay updated with our latest deals and promotions.</p>
        <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button className="bg-green-600 text-white px-6 py-2 rounded-full font-medium hover:bg-green-700">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
}