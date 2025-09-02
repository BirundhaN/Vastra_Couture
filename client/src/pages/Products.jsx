// src/pages/Products.jsx
import React from "react";
import { useCart } from "../context/CartContext";

const sampleProducts = [
  { id: 1, name: "Kurti", price: 1200, image: "https://via.placeholder.com/200" },
  { id: 2, name: "Saree", price: 2500, image: "https://via.placeholder.com/200" },
  { id: 3, name: "Lehenga", price: 3500, image: "https://via.placeholder.com/200" },
];

export default function Products() {
  const { addToCart } = useCart();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Our Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sampleProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-3">{product.name}</h3>
            <p className="text-gray-700">₹{product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
