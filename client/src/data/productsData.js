// src/data/productsData.js

// 🔽 Import images from src/assets
import chudithar from "../assets/Chudithar.jpg";
import deniumjeans from "../assets/deniumjeans.webp";
import formalshirt from "../assets/formalshirt.avif";
import frocks from "../assets/frocks.jpeg";
import muhurthamsaree from "../assets/muhurthamsaree.jpg";
import nightsuit from "../assets/Nightsuit.jpg";
import sharara from "../assets/sharara.webp";
import shara from "../assets/shara.jpg";
import SilkSaree from "../assets/SilkSaree.jpg";
import tablelamp from "../assets/table lamp.jpeg";
import tshirtshorts from "../assets/tshirtshorts.webp";
import wallhanging from "../assets/wallhanging.jpeg";

const products = [
  // WOMEN
  {
    id: 1,
    name: "Silk Saree",
    price: 3000,
    category: "Women",
    subcategory: "Sarees",
    image: SilkSaree,
    offer: 25,
    rating: 4.6,
    reviews: 152,
  },
  {
    id: 2,
    name: "Cotton Chudithar",
    price: 1500,
    category: "Women",
    subcategory: "Chudithars",
    image: chudithar,
    offer: 15,
    rating: 4.3,
    reviews: 98,
  },
  {
    id: 3,
    name: "Night Suit",
    price: 800,
    category: "Women",
    subcategory: "Night Suits",
    image: nightsuit,
    offer: 10,
    rating: 4.2,
    reviews: 65,
  },
  {
    id: 4,
    name: "Muhurtham Saree",
    price: 5000,
    category: "Women",
    subcategory: "Muhurtham Sarees",
    image: muhurthamsaree,
    offer: 30,
    rating: 4.8,
    reviews: 210,
  },
  {
    id: 5,
    name: "Sharara Set",
    price: 2500,
    category: "Women",
    subcategory: "Sharara",
    image: sharara,
    offer: 20,
    rating: 4.4,
    reviews: 134,
  },

  // MEN
  {
    id: 6,
    name: "Formal Shirt",
    price: 1200,
    category: "Men",
    subcategory: "Shirts",
    image: formalshirt,
    offer: 18,
    rating: 4.1,
    reviews: 72,
  },
  {
    id: 7,
    name: "Denim Jeans",
    price: 2000,
    category: "Men",
    subcategory: "Jeans",
    image: deniumjeans,
    offer: 22,
    rating: 4.5,
    reviews: 150,
  },

  // KIDS
  {
    id: 8,
    name: "Frock",
    price: 900,
    category: "Kids",
    subcategory: "Girls",
    image: frocks,
    offer: 12,
    rating: 4.7,
    reviews: 98,
  },
  {
    id: 9,
    name: "T-shirt & Shorts",
    price: 700,
    category: "Kids",
    subcategory: "Boys",
    image: tshirtshorts,
    offer: 10,
    rating: 4.4,
    reviews: 88,
  },

  // HOME DECORS
  {
    id: 10,
    name: "Wall Hanging",
    price: 1500,
    category: "Home Decors",
    subcategory: "Wall Decor",
    image: wallhanging,
    offer: 28,
    rating: 4.6,
    reviews: 112,
  },
  {
    id: 11,
    name: "Table Lamp",
    price: 1800,
    category: "Home Decors",
    subcategory: "Lighting",
    image: tablelamp,
    offer: 20,
    rating: 4.5,
    reviews: 76,
  },
  {
    id: 12,
    name: "Shara Special",
    price: 2000,
    category: "Women",
    subcategory: "Special",
    image: shara,
    offer: 12,
    rating: 4.2,
    reviews: 45,
  },
];

export default products;
