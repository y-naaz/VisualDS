import React from "react";

const CacheItem = ({ item, isMostRecent }) => {
  return (
    <div className={`p-3 rounded-lg shadow-md flex flex-col items-center border w-40 ${isMostRecent ? "bg-blue-900" : "bg-gray-500"}`}>
      <span className="font-bold">{item.key}</span>
      <span>{item.value}</span>
    </div>
  );
};

export default CacheItem;
