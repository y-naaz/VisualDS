import React, { useState, useRef } from "react";
import LRUCache from "../utils/LRUCache";
import "../App.css";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { Toaster } from "sonner";
import CacheControls from "./CacheControls";
import CacheDisplay from "./CacheDisplay";
import CacheDescription from "./CacheDescription";
import Footer from "./Footer";

const LRUPage = () => {
  const [cacheSize, setCacheSize] = useState(4);
  const [cache, setCache] = useState(new LRUCache(cacheSize));
  const [cacheData, setCacheData] = useState([]);
  const descriptionRef = useRef(null);

  const scrollToDescription = () => {
    const navbarHeight = document.querySelector("nav")?.offsetHeight || 80; // Get navbar height
    const descriptionElement = descriptionRef.current;
  
    if (descriptionElement) {
      const elementPosition = descriptionElement.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navbarHeight - 20, // 20px extra padding
        behavior: "smooth",
      });
    }
  };
  

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-300 pt-24">
      <Navbar />
      <Toaster richColors position="top-center" />

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-4 gap-8">
        <motion.h1
          className="text-4xl font-extrabold bg-gradient-to-r from-pink-300 to-purple-500 bg-clip-text text-transparent text-center mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          LRU Cache Visualizer
        </motion.h1>

        <button
          onClick={scrollToDescription}
          className="px-4 py-2 bg-cyan-900 hover:bg-cyan-500 hover:cursor-pointer transition rounded-lg text-white mt-1"
        >
          Read More
        </button>

        <div className="flex flex-row items-start justify-center w-full gap-10">
          <CacheControls
            cache={cache}
            setCache={setCache}
            setCacheData={setCacheData}
            cacheSize={cacheSize}
            setCacheSize={setCacheSize}
          />
          <CacheDisplay cacheData={cacheData} />
        </div>

        <CacheDescription descriptionRef={descriptionRef} />
      </div>

      {/* Footer (Stays at Bottom) */}
      <Footer />
    </div>
  );
};

export default LRUPage;
