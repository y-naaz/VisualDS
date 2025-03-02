import React from "react";
import { motion } from "framer-motion";

const LRUVisualization = ({ onClose, cacheData }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <motion.div
        className="bg-gray-800 p-6 rounded-lg shadow-xl w-3/4 max-w-3xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
      >
        <h2 className="text-xl font-bold text-white mb-4">LRU Cache Structure</h2>
        <div className="flex flex-col md:flex-row gap-4">
          {/* HashMap Representation */}
          <div className="flex-1 bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-400">HashMap</h3>
            <ul className="text-white text-sm">
              {cacheData.map((item, index) => (
                <li key={index} className="border-b border-gray-600 py-1">
                  {item.key} → Node({item.value})
                </li>
              ))}
            </ul>
          </div>

          {/* Linked List Representation */}
          <div className="flex-1 bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-400">Doubly Linked List</h3>
            <div className="flex items-center gap-2 overflow-x-auto p-2">
              {cacheData.map((item, index) => (
                <div
                  key={index}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md flex items-center"
                >
                  {item.value}
                  {index < cacheData.length - 1 && (
                    <span className="mx-2 text-gray-300">⇄</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default LRUVisualization;
