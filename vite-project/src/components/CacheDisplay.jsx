import React from "react";
import CacheItem from "./CacheItem";
import emptyBucket from "../assets/empty-bucket.png";

const CacheDisplay = ({ cacheData }) => {
  return (
    <div className="flex flex-col items-end w-2/3 pr-29">
      <h2 className="text-lg font-semibold text-blue-300 text-right">Cache State</h2>
      <p className="text-gray-400 text-right">LRU Cache - Most recently used items appear first.</p>
      <div className="mt-4 flex flex-col gap-2 items-end">
        {cacheData.length === 0 ? (
          <img src={emptyBucket} alt="Empty Bucket" className="w-32 h-40 object-contain" />
        ) : (
          cacheData.map((item, index) => <CacheItem key={index} item={item} isMostRecent={index === 0} />)
        )}
      </div>
    </div>
  );
};

export default CacheDisplay;
