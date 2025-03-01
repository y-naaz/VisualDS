import React, { useState } from "react";
import Navbar from "./Navbar";
import CacheControls from "./CacheControls";
import CacheDisplay from "./CacheDisplay";
import { motion } from "framer-motion";
import { Toaster } from "sonner";
import LRUCache from "../utils/LRUCache";

const LRUPage = () => {
  const [cacheSize, setCacheSize] = useState(4);
  const [cache, setCache] = useState(new LRUCache(cacheSize));
  const [cacheData, setCacheData] = useState([]);
  const [input, setInput] = useState({ key: "", value: "" });

  const updateCacheView = () => {
    const entries = [];
    let current = cache.head.next;
    while (current !== cache.tail) {
      entries.push({ key: current.key, value: current.value });
      current = current.next;
    }
    setCacheData(entries);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900 text-gray-300 gap-8">
      <Navbar />
      <Toaster richColors position="top-center" />

      <motion.h1
        className="text-4xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent text-center mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        LRU Cache Visualizer
      </motion.h1>

      <div className="flex flex-row items-start justify-center w-full gap-10">
        <CacheControls
          cacheSize={cacheSize}
          setCacheSize={setCacheSize}
          cache={cache}
          setCache={setCache}
          input={input}
          setInput={setInput}
          updateCacheView={updateCacheView}
        />
        <CacheDisplay cacheData={cacheData} />
      </div>
    </div>
  );
};

export default LRUPage;
