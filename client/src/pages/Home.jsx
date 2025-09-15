import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// ✅ Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// ✅ Import images from assets
import Sharara1 from "../assets/Sharara.jpg";
import sha from "../assets/sha.jpg"; // notice .jpeg
import shara from "../assets/shara.jpg";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showBanner, setShowBanner] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (location.state?.orderSuccess) {
      setShowBanner(true);
      setUserName(location.state.name || "");
      const timer = setTimeout(() => setShowBanner(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
      {/* ✅ Success Banner */}
      {showBanner && (
        <div className="m-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg shadow animate-fade-in">
          🎉 Order placed successfully! Thank you, {userName}.
        </div>
      )}

      {/* ✅ Top Half - Branding */}
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-purple-800 drop-shadow-lg mb-4">
          🛍️ Vastra Couture
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mb-6">
          "Discover fashion, kids’ trends & stylish home decors — everything you
          love in one place!"
        </p>

        <button
          onClick={() => navigate("/products")}
          className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-pink-500 to-purple-600 
                     text-white font-semibold rounded-full shadow-lg hover:scale-105 transition"
        >
          Start Shopping ✨
        </button>
      </div>

      {/* ✅ Bottom Half - Swiper Slider */}
      <div className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px]">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          className="w-full h-full"
        >
          <SwiperSlide>
            <img
              src={Sharara1}
              alt="Sharara 1"
              className="w-full h-full object-contain"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={shara}
              alt="Sharara 2"
              className="w-full h-full object-contain"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={sha}
              alt="Sharara 3"
              className="w-full h-full object-contain"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Home;
