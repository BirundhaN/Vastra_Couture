import React, { useState } from "react";
import productsData from "../data/productsData";
import { useCart } from "../context/CartContext";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Products() {
  const { addToCart } = useCart();
  const [category, setCategory] = useState("All");
  const [subcategory, setSubcategory] = useState("All");
  const [showBanner, setShowBanner] = useState(false);
  const [addedItem, setAddedItem] = useState("");
  const navigate = useNavigate();

  // Get unique subcategories based on selected category
  const getSubcategories = (cat) => {
    if (cat === "All") return [];
    return [
      "All",
      ...new Set(
        productsData.filter((p) => p.category === cat).map((p) => p.subcategory)
      ),
    ];
  };

  const subcategories = getSubcategories(category);

  // Filter logic
  const filteredProducts = productsData.filter((p) => {
    if (category === "All") return true;
    if (subcategory === "All") return p.category === category;
    return p.category === category && p.subcategory === subcategory;
  });

  // Handle add to cart
  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItem(product.name);
    setShowBanner(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-6">
      <h2 className="text-3xl font-extrabold text-center mb-6 text-purple-700 drop-shadow">
        ✨ Our Products ✨
      </h2>

      {/* ✅ Added to Cart Banner (Fixed at bottom, manual close) */}
      {showBanner && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] sm:w-auto max-w-md bg-green-100 border border-green-400 text-green-700 rounded-lg shadow-lg p-4 z-50 flex flex-col sm:flex-row items-center justify-between gap-3 animate-slide-up">
          {/* Message */}
          <span className="text-center sm:text-left w-full sm:w-auto">
            ✅ {addedItem} has been added to your cart!
          </span>

          {/* Buttons (stack on mobile, inline on desktop) */}
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button
              onClick={() => navigate("/cart")}
              className="px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-md shadow hover:bg-green-600 transition w-full sm:w-auto"
            >
              View Cart 🛒
            </button>
            <button
              onClick={() => setShowBanner(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 text-sm font-semibold rounded-md shadow hover:bg-gray-400 transition w-full sm:w-auto"
            >
              ✖ Close
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {/* Category Dropdown */}
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setSubcategory("All");
          }}
          className="px-4 py-2 border-2 border-purple-400 rounded-lg bg-white shadow-md focus:ring-2 focus:ring-purple-500"
        >
          <option value="All">All</option>
          <option value="Women">Women</option>
          <option value="Men">Men</option>
          <option value="Kids">Kids</option>
          <option value="Home Decors">Home Decors</option>
        </select>

        {/* Subcategory Dropdown (dynamic) */}
        {category !== "All" && subcategories.length > 1 && (
          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="px-4 py-2 border-2 border-pink-400 rounded-lg bg-white shadow-md focus:ring-2 focus:ring-pink-500"
          >
            {subcategories.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
        {filteredProducts.map((product) => {
          const discountPrice = product.offer
            ? Math.round(product.price - (product.price * product.offer) / 100)
            : product.price;

          return (
            <div
              key={product.id}
              className="bg-white border rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition duration-300 relative"
            >
              {/* 🔥 Sale Badge */}
              {product.offer && (
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {product.offer}% OFF
                </div>
              )}

              {/* Product Image */}
              <img
  src={product.image}
  alt={product.name}
  className="w-full h-72 object-cover mb-4 rounded-lg"
/>


              {/* Name */}
              <h3 className="font-bold text-lg text-purple-700">
                {product.name}
              </h3>

              {/* ⭐ Ratings */}
              {product.rating && (
                <div className="flex items-center justify-center gap-1 mt-1">
                  <FaStar className="text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-xs text-gray-500">
                    ({product.reviews} reviews)
                  </span>
                </div>
              )}

              {/* Price Section */}
              <div className="mt-2">
                <span className="text-xl font-bold text-green-600">
                  ₹{discountPrice}
                </span>
                {product.offer && (
                  <span className="ml-2 text-sm line-through text-gray-400">
                    ₹{product.price}
                  </span>
                )}
              </div>

              {/* 🛒 Button */}
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-4 px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-pink-600 hover:to-purple-700 transition"
              >
                🛒 Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
