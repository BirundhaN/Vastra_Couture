// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // your AuthContext
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import './index.css';
import Products from "./pages/Products";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<h1 className="text-center mt-10">Home Page (Products Coming Soon)</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<h1 className="text-center mt-10">Cart Page</h1>} />
          <Route path="/checkout" element={<h1 className="text-center mt-10">Checkout Page</h1>} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
