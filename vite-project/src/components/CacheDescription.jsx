import React from "react";
import {motion}  from "framer-motion";

const CacheDescription = ({ descriptionRef }) => {
  return (
    <div
      ref={descriptionRef}
      className="bg-gray-800 p-6 rounded-xl shadow-lg text-center text-gray-300 w-2/3  border border-gray-700 mt-10"
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
        The <strong>Least Recently Used (LRU) Cache</strong> is a data structure that stores a fixed number of items, removing the <em>least recently accessed</em> item when the cache reaches its capacity. It ensures optimal performance by prioritizing frequently used elements while efficiently discarding older, unused ones.
      </motion.p>

      <div className="text-left mt-4 text-gray-300 text-lg leading-loose">
        <ul className="list-disc list-inside">
          <li>
            <span className="text-purple-400 font-semibold">Put(key, value):</span> 
            Adds a key-value pair to the cache. If the key already exists, it updates its value and moves it to the most recently used position.
          </li>
          <li>
            <span className="text-purple-400 font-semibold">Get(key):</span> 
            Retrieves the value associated with the key. If found, it marks the item as recently used.
          </li>
          <li>
            <span className="text-purple-400 font-semibold">Eviction Policy:</span> 
            When the cache is full, the least recently used item is removed to make space for new entries.
          </li>
          <li>
            Implements a <span className="text-green-400 font-semibold">HashMap</span> for O(1) lookup and a 
            <span className="text-green-400 font-semibold"> Doubly Linked List</span> to maintain order.
          </li>
        </ul>
      </div>

      <motion.p
        className="text-gray-400 mt-4 italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        The LRU Cache is widely used in operating systems (page replacement algorithms), database management, web caching, and memory optimization in applications.
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
  );
};

export default CacheDescription;
