import React, { useState, useRef } from "react";
import LRUCache from "../utils/LRUCache";
import "../App.css";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { Toaster, toast } from "sonner";
import cacheHitSound from "../assets/cache-hit.mp3";
import cacheMissSound from "../assets/cache-miss.mp3";
import cachePutSound from "../assets/cache-put.mp3";
import emptyBucket from "../assets/empty-bucket.png";

const LRUPage = () => {
  const [cacheSize, setCacheSize] = useState(4);
  const [cache, setCache] = useState(new LRUCache(cacheSize));
  const [cacheData, setCacheData] = useState([]);
  const [input, setInput] = useState({ key: "", value: "" });

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
      toast.error("Invalid Input", {
        description: "Key cannot be empty.",
        position: "top-center",
        duration: 2000,
        style: { background: "#dc2626", color: "#fff" },
      });
      return;
    }

    const result = cache.get(key);
    if (result === -1) {
      playSound(cacheMissSound);
      toast.error("Cache Miss!", {
        description: `Key "${key}" not found.`,
        position: "top-center",
        duration: 2000,
        style: { background: "#dc2626", color: "#fff" },
      });
    } else {
      playSound(cacheHitSound);
      toast.success("Cache Hit!", {
        description: `Fetched value "${result}" for key "${key}".`,
        position: "top-center",
        duration: 2000,
        style: { background: "#10b981", color: "#fff" },
      });
    }
    updateCacheView();
  };

  const handlePut = () => {
    const key = input.key.trim();
    const value = input.value.trim();

    if (!key || !value) {
      toast.error("Invalid Input", {
        description: "Both key and value are required.",
        position: "top-center",
        duration: 2000,
        style: { background: "#dc2626", color: "#fff" },
      });
      return;
    }

    const existingValue = cache.get(key);
    if (existingValue !== -1) {
      toast.info("Key Overwritten", {
        description: `Updated "${key}" from "${existingValue}" to "${value}".`,
        position: "top-center",
        duration: 2000,
        style: { background: "#fbbf24", color: "#000" },
      });
    } else {
      playSound(cachePutSound);
      toast.success("Cache Updated!", {
        description: `Inserted "${key}: ${value}".`,
        position: "top-center",
        duration: 2000,
        style: { background: "#2563eb", color: "#fff" },
      });
    }

    cache.put(key, value);
    setInput({ key: "", value: "" });
    updateCacheView();
  };
  const descriptionRef = useRef(null);

  const scrollToDescription = () => {
    descriptionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900 text-gray-300 gap-8 pt-24">
      <Navbar />

      <Toaster richColors position="top-center" />

      <motion.h1
        className="text-4xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent text-center  mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        LRU Cache Visualizer
      </motion.h1>
      <button
        onClick={scrollToDescription}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 transition rounded-lg text-white mt-2"
      >
        Read More
      </button>
      <div className="flex flex-row items-start justify-center w-full gap-10">
        <div className="bg-gray-800 p-4 rounded-xl shadow-lg flex flex-col gap-3 items-center w-1/3 ml-50">
          <p className="text-gray-400 text-center text-xl">
            Enter a key-value pair and interact with the cache using Get and Put
            operations.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              name="key"
              placeholder="Key"
              value={input.key}
              onChange={handleChange}
              className="px-3 py-2 bg-gray-700 rounded-lg text-gray-300 w-1/2"
            />
            <input
              type="text"
              name="value"
              placeholder="Value"
              value={input.value}
              onChange={handleChange}
              className="px-3 py-2 bg-gray-700 rounded-lg text-gray-300 w-1/2"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleGet}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 transition rounded-lg"
            >
              Get
            </button>
            <button
              onClick={handlePut}
              className="px-5 py-2 bg-green-500 hover:bg-green-400 transition rounded-lg"
            >
              Put
            </button>
          </div>
          <div className="flex flex-col items-center mt-4">
            <label className="text-gray-400">Cache Size:</label>
            <input
              type="number"
              value={cacheSize}
              onChange={handleCacheSizeChange}
              className="px-3 py-2 bg-gray-700 rounded-lg text-gray-300 w-20 text-center"
              min="1"
            />
          </div>
        </div>

        <div className="flex flex-col items-end w-2/3 pr-24">
          <h2 className="text-lg font-semibold text-blue-300 text-right">
            Cache State
          </h2>
          <p className="text-gray-400 text-right">
            LRU Cache - Most recently used items appear first.
          </p>
          <div className="mt-4 flex flex-col gap-2 items-end">
            {cacheData.length === 0 ? (
              <motion.img
                src={emptyBucket}
                alt="Empty Bucket"
                className="w-32 h-40 object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            ) : (
              cacheData.map((item, index) => (
                <motion.div
                  key={index}
                  className={`p-3 rounded-lg shadow-md flex flex-col items-center border w-40 ${
                    index === 0 ? "bg-blue-900" : "bg-gray-500"
                  }`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="font-bold">{item.key}</span>
                  <span>{item.value}</span>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
      <div
  ref={descriptionRef}
  className="bg-gray-800 p-6 rounded-xl shadow-lg text-center text-gray-300 w-2/3 mt-10 border border-gray-700"
>
  <motion.h2
    className="text-3xl font-bold text-purple-400 mb-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    Understanding LRU Cache
  </motion.h2>

  <motion.p
    className="text-gray-400 text-lg leading-relaxed"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3, duration: 0.8 }}
  >
    The **Least Recently Used (LRU) Cache** efficiently manages memory by
    keeping track of the most recently accessed items. When full, it removes
    the least recently used item.
  </motion.p>

  <div className="text-left mt-4 text-gray-300 text-lg leading-loose">
    <ul className="list-disc list-inside">
      <li>
        <span className="text-purple-400 font-semibold">Put(key, value):</span>{" "}
        Adds a key-value pair to the cache. If the key exists, it updates the
        value and moves it to the most recently used position.
      </li>
      <li>
        <span className="text-purple-400 font-semibold">Get(key):</span> Retrieves
        a value from the cache. If found, it moves the item to the most
        recently used position.
      </li>
      <li>
        Uses a <span className="text-green-400 font-semibold">HashMap</span> for
        quick lookups and a{" "}
        <span className="text-green-400 font-semibold">Doubly Linked List</span>{" "}
        to maintain access order.
      </li>
    </ul>
  </div>

  <motion.p
    className="text-gray-400 mt-4 italic"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.6, duration: 0.8 }}
  >
    The LRU Cache is widely used in operating systems, databases, and web
    caching strategies.
  </motion.p>

  <a
    href="https://leetcode.com/problems/lru-cache/"
    target="_blank"
    rel="noopener noreferrer"
    className="mt-5 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition"
  >
    Try LRU Cache on LeetCode 🚀
  </a>
</div>

    </div>
  );
};

export default LRUPage;
