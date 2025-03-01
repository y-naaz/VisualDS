import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const CacheGraph = ({ cacheStats }) => {
  const data = [
    { name: "Hits", count: cacheStats.hits, color: "#4CAF50" },  // Green for hits
    { name: "Misses", count: cacheStats.misses, color: "#F44336" },  // Red for misses
  ];

  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-lg w-full max-w-md">
      <h2 className="text-lg font-semibold text-gray-300 text-center mb-3">Cache Performance</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis allowDecimals={false} stroke="#ccc" />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill={(entry) => entry.color} barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CacheGraph;