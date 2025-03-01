import React from "react";
import { motion } from "framer-motion";
import emptyBucket from "../assets/empty-bucket.png";

const CacheDisplay = ({ cacheData }) => {
  return (
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
  );
};

export default CacheDisplay;