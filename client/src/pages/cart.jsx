import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom"; // 👈 add this

export default function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-8 bg-gradient-to-br from-pink-50 to-purple-100 min-h-screen">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-purple-800">
        🛍️ Your Shopping Cart
      </h2>

      {cart.length === 0 ? (
        <div className="text-center text-gray-600 text-lg mt-20">
          <p>😔 Your cart is empty</p>
          <p className="mt-2 text-purple-700 font-semibold">
            Add some products and start shopping!
          </p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border rounded-2xl shadow-md p-4 bg-white hover:shadow-xl transition"
            >
              {/* Left side: Image + Info */}
              <div className="flex items-center space-x-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg shadow"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 line-through">
                    ₹{item.price + 500}
                  </p>
                  <p className="text-green-600 font-bold">₹{item.price}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center mt-3">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-3 py-1 bg-gray-200 rounded-l-lg hover:bg-gray-300"
                    >
                      ➖
                    </button>
                    <span className="px-4 text-lg font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-3 py-1 bg-gray-200 rounded-r-lg hover:bg-gray-300"
                    >
                      ➕
                    </button>
                  </div>
                </div>
              </div>

              {/* Remove button */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 shadow-md"
              >
                ❌ Remove
              </button>
            </div>
          ))}

          {/* Cart Summary */}
          <div className="mt-10 p-6 border rounded-2xl shadow-xl bg-gradient-to-r from-purple-200 to-pink-200">
            <h3 className="text-2xl font-bold text-gray-800">
              Total: <span className="text-green-700">₹{total}</span>
            </h3>

            <div className="flex space-x-6 mt-6">
              <button
                onClick={clearCart}
                className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 shadow-md"
              >
                🗑️ Clear Cart
              </button>

              {/* ✅ Changed from alert → real navigation */}
              <Link to="/checkout">
                <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-xl hover:opacity-90 shadow-md">
                  ✅ Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
