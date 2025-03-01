import React from "react";
import { Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import LRUPage from "./components/LRUPage";
// import NotFound from "./components/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/lru-cache" element={<LRUPage />} />
      
    </Routes>
  );
};

export default AppRoutes;

