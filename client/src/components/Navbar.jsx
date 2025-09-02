import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";   // for authentication
import { useCart } from "../context/CartContext";   // for cart
// 🛒 Import cart
import { FaShoppingCart } from "react-icons/fa";

function Navbar() {
  const { currentUser, logout } = useAuth();
  const { cart } = useCart();

  // 🛒 Count total items in cart
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-[#0A122A] text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <h1 className="text-xl font-bold">Vastra Couture</h1>

      {/* Links */}
      <div className="flex items-center space-x-6">
        <Link to="/" className="hover:text-gray-300">
          Home
        </Link>

        <Link to="/products" className="hover:text-gray-300">
          Products
        </Link>

        {/* 🛒 Cart with Badge */}
        <Link to="/cart" className="relative hover:text-gray-300 text-lg">
          <FaShoppingCart size={22} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>

        {currentUser ? (
          <>
            <span className="text-sm">Hello, {currentUser.displayName}</span>
            <button
              onClick={logout}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-300">
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-300">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
