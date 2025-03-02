import React from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";
const GraphPopup = ({ onClose, cacheHits, cacheMisses }) => {
  const data = useMemo(
    () => [
      { name: "Cache Hit", value: cacheHits },
      { name: "Cache Miss", value: cacheMisses },
    ],
    [cacheHits, cacheMisses]
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-3/4 max-w-2xl"
      >
        <h2 className="text-xl font-bold text-white mb-4">
          Cache Hit vs. Cache Miss
        </h2>
        <div className="bg-gray-700 p-4 h-64 flex items-center justify-center rounded-lg">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Tooltip />
              <Bar dataKey="value" fill="#82ca9d" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default GraphPopup;
