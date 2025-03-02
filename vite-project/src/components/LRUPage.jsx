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
import GraphPopup from "./GraphPopup";
import LRUVisualization from "./LRUVisualization";

const LRUPage = () => {
  const [cacheSize, setCacheSize] = useState(4);
  const [cache, setCache] = useState(new LRUCache(cacheSize));
  const [cacheData, setCacheData] = useState([]);
  const [showGraph, setShowGraph] = useState(false);
  const [showVisualization, setShowVisualization] = useState(false);
  const [cacheHits, setCacheHits] = useState(0);
  const [cacheMisses, setCacheMisses] = useState(0);
  const [showFadingButton, setShowFadingButton] = useState(false); // New state

  const descriptionRef = useRef(null);

  const scrollToDescription = () => {
    const navbarHeight = document.querySelector("nav")?.offsetHeight || 80;
    const descriptionElement = descriptionRef.current;

    if (descriptionElement) {
      const elementPosition =
        descriptionElement.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navbarHeight - 20,
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

        {/* Read More & Visualization Buttons */}
        <div className="flex gap-4 items-center">
          <button
            onClick={scrollToDescription}
            className="px-4 py-2 bg-cyan-900 hover:bg-cyan-700 transition rounded-xl text-white
            cursor-pointer
            "
        
          >
            Read More
          </button>

          {/* Fading Button for Visualization (only appears after interaction) */}
          {showFadingButton && (
            <motion.button
              onClick={() => setShowVisualization(true)}
              className="px-4 py-2 bg-cyan-900 hover:bg-cyan-800 text-white rounded-xl shadow-lg transition transform hover:scale-105 cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Visualize LRU
            </motion.button>
          )}
        </div>

        <div className="flex flex-row items-start justify-center w-full gap-10">
          <CacheControls
            cache={cache}
            setCache={setCache}
            setCacheData={setCacheData}
            cacheSize={cacheSize}
            setCacheSize={setCacheSize}
            setCacheHits={setCacheHits}
            setCacheMisses={setCacheMisses}
            setShowFadingButton={setShowFadingButton} // Pass state to CacheControls
          />
          <CacheDisplay cacheData={cacheData} />
        </div>

        <CacheDescription descriptionRef={descriptionRef} />
      </div>

      {/* LRU Visualization Popup */}
      {showVisualization && (
        <LRUVisualization
          onClose={() => setShowVisualization(false)}
          cacheData={cacheData}
        />
      )}

      {/* Graph Popup */}
      {showGraph && (
        <GraphPopup
          onClose={() => setShowGraph(false)}
          cacheHits={cacheHits}
          cacheMisses={cacheMisses}
        />
      )}

      <Footer />
    </div>
  );
};

export default LRUPage;
