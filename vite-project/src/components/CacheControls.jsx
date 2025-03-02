import React, { useState } from "react";
import { Toaster, toast } from "sonner";
import cacheHitSound from "../assets/cache-hit.mp3";
import cacheMissSound from "../assets/cache-miss.mp3";
import cachePutSound from "../assets/cache-put.mp3";
import LRUCache from "../utils/LRUCache";
import GraphPopup from "./GraphPopup";

const CacheControls = ({ cache, setCache, setCacheData, setShowFadingButton }) => {
  const [input, setInput] = useState({ key: "", value: "" });
  const [cacheSize, setCacheSize] = useState(4);
  const [cacheHits, setCacheHits] = useState(0);
  const [cacheMisses, setCacheMisses] = useState(0);
  const [showGraph, setShowGraph] = useState(false);

  const playSound = (soundFile) => {
    const sound = new Audio(soundFile);
    sound.play();
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleCacheSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    if (newSize > 0) {
      setCacheSize(newSize);
      setCache(new LRUCache(newSize));
      setCacheData([]);
      setCacheHits(0);
      setCacheMisses(0);
      toast("Cache size updated!", {
        description: `New size: ${newSize}`,
        position: "top-center",
        duration: 2000,
        style: { background: "#6d28d9", color: "#fff" },
      });
    }
  };

  const handleGet = () => {
    const key = input.key.trim();
    if (!key) {
      toast.error("Invalid Input", { description: "Key cannot be empty." });
      return;
    }

    const result = cache.get(key);
    if (result === -1) {
      playSound(cacheMissSound);
      setCacheMisses((prev) => prev + 1);
      toast.error("Cache Miss!", { description: `Key "${key}" not found.` });
    } else {
      playSound(cacheHitSound);
      setCacheHits((prev) => prev + 1);
      toast.success("Cache Hit!", {
        description: `Fetched value "${result}" for key "${key}".`,
      });
    }
    
    setShowFadingButton(true); // Show LRU Visualization button
    updateCacheView();
  };

  const handlePut = () => {
    const key = input.key.trim();
    const value = input.value.trim();

    if (!key || !value) {
      toast.error("Invalid Input", {
        description: "Both key and value are required.",
      });
      return;
    }

    const existingValue = cache.get(key);
    if (existingValue !== -1) {
      toast.info("Key Overwritten", {
        description: `Updated "${key}" from "${existingValue}" to "${value}".`,
      });
    } else {
      playSound(cachePutSound);
      toast.success("Cache Updated!", {
        description: `Inserted "${key}: ${value}".`,
      });
    }

    cache.put(key, value);
    setInput({ key: "", value: "" });
    
    setShowFadingButton(true); // Show LRU Visualization button
    updateCacheView();
  };

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
    <div className="bg-gray-800 p-4 rounded-xl shadow-lg flex flex-col gap-3 items-center w-1/3 ml-20 border border-gray-700">
      <Toaster richColors position="top-center" />
      <p className="text-gray-400 text-center text-xl">
        Enter a key-value pair and interact with the cache.
      </p>
      <div className="flex gap-2">
        <input
          type="text"
          name="key"
          placeholder="Key"
          value={input.key}
          onChange={handleChange}
          className="px-3 py-2 bg-gray-700 rounded-lg text-gray-300 w-1/2 border border-gray-600 focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="text"
          name="value"
          placeholder="Value"
          value={input.value}
          onChange={handleChange}
          className="px-3 py-2 bg-gray-700 rounded-lg text-gray-300 w-1/2 border border-gray-600 focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleGet}
          className="px-5 py-2 bg-blue-600 rounded-lg transition hover:bg-blue-500 shadow-md hover:shadow-blue-500/50 cursor-pointer"
        >
          Get
        </button>
        <button
          onClick={handlePut}
          className="px-5 py-2 bg-green-500 rounded-lg transition hover:bg-green-400 shadow-md hover:shadow-green-500/50 cursor-pointer"
        >
          Put
        </button>
      </div>
      <div className="flex flex-col gap-2 items-center mt-4">
        <label className="text-gray-400">Cache Size:</label>
        <input
          type="number"
          value={cacheSize}
          onChange={handleCacheSizeChange}
          className="px-3 py-2 bg-gray-700 rounded-lg text-gray-300 w-20 text-center border border-gray-600 focus:ring-2 focus:ring-purple-500"
          min="1"
        />
        <button
          onClick={() => setShowGraph(true)}
          className="mt-4 px-5 py-2 bg-cyan-600 rounded-lg transition hover:bg-cyan-800 shadow-md hover:shadow-cyan-500/30 cursor-pointer"
        >
          Show Graph
        </button>
      </div>

      {showGraph && (
        <GraphPopup 
          onClose={() => setShowGraph(false)}
          cacheHits={cacheHits}
          cacheMisses={cacheMisses}
        />
      )}
    </div>
  );
};

export default CacheControls;