// src/pages/Checkout.jsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext"; // ✅ get logged-in user

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { currentUser } = useAuth(); // ✅ access user
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    payment: "cod", // default
    upiId: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!form.name || !form.email || !form.phone || !form.address) {
      alert("⚠️ Please fill all details before placing the order!");
      return;
    }

    if (!currentUser) {
      alert("⚠️ You must be logged in to place an order!");
      return;
    }

    try {
      // Generate random OTP
      const otp = Math.floor(100000 + Math.random() * 900000);

      // ✅ Save order into Firestore with customerId
      const docRef = await addDoc(collection(db, "orders"), {
        customerId: currentUser.uid, // 🔑 needed for Firestore rules
        customer: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
        },
        cart: cart,
        total: total,
        paymentMethod: form.payment,
        otp: otp,
        status: "pending", // later update to "delivered"
        createdAt: serverTimestamp(),
      });

      console.log("✅ Order stored with ID:", docRef.id);

      clearCart();
      navigate("/", {
        state: {
          orderSuccess: true,
          name: form.name,
          orderId: docRef.id,
        },
      });
    } catch (err) {
      console.error("❌ Error placing order:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-green-50 to-teal-100 min-h-screen">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-teal-800">
        🛒 Checkout
      </h2>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Left - Shipping Details */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Shipping Details
          </h3>
          <form className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
            />
            <textarea
              name="address"
              placeholder="Shipping Address"
              value={form.address}
              onChange={handleChange}
              rows="3"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
            ></textarea>

            {/* Payment Method */}
            <h3 className="text-lg font-semibold mt-6">Payment Method</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={form.payment === "cod"}
                  onChange={handleChange}
                />
                <span>Cash on Delivery</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={form.payment === "upi"}
                  onChange={handleChange}
                />
                <span>UPI / Card</span>
              </label>
            </div>

            {form.payment === "upi" && (
              <div className="mt-4 space-y-3">
                <input
                  type="text"
                  name="upiId"
                  value={form.upiId}
                  onChange={handleChange}
                  placeholder="Enter UPI ID (e.g. name@upi)"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="text"
                  name="cardNumber"
                  value={form.cardNumber}
                  onChange={handleChange}
                  placeholder="Enter Card Number"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="text"
                  name="expiry"
                  value={form.expiry}
                  onChange={handleChange}
                  placeholder="Expiry Date (MM/YY)"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="password"
                  name="cvv"
                  value={form.cvv}
                  onChange={handleChange}
                  placeholder="CVV"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
            )}
          </form>
        </div>

        {/* Right - Order Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Order Summary
          </h3>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span className="font-semibold text-teal-700">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>
          <h3 className="text-2xl font-bold mt-6 text-gray-800">
            Total: <span className="text-green-700">₹{total}</span>
          </h3>

          <button
            onClick={handlePlaceOrder}
            className="w-full mt-6 bg-gradient-to-r from-teal-500 to-green-600 text-white py-3 rounded-xl hover:opacity-90 shadow-lg"
          >
            ✅ Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
