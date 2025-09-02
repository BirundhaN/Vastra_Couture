import React from "react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">🛒 Your cart is empty.</p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">₹{item.price}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-3 py-1 bg-gray-300 rounded-l hover:bg-gray-400"
                    >
                      ➖
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-3 py-1 bg-gray-300 rounded-r hover:bg-gray-400"
                    >
                      ➕
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Cart summary */}
          <div className="mt-6 p-4 border rounded-lg shadow-md bg-gray-50">
            <h3 className="text-xl font-bold">Total: ₹{total}</h3>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={clearCart}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Clear Cart
              </button>
              <button
                onClick={() => alert("Checkout coming soon!")}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
