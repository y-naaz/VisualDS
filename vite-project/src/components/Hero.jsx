import React, { useState, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const algorithms = [
  { name: "Binary Search", description: "Find elements in sorted arrays efficiently." },
  { name: "Two Pointers", description: "Optimize search with two pointers." },
  { name: "Sliding Window", description: "Improve performance with a dynamic window." },
  { name: "Recursion & Backtracking", description: "Solve problems by exploring all options." },
  { name: "LRU Cache", description: "Efficiently manage recently used items in memory.", route: "/lru-cache" },
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [swiping, setSwiping] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const cardsRef = useRef(null);
  const navigate = useNavigate();

  const handleSwipe = (direction) => {
    setSwiping(true);
    setTimeout(() => setSwiping(false), 300);
    if (direction === "left") {
      setIndex((prevIndex) => (prevIndex + 1) % algorithms.length);
    } else if (direction === "right") {
      setIndex((prevIndex) => (prevIndex - 1 + algorithms.length) % algorithms.length);
    }
  };

  const handleCardClick = () => {
    if (algorithms[index].route) {
      navigate(algorithms[index].route);
    }
  };

  const scrollToCards = () => {
    setShowCards(true);
    setTimeout(() => {
      cardsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
    trackMouse: true,
  });

  return (
    <div className="relative w-full min-h-screen bg-gray-900 text-gray-300 flex flex-col items-center text-center p-6">
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text animate-pulse tracking-wide">
          VisualDS: Master DSA Visually
        </h1>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl">
          Learn Data Structures & Algorithms with interactive visualizations and step-by-step explanations.
        </p>
        <div className="mt-8 flex gap-4">
          <button 
            onClick={scrollToCards} 
            className="px-6 py-3 bg-cyan-500 text-gray-900 font-semibold rounded-lg shadow-md transition-all hover:scale-105 hover:shadow-cyan-400/50"
          >
            Explore Now →
          </button>
          <button 
            className="px-6 py-3 bg-gray-700 text-gray-300 font-semibold rounded-lg shadow-md transition-all hover:scale-105 hover:shadow-gray-500/50"
          >
            Learn More
          </button>
        </div>
      </div>
      
      {/* Cards Section */}
      {showCards && (
        <div ref={cardsRef} className="mt-20 flex flex-col items-center min-h-[80vh] justify-center">
          <h2 className="text-4xl font-bold text-cyan-400">Explore Algorithms</h2>
          <p className="text-gray-400 text-lg mb-4">Swipe or Click to Explore</p>
          
          <div className="relative flex items-center justify-center mt-8">
            <button onClick={() => handleSwipe("right")} className="absolute left-[-50px] p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-transform hover:scale-105">
              ←
            </button>

            <div {...handlers} onClick={handleCardClick} className="relative w-96 h-56 bg-gray-800 rounded-xl p-6 flex flex-col items-center justify-center shadow-lg text-center cursor-pointer transition-transform duration-300 border border-gray-600 hover:bg-gray-700">
              <h3 className="text-2xl font-bold text-cyan-400">{algorithms[index].name}</h3>
              <p className="mt-2 text-gray-400">{algorithms[index].description}</p>
            </div>

            <button onClick={() => handleSwipe("left")} className="absolute right-[-50px] p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-transform hover:scale-105">
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;